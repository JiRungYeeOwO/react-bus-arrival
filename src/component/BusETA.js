import React, { useState, useEffect } from 'react';
import './BusETA.css';

const BusArrivalTime = ({ station, cityCode }) => {
    const [arrivalTime, setArrivalTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!station || !cityCode) return; // station이나 cityCode가 없으면 API 호출하지 않음

        const fetchArrivalTime = async () => {
            setLoading(true);
            setError(null);

            try {
                // API 요청 URL을 수정
                
                const serviceKey = process.env.REACT_APP_API_KEY;
                const url = `https://apis.data.go.kr/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${serviceKey}&pageNo=1&numOfRows=20&_type=json&cityCode=${cityCode}&nodeId=${station.정류장번호}&_=${new Date().getTime()}`;
                
                const response = await fetch(url);
                const data = await response.json();

                if (data.response.header.resultCode === "00" && data.response.body.items.item.length > 0) {
                    setArrivalTime(data.response.body.items.item);  // 도착 예정 시간 데이터 저장
                } else {
                    setError('도착 예정 시간이 없습니다.');
                }
            } catch (err) {
                setError('버스 도착 예정 시간을 가져오는 중 에러가 발생했습니다.');
                console.log(process.env.REACT_APP_API_KEY);  // 값을 출력하여 확인

            } finally {
                setLoading(false);
            }
        };

        // 20초마다 도착 예정 시간 API 호출
        const intervalId = setInterval(fetchArrivalTime, 20000);

        // 첫 번째 호출을 즉시 실행
        fetchArrivalTime();

        // 컴포넌트 언마운트 시 interval을 정리
        return () => clearInterval(intervalId);
    }, [station, cityCode]);  // station과 cityCode가 변경될 때마다 다시 호출

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="arrival-time">
            {arrivalTime ? (
                <ul className="arrival-list">
                    {arrivalTime.map((bus, index) => {
                        const minutes = Math.floor(bus.arrtime / 60); // 분
                        const seconds = bus.arrtime % 60; // 초
                        return (
                            <li key={index} className="arrival-item">
                                <span className="bus-info">
                                    {bus.routeno}번 버스 ({bus.routetp})
                                </span>
                                <span className="arrival-time">
                                    {minutes > 0 && `${minutes}분`} {seconds}초 후 도착
                                </span>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="no-arrival">도착 예정 시간이 없습니다.</div>
            )}
        </div>
    );
};

export default BusArrivalTime;
