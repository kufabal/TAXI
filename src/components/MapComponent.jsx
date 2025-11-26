import React from 'react';

export default function MapComponent({ onLocationSelect, selectedAddress }) {
  return (
    <div className="w-full h-full relative" style={{ width: '100%', height: '100%', backgroundColor: '#e5e7eb', minHeight: '460px', overflow: 'hidden' }}>
      {/* 지도 이미지 - public/map.png 파일 사용 */}
      <img
        src="/map.png"
        alt="지도"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          display: 'block'
        }}
      />
      
      {/* 출발지 마커 표시 (이화여대 정문) - 파란색 */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          backgroundColor: '#3B82F6',
          borderRadius: '50%',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          zIndex: 1000,
          cursor: 'pointer'
        }}
        title="이화여자대학교 정문 (출발지)"
      />
      
      {/* 안내 메시지 */}
      <div 
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '12px',
          borderRadius: '8px',
          fontSize: '13px',
          zIndex: 1000,
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        💡 파란색 마커: 출발지 (이화여대 정문) | 주소를 입력하세요
      </div>
    </div>
  );
}
