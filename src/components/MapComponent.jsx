import React, { useEffect, useRef, useState } from 'react';

export default function MapComponent({ onLocationSelect, selectedAddress }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const [address, setAddress] = useState(selectedAddress || '');

  useEffect(() => {
    if (!window.L) {
      console.error('Leaflet이 로드되지 않았습니다.');
      return;
    }

    // 이화여자대학교 정문 좌표
    const ewhaPosition = [37.5623, 126.9464];

    // 지도 생성
    const map = window.L.map(mapRef.current).setView(ewhaPosition, 15);

    // 타일 레이어 추가 (OpenStreetMap)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // 출발지 마커 (이화여대 정문) - 파란색
    const startIcon = window.L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color:#3B82F6;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const startMarker = window.L.marker(ewhaPosition, { icon: startIcon }).addTo(map);
    startMarker.bindPopup('이화여자대학교 정문').openPopup();
    startMarkerRef.current = startMarker;

    // 도착지 마커 아이콘 - 빨간색
    const endIcon = window.L.divIcon({
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
      const marker = window.L.marker([latlng.lat, latlng.lng], { icon: endIcon }).addTo(map);
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
            
            const marker = window.L.marker(coords, { icon: endIcon }).addTo(map);
            marker.bindPopup(selectedAddress).openPopup();
            endMarkerRef.current = marker;
          }
        })
        .catch(error => {
          console.error('주소 검색 실패:', error);
        });
    }

    // 컴포넌트 언마운트 시 지도 제거
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [selectedAddress, onLocationSelect]);

  return (
    <div className="w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: '300px', zIndex: 0 }}></div>
    </div>
  );
}
