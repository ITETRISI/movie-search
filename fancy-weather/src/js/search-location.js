import weather from './weather';
import time from './current-time';
import map from './map';
import {
	ipInfo,
	openCageData,
} from './data'

class Location {

	async getUserLocation() {
		const response = await fetch(ipInfo);
		const data = await response.json();
		this.searchLocation(data.city, sessionStorage.getItem('language'));
	};

	async searchLocation(place, language) {
		try{
		if (language === null) {
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

		await weather.getWeatherData(`${lat},${lng}`, language);
		this.writeNameOfLocation(location.split(',')[0]);
		time.clickHandler(`lat=${lat}&lng=${lng}`);
		map.newMapPosition(lng,lat,language)
		sessionStorage.setItem('language', language);
		sessionStorage.setItem('location', place);
	 } catch(error){
		console.log('incorrect input')
	 };
	};

	writeNameOfLocation(place) {
		document.querySelector('.weather-today_place').innerHTML = place;
	}
}

const location = new Location();

export default location;