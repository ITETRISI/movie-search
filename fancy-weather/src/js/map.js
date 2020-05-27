import translate from './translate';
import location from './search-location';
import {
	mapBox,
	mapMarker,
} from './data';

class Map {
	constructor(lng, lat, language) {
		this.lng = lng;
		this.lat = lat;
		this.language = language;
	}

	static addMapEvent() {
		mapBox.on('load', () => {
			mapBox.setLayoutProperty('country-label', 'text-field', [
				'format',
				['get', `name_en`],
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

			mapBox.on('click', async function (e) {
				const {lat,lng} = e.lngLat;
				const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=country&access_token=pk.eyJ1IjoiaXRldHJpc2kiLCJhIjoiY2szbjF1OTduMTcwbTNvbzdia2ZvaDQxYiJ9.QZn9midKqzkTmnqsnEPDCw`);
				const data = await response.json();
				const place = data.features[0].place_name;
				location.searchLocation(place,sessionStorage.getItem('language'));
			});
		});
	}

	newMapPosition() {
		mapBox.flyTo({
			center: [this.lng, this.lat]
		});
		mapMarker.setLngLat([this.lng, this.lat]).addTo(mapBox)
		document.querySelector('.coordinates').innerHTML = `${translate(this.language, 'longitude')}:
		${doubleToDegree(this.lng)}, ${translate(this.language, 'latitude')}: 
		${doubleToDegree(this.lat)}`;
	}
}

function doubleToDegree(value) {
	const degree = parseInt(value, 10);
	const minute = parseInt(Math.abs((value % 1) * 60), 10);
	return `${degree}°${minute}'`;
}

Map.addMapEvent();

export default Map;