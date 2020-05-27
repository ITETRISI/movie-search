const ipInfo = 'https://ipinfo.io/json?token=30ff4b186d0944';
const openCageData = 'https://api.opencagedata.com/geocode/v1/json?';

const temperatureButton = document.querySelector('.temperature');
const celsius = '°C';
const fahrenheit = '°F';

const mapBoxToken = 'pk.eyJ1IjoiaXRldHJpc2kiLCJhIjoiY2szbjF1OTduMTcwbTNvbzdia2ZvaDQxYiJ9.QZn9midKqzkTmnqsnEPDCw';
mapboxgl.accessToken = mapBoxToken;
const mapBox = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [50, 20],
	zoom: 4,
});
const mapMarker = new mapboxgl.Marker()

export {
	ipInfo,
	openCageData,
	temperatureButton,
	celsius,
	fahrenheit,
	mapBoxToken,
	mapBox,
	mapMarker,
}