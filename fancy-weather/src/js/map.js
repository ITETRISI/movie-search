import translate from './translate';
import location from './search-location';
import {
  mapBox,
  mapMarker,
  mapBoxToken,
  errorBlock,
} from './data';

class Map {
  constructor(lng, lat, language) {
    this.lng = lng;
    this.lat = lat;
    this.language = language;
  }

  addMapEvent() {
    mapBox.on('load', () => {
      mapBox.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', 'name_en'],
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

      mapBox.on('click', async (e) => {
        try {
          const {
            lat,
            lng
          } = e.lngLat;
          const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=country&access_token=${mapBoxToken}`);
          const data = await response.json();
          const place = data.features[0].place_name;
          location.searchLocation(place, sessionStorage.getItem('language'));
        } catch (error) {
          errorBlock.textContent = 'Please, try to click in another place';
        }
      });
    });
  }

  newMapPosition(lng, lat, language) {
    mapBox.flyTo({
      center: [lng, lat],
    });
    mapMarker.setLngLat([lng, lat]).addTo(mapBox);
    document.querySelector('.coordinates').innerHTML = `${translate(language, 'longitude')}:
		${doubleToDegree(lng)}, ${translate(language, 'latitude')}: 
		${doubleToDegree(lat)}`;
    document.querySelector('.map-info').textContent = `${translate(language, 'info')}`;
  }
}

function doubleToDegree(value) {
  const degree = parseInt(value, 10);
  const minute = parseInt(Math.abs((value % 1) * 60), 10);
  return `${degree}°${minute}'`;
}

const map = new Map();
map.addMapEvent();
export default map;