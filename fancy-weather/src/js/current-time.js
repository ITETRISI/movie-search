import translate from './translate';
import {
  errorBlock,
  timeZone,
} from './data';

class TimeService {
  constructor() {
    this.place = '';
    this.currentInterval = '';
  }

  clickHandler(place) {
    this.generateRequest(place);
    this.changePlaceHandler(place);
  }

  changePlaceHandler(newPlace) {
    if (this.place !== newPlace && newPlace) {
      clearInterval(this.currentInterval);
      this.place = newPlace;
      this.currentInterval = setInterval(() => {
        this.generateRequest(newPlace);
      }, 1200);
    }
  }

  async generateRequest(place) {
    try {
      const url = `${timeZone}&${place}`;
      const response = await fetch(url);
      const data = await response.json();
      this.parseData(data);
    } catch (error) {
      errorBlock.textContent = 'Too many requests at the same time';
    }
  }

  parseData(data) {
    const language = sessionStorage.getItem('language');
    const month = new Date(data.timestamp * 1000).toGMTString().split(' ')[2];
    const day = new Date(data.timestamp * 1000).toGMTString().split(' ')[0].replace(',', '');
    const date = new Date(data.timestamp * 1000).getUTCDate();
    const time = new Date(data.timestamp * 1000).toGMTString().split(' ')[4];
    document.querySelector('.weather-today_data').innerHTML = `
		<span class="data">${translate(language, day)} ${date} ${translate(language, month)} ${time}</span>`;
  }
}

const time = new TimeService();

export default time;
