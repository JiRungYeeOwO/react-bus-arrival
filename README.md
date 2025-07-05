# 🚌 React 기반 버스 도착 시간 예측 웹앱

## 📚 개요
재능대학교 프론트엔드 수업의 **기말 개인 프로젝트**로 진행된 웹 애플리케이션입니다.  
React를 기반으로 공공데이터 API를 연동하여, 사용자가 특정 정류장의 버스 도착 정보를  
실시간으로 조회할 수 있도록 직접 기획하고 구현하였습니다.

백엔드 서버 없이 프론트엔드 단에서만 작동하며, 로컬 환경에서 실행됩니다.

## 🛠️ 사용 기술
- React
- JavaScript (ES6+)
- React Router
- PapaParse (CSV 파싱)
- 공공데이터포털 버스 API (REST API)
- HTML / CSS

## 🧩 주요 기능
- 도시별 버스 정류장 목록 조회
- 공공데이터 API를 통한 실시간 도착 정보 확인
- CSV 파일을 활용한 정류장 메타데이터 로딩
- API 오류 및 예외 처리
- 20초 간격 자동 새로고침

## 🔌 공공데이터 API 연동

- 사용 API:
- 도시 코드 목록 조회: `getCtyCodeList`
- 정류장별 도착 예정 정보 조회: `getSttnAcctoArvlPrearngeInfoList`
- 요청 방식: `axios`, `fetch`
- 응답 포맷: JSON (`_type=json`)
- API Key는 `.env` 파일을 통해 관리

## 📁 프로젝트 구조 요약

```bash
src/
├── component/
│   ├── BusArrivalApp.js        # 도시 목록 및 정류장 연결 진입점
│   ├── BusArrivalAppV2.js      # BusArrivalApp의 개선 버전 (실험용)
│   ├── BusETA.js               # 버스 도착 시간 표시 (실시간 갱신)
│   ├── CityDetailPage.js       # 선택한 도시의 정류장 목록 출력
│   ├── CityCode.js             # 공공데이터 API 통신 (도시 코드 조회)
│   ├── *.css                   # 각 컴포넌트 전용 스타일
├── App.js                      # 라우팅 정의 및 앱 전체 구조
├── index.js                    # React 앱 진입점
├── index.css, App.css          # 전체 및 루트 스타일
├── setupTests.js, App.test.js  # 기본 테스트 설정 (CRA 기본 제공)
```

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# .env 파일 생성 (루트 디렉토리에 추가)
REACT_APP_API_KEY=당신의_공공데이터_API_키

# 개발 서버 실행
npm start
```

## 📎 학습한 점
- React의 컴포넌트 분리와 상태 관리
- fetch/axios를 활용한 비동기 API 통신 처리
- 공공데이터 API 구조 분석 및 JSON 응답 파싱
- React Router를 통한 동적 라우팅 구성
- 정적 리소스(CSV) 활용 및 실시간 UI 반영

## ✨ 향후 개선 예정
- GPS 기반 근처 정류장 자동 탐색 기능
- 즐겨찾기 등록 기능
- 모바일 UX 최적화
