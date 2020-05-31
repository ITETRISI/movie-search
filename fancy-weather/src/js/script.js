import location from './search-location';
import getImage from './image';
import Temperature from './temperature';
import inputByMicrophone from './microphone';
import './map';

location.getUserLocation();

function search() {
  const place = document.querySelector('#input');
  const language = document.querySelector('#select').value;
  location.searchLocation(place.value, language);
}

document.querySelector('#select').value = sessionStorage.getItem('language') ? sessionStorage.getItem('language') : 'en';

document.querySelector('#select').onchange = () => {
  const language = document.querySelector('#select').value;
  location.searchLocation(sessionStorage.getItem('location'), language);
  sessionStorage.setItem('language', language);
};

document.querySelector('#search').addEventListener('click', search);
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  search();
});

document.querySelector('.image').addEventListener('click', () => {
  getImage(sessionStorage.getItem('weather'));
});

document.querySelector('.temperature').addEventListener('click', () => { Temperature.transformTemperature(); });

document.querySelector('.microphone').addEventListener('click', () => { inputByMicrophone(sessionStorage.getItem('language')); });
