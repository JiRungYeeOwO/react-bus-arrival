import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Papa from 'papaparse';
import CityCode from './CityCode';
import './BusArrivalApp.css';

export default function BusArrivalApp() {
    const [cityCodes, setCityCodes] = useState([]); // 도시 코드 목록
    const [stations, setStations] = useState([]); // 정류장 목록

    const cityCodeService = new CityCode();

    // 도시 코드 가져오기
    useEffect(() => {
        const fetchCityCodes = async () => {
            try {
                const cities = await cityCodeService.fetchCityCodes();
                setCityCodes(cities);
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
            },
            error: (err) => {
                console.error('csv 로드 중 에러발생 : ', err);
            },
        });
    }, []);

    return (
        <div>
            <h1>도시별 버스 정류장 조회</h1>
            <div className="city-grid">
                {cityCodes.map((city) => (
                    <div key={city.citycode} className="city-button">
                        <Link to={`/city/${city.citycode}`}>
                            <button>
                                {city.cityname} ({city.citycode})
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
