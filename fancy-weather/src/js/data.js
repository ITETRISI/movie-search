export const ipInfo = 'https://ipinfo.io/json?token=30ff4b186d0944';
export const openCageData = 'https://api.opencagedata.com/geocode/v1/json?';

export const temperatureButton = document.querySelector('.temperature');
export const celsius = '°C';
export const fahrenheit = '°F';

export const mapBoxToken = 'pk.eyJ1IjoiaXRldHJpc2kiLCJhIjoiY2szbjF1OTduMTcwbTNvbzdia2ZvaDQxYiJ9.QZn9midKqzkTmnqsnEPDCw';
mapboxgl.accessToken = mapBoxToken;
export const mapBox = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [50, 20],
  zoom: 4,
});
export const mapMarker = new mapboxgl.Marker();


export const errorBlock = document.querySelector('.errors');
export const loader = document.querySelector('.loader');
export const weatherBlock = document.querySelector('.weather');
export const microphone = document.querySelector('.microphone');
export const timeZone = 'https://api.timezonedb.com/v2.1/get-time-zone?key=JIJTUMOM9GC7&format=json&by=position';

export const unsplash = 'https://api.unsplash.com/';