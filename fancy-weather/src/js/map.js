import translate from './translate';
import {
	mapBoxToken
} from './data';

class Map {
	constructor(lng, lat, language) {
		this.lng = lng;
		this.lat = lat;
		this.language = language;
	}

	async createMap() {
		document.querySelector('.coordinates').innerHTML = `${translate(this.language, 'longitude')}: ${doubleToDegree(this.lng)}, ${translate(this.language, 'latitude')}: ${doubleToDegree(this.lat)}`;
		mapboxgl.accessToken = mapBoxToken;
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [this.lat, this.lng],
			zoom: 4,
		});
		this.drawMap(map)
	}

	drawMap(map) {
		if (this.language === 'be') {
			this.language = 'ru';
		}
		map.on('load', () => {
			map.setLayoutProperty('country-label', 'text-field', [
				'format',
				['get', `name_${this.language}`],
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
			new mapboxgl.Marker().setLngLat([this.lat, this.lng]).addTo(map)
		});
	}
}

function doubleToDegree(value) {
	const degree = parseInt(value, 10);
	const minute = parseInt(Math.abs((value % 1) * 60), 10);
	return `${degree}°${minute}'`;
}

export default Map;