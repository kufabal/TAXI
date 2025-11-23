import React, { useEffect, useRef, useState } from 'react';

export default function MapComponent({ onLocationSelect, selectedAddress }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const [address, setAddress] = useState(selectedAddress || '');

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 100; // 10초 동안 시도
    let mapInstance = null;
    
    // Leaflet이 로드될 때까지 기다리기
    const initMap = () => {
      // window.L 확인
      if (!window.L) {
        retryCount++;
        if (retryCount < maxRetries) {
          if (retryCount % 10 === 0) {
            console.log(`Leaflet 로딩 대기 중... (${retryCount}/${maxRetries})`);
          }
          setTimeout(initMap, 100);
        } else {
          console.error('❌ Leaflet을 로드할 수 없습니다.');
          console.error('window.L:', window.L);
          console.error('window.leafletLoaded:', window.leafletLoaded);
        }
        return;
      }
      
      const L = window.L;
      console.log('✅ Leaflet 발견! 지도 초기화 시작...');

      if (!mapRef.current) {
        console.error('지도 컨테이너를 찾을 수 없습니다.');
        return;
      }

      // 이미 지도가 있으면 제거
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // 컨테이너가 준비될 때까지 기다리기
      if (!mapRef.current) {
        console.error('❌ 지도 컨테이너를 찾을 수 없습니다.');
        setTimeout(initMap, 100);
        return;
      }

      const containerWidth = mapRef.current.offsetWidth || mapRef.current.clientWidth;
      const containerHeight = mapRef.current.offsetHeight || mapRef.current.clientHeight;
      console.log('📐 컨테이너 크기:', containerWidth, 'x', containerHeight);
      
      // 컨테이너 크기가 0이면 강제로 설정
      if (containerWidth === 0 || containerHeight === 0) {
        console.warn('⚠️ 컨테이너 크기가 0입니다. 강제로 크기 설정...');
        const parent = mapRef.current.parentElement;
        if (parent) {
          const parentHeight = parent.offsetHeight || 400;
          mapRef.current.style.width = '100%';
          mapRef.current.style.height = parentHeight + 'px';
          console.log('✅ 컨테이너 크기 설정:', mapRef.current.style.width, 'x', mapRef.current.style.height);
        }
      }

      // 이미 지도가 생성되어 있으면 제거
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // 이화여자대학교 정문 좌표
      const ewhaPosition = [37.5623, 126.9464];

      // 지도 생성
      const L = window.L || window.leaflet;
      const map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true
      }).setView(ewhaPosition, 15);
      
      // 지도가 제대로 렌더링되도록 invalidateSize 호출
      setTimeout(() => {
        if (map) {
          map.invalidateSize();
          console.log('지도 크기 조정 완료', '지도 크기:', map.getSize());
        }
      }, 100);
      
      // 추가로 500ms 후에도 한 번 더 확인
      setTimeout(() => {
        if (map) {
          map.invalidateSize();
          console.log('지도 크기 재조정 완료');
        }
      }, 500);

      // 타일 레이어 추가 (OpenStreetMap)
      const L = window.L || window.leaflet;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
      console.log('✅ 지도 생성 완료!');
      console.log('📍 지도 중심:', map.getCenter());
      console.log('🔍 지도 줌:', map.getZoom());
      
      // 지도가 제대로 렌더링되었는지 확인
      setTimeout(() => {
        const mapSize = map.getSize();
        console.log('📏 지도 실제 크기:', mapSize);
        if (mapSize.x === 0 || mapSize.y === 0) {
          console.warn('⚠️ 지도 크기가 0입니다. invalidateSize 호출...');
          map.invalidateSize();
        }
      }, 200);

      // 출발지 마커 (이화여대 정문) - 파란색
      const L = window.L || window.leaflet;
      const startIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color:#3B82F6;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const startMarker = L.marker(ewhaPosition, { icon: startIcon }).addTo(map);
      startMarker.bindPopup('이화여자대학교 정문').openPopup();
      startMarkerRef.current = startMarker;

      // 도착지 마커 아이콘 - 빨간색
      const endIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color:#EF4444;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      // 지도 클릭 이벤트
      map.on('click', function(e) {
        const latlng = e.latlng;

        // 기존 도착지 마커 제거
        if (endMarkerRef.current) {
          map.removeLayer(endMarkerRef.current);
        }

        // 새로운 도착지 마커 생성
        const L = window.L || window.leaflet;
        const marker = L.marker([latlng.lat, latlng.lng], { icon: endIcon }).addTo(map);
        endMarkerRef.current = marker;

        // 주소 검색 (좌표 -> 주소) - Nominatim API 사용 (무료)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.display_name) {
              const addr = data.display_name;
              setAddress(addr);
              marker.bindPopup(addr).openPopup();
              if (onLocationSelect) {
                onLocationSelect(addr, { lat: latlng.lat, lng: latlng.lng });
              }
            } else {
              const addr = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
              setAddress(addr);
              marker.bindPopup(addr).openPopup();
              if (onLocationSelect) {
                onLocationSelect(addr, { lat: latlng.lat, lng: latlng.lng });
              }
            }
          })
          .catch(error => {
            console.error('주소 검색 실패:', error);
            const addr = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
            setAddress(addr);
            marker.bindPopup(addr).openPopup();
            if (onLocationSelect) {
              onLocationSelect(addr, { lat: latlng.lat, lng: latlng.lng });
            }
          });
      });

      // 선택된 주소가 있으면 해당 위치로 이동
      if (selectedAddress && selectedAddress.trim()) {
        // 주소 검색 (주소 -> 좌표)
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(selectedAddress)}&limit=1`)
          .then(response => response.json())
          .then(data => {
            if (data && data.length > 0) {
              const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
              map.setView(coords, 15);
              
              if (endMarkerRef.current) {
                map.removeLayer(endMarkerRef.current);
              }
              
              const L = window.L || window.leaflet;
              const marker = L.marker(coords, { icon: endIcon }).addTo(map);
              marker.bindPopup(selectedAddress).openPopup();
              endMarkerRef.current = marker;
            }
          })
          .catch(error => {
            console.error('주소 검색 실패:', error);
          });
      }
    };

    // 지도 초기화 시작
    initMap();

    // 컴포넌트 언마운트 시 지도 제거
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedAddress, onLocationSelect]);

  return (
    <div className="w-full h-full" style={{ width: '100%', height: '100%' }}>
      <div 
        ref={mapRef} 
        id="map-container"
        className="w-full h-full rounded-lg" 
        style={{ 
          width: '100%', 
          height: '100%',
          zIndex: 0,
          backgroundColor: '#e5e7eb'
        }}
      >
        {!window.L && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ewha mx-auto mb-2"></div>
              <p>지도 로딩 중...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
