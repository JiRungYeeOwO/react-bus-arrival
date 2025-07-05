import axios from 'axios';

export default class CityCode {
  constructor() {
    this.apikey = process.env.REACT_APP_API_KEY;
    this.apiUrl = "http://apis.data.go.kr/1613000/ArvlInfoInqireService/getCtyCodeList";
  }

  async fetchCityCodes() {
    try {
      const response = await axios.get(
        `${this.apiUrl}?serviceKey=${this.apikey}&_type=json`
      );
      const cities = response.data.response.body.items.item;
      return cities || [];
    } catch (error) {
      console.error("에러코드 : ", error)
    }
  }
}
