import location from './search-location';
import getImage from './image';
import Temperature from './temperature';
import inputByMicrophone from './microphone';
import {mapBox} from './data';

location.getUserLocation();

document.querySelector('#select').value = sessionStorage.getItem('language') ? sessionStorage.getItem('language') : 'en';

document.querySelector('#select').onchange = () => {
	const language = document.querySelector('#select').value;
	location.searchLocation(sessionStorage.getItem('location'), language);
	sessionStorage.setItem('language', language);
};

document.querySelector('#search').addEventListener('click', () => {
	const place = document.querySelector('#input');
	const language = document.querySelector('#select').value;
	location.searchLocation(place.value, language);
});

document.querySelector('.image').addEventListener('click', () => {
	getImage(sessionStorage.getItem('weather'));
});

document.querySelector('.temperature').addEventListener('click', () => {Temperature.transformTemperature()});

document.querySelector('.microphon').addEventListener('click', () => { inputByMicrophone(sessionStorage.getItem('language')); });
