import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'
import CityCode from './CityCode'

export default function BusArrivalApp() {
    const [cityCodes, setCityCodes] = useState([]); // 도시 코드 목록
    const [selectedCityCode, setSelectedCityCode] = useState('');
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);

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
                console.log("CSV 데이터 로드됨: ", result.data);
                setStations(result.data);
            },
            error: (err) => {
                console.error('csv 로드 중 에러발생 : ', err);
            },
        });
    }, []);

    // 도시 선택 시 정류장 필터링
    const filteringStation = (e) => {
        const cityCode = e.target.value;
        setSelectedCityCode(cityCode);
        const filtered = stations.filter(
            (station) => station.도시코드 === cityCode
        );
        setFilteredStations(filtered);
    };

    return (
        <div>
            <h1>도시별 버스 정류장 조회</h1>
            <label htmlFor="cityCode">도시 선택: </label>
            <select id="cityCode" value={selectedCityCode} onChange={filteringStation}>
                <option value="">도시를 선택하세요</option>
                {cityCodes.map((cityCodeService) => (
                    <option key={cityCodeService.citycode} value={cityCodeService.citycode}>
                        {cityCodeService.cityname} ({cityCodeService.citycode})
                    </option>
                ))}
            </select>
            {filteredStations.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>정류장번호</th>
                            <th>정류장명</th>
                            <th>위도</th>
                            <th>경도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStations.map((station, index) => (
                            <tr key={index}>
                            <td>{station.정류장번호}</td>
                            <td>{station.정류장명}</td>
                            <td>{station.위도}</td>
                            <td>{station.경도}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

