import axios from 'axios';

export default class CityCode {
  constructor() {
    this.apikey = "NM515P%2FA6e%2FDbfiSxQzD8w1KcctUqklBzWF0yxB56Te%2Fsfr3UYtvU0jePBzC6s3d8jVe%2BKcZ6smV%2BywkRmBbow%3D%3D";
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