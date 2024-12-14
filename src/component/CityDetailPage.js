import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CityCode from './CityCode';
import Papa from 'papaparse';
import BusArrival from './BusETA';
import './CityDetailPage.css';

export default function CityDetailPage() {
    const { cityCode } = useParams();  // URL에서 cityCode 가져오기
    const [cityCodes, setCityCodes] = useState([]);  // 도시 코드 목록
    const [stations, setStations] = useState([]);  // 해당 도시의 정류장 목록
    const [cityName, setCityName] = useState('');  // 도시명 상태 추가
    const [searchTerm, setSearchTerm] = useState('');  // 검색어 상태 추가
    const [selectedStation, setSelectedStation] = useState(null);  // 선택된 정류장

    const cityCodeService = new CityCode();

    // 도시 코드 가져오기
    useEffect(() => {
        const fetchCityCodes = async () => {
            try {
                const cities = await cityCodeService.fetchCityCodes();
                setCityCodes(cities);
                console.log('도시 코드 목록:', cities); // cityCodes 로그 확인
            } catch (err) {
                console.error('도시 코드 불러오기 실패:', err);
            }
        };
        fetchCityCodes();
    }, []);

    // csv 데이터 불러오기 및 파싱
    useEffect(() => {
        Papa.parse('/bus_stations.csv', {
            download: true,
            header: true,
            complete: (result) => {
                setStations(result.data);
                console.log('버스 정류장 목록:', result.data); // stations 로그 확인
            },
            error: (err) => {
                console.error('csv 로드 중 에러발생 : ', err);
            },
        });
    }, []);

    // 도시 코드로 도시명을 찾기
    useEffect(() => {
        if (cityCodes.length > 0) {
            console.log('현재 cityCode:', cityCode); // cityCode 로그 확인
            const city = cityCodes.find((city) => city.citycode.toString() === cityCode);
            if (city) {
                setCityName(city.cityname);  // 해당 도시명 설정
            } else {
                console.log('해당 도시 코드에 맞는 도시명을 찾을 수 없습니다.');
            }
        }
    }, [cityCode, cityCodes]);  // cityCode나 cityCodes가 변경될 때마다 도시명 업데이트

    // 검색어가 변경될 때마다 searchTerm 업데이트
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 정류장 목록 필터링
    const filteredStations = stations
        .filter((station) => station.도시코드 === cityCode)
        .filter((station) => {
            // 검색어가 있을 경우, 정류장명에 검색어가 포함된 항목만 반환
            return station.정류장명.toLowerCase().includes(searchTerm.toLowerCase());
        });

    // 정류장 클릭 시 버스 도착 시간 표시
    const handleStationClick = (station) => {
        setSelectedStation(station);  // 선택된 정류장 설정
    };

    return (
        <div className="city-detail-page">
            <h1 className="city-title">{cityName ? `${cityName}의 버스 정류장` : '도시를 찾을 수 없습니다.'}</h1>

            {/* 검색 입력 필드 */}
            <input
                type="text"
                placeholder="정류장명을 검색하세요..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />

            {/* 검색어로 필터링된 정류장 목록 */}
            {searchTerm && filteredStations.length > 0 ? (
                <div className="station-cards-container">
                    {filteredStations.map((station, index) => (
                        <div
                            key={index}
                            className="station-card"
                            onClick={() => handleStationClick(station)}  // 정류장 클릭 시 버스 도착 정보 표시
                        >
                            <div className="station-info">
                                <h3 className="station-name">
                                    {station.정류장명} ({station.정류장번호})
                                </h3>
                            </div>
                            {selectedStation?.정류장번호 === station.정류장번호 && (
                                <div className="bus-arrival-container">
                                    <BusArrival station={station} cityCode={cityCode} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : searchTerm ? (
                <p className="no-results">검색된 정류장이 없습니다.</p>
            ) : null}
        </div>
    );
}
