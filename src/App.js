import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BusArrivalApp from './component/BusArrivalAppV2';  // 도시 목록 페이지
import CityDetailPage from './component/CityDetailPage'; // 상세 페이지

function App() {
  return (
    <div>
      <a href='/' style={{ textDecoration: 'none', color: 'inherit' }}><h1>버스 정류장 조회</h1></a>
      <Routes>
        <Route path="/" element={<BusArrivalApp />} /> {/* 홈 페이지 */}
        <Route path="/city/:cityCode" element={<CityDetailPage />} /> {/* 도시 상세 페이지 */}
      </Routes>
    </div>
  );
}

export default App;
