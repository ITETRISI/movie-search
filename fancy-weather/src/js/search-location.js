import getWeatherData from './weather';
import time from './current-time';
import translate from './translate';
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
		getWeatherData(`${lat},${lng}`, language);
		this.writeNameOfLocation(location.split(',')[0].split(' ')[0]);
		time.clickHandler(`lat=${lat}&lng=${lng}`);
		createMap(lat, lng, language);
		sessionStorage.setItem('location', place);
	};

	writeNameOfLocation(place) {
		document.querySelector('.weather-today_place').innerHTML = place;
	}
}

const location = new Location();
/////////////////////////////////////////////// Map
function doubleToDegree(value) {
	const degree = parseInt(value, 10);
	const minute = parseInt(Math.abs((value % 1) * 60), 10);
	return `${degree}°${minute}'`;
}

async function createMap(lng, lat, language) {
	document.querySelector('.coordinates').innerHTML = `${translate(language, 'longitude')}: ${doubleToDegree(lng)}, ${translate(language, 'latitude')}: ${doubleToDegree(lat)}`;

	mapboxgl.accessToken = 'pk.eyJ1IjoiaXRldHJpc2kiLCJhIjoiY2szbjF1OTduMTcwbTNvbzdia2ZvaDQxYiJ9.QZn9midKqzkTmnqsnEPDCw';
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [lat, lng],
		zoom: 4,
	});
	///////////////////
	if (language === 'be') {
		language = 'ru';
	}
	map.on('load', () => {
		map.setLayoutProperty('country-label', 'text-field', [
			'format',
			['get', `name_${language}`],
			{
				'font-scale': 1.2,
			},
			'\n',
			{},
			['get', 'name'],
			{
				'font-scale': 0.8,
				'text-font': [
					'literal',
					['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
				],
			},
		]);
		new mapboxgl.Marker().setLngLat([lat, lng]).addTo(map)
	});
	/////////////////////////
}

export {
	location
};