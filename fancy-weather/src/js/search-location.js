import weather from './weather';
import time from './current-time';
import map from './map';
import {
  ipInfo,
  openCageData,
  errorBlock,
  loader,
  weatherBlock,
} from './data';

class Location {
  async getUserLocation() {
    const response = await fetch(ipInfo);
    const data = await response.json();
    this.searchLocation(data.city, sessionStorage.getItem('language'));
  }

  async searchLocation(place, language) {
    try {
      if (!language) {
        language = 'en';
      }
      const url = `${openCageData}q=${place}&key=cfcbe4a7aee74e3db98050801ae248ea&language=${language}&pretty=1`;
      const response = await fetch(url);
      const data = await response.json();
      const {
        lat,
        lng,
      } = data.results[0].geometry;
      const location = data.results[0].formatted;
      showLoader();
      await weather.getWeatherData(`${lat},${lng}`, language);
      this.writeNameOfLocation(location.split(',')[0]);
      await time.clickHandler(`lat=${lat}&lng=${lng}`);
      hideLoader();
      map.newMapPosition(lng, lat, language);
      sessionStorage.setItem('language', language);
      sessionStorage.setItem('location', place);
    } catch (error) {
      errorBlock.textContent = 'Something went wrong';
    }
  }

  writeNameOfLocation(place) {
    document.querySelector('.weather-today_place').innerHTML = place;
  }
}

function showLoader() {
  weatherBlock.classList.add('hide');
  loader.classList.add('show');
}

function hideLoader() {
  weatherBlock.classList.remove('hide');
  loader.classList.remove('show');
}

const location = new Location();

export default location;
