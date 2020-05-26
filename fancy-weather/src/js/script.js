import { getUserLocation, searchLocation } from './search-location';
import getImage from './image';
import { transformTemperature } from './temperature';
import inputByMicrophone from './microphone';

getUserLocation();

document.querySelector('body').innerHTML = `
	<div class="wrapper">
	<header class="header">
		<div class="logo">
			<img src="image/Cloud.svg" width="100" height="100" alt="Cloud">
			<h1 class="logo_text">FANCY-WEATHER</h1>
		</div>
		<div class="header_conteiner">
			<div class="header_conteiner-btn">
				<button class="image button"></button>
				<select id="select">
					<option value="en">English</option>
					<option value="ru">Русский</option>
					<option value="be">Беларускі</option>
				</select>
				<button class="temperature button" value="°C">°C</button>
			</div>
			<div class="header_conteiner-form" >
				<input type="text" id="input">
				<input type="button" class="microphon button">
				<input class="header_conteiner-form_btn button" type="button" id="search" >
			</div>
		</div>
	</header>
	<div class="weather-container">
		<div class="weather">
			<div class="weather-today">
				<span class="weather-today_place"></span>
				<div class="weather-today_data">
				</div>
				<div class="wether-today_info">
					<div class="today_info">
					</div>
					<ul class="today_moreInfo">
					</ul>
				</div>
			</div>
			<div class="weather-week">  
			</div>
		</div>
		<div class="map-container">
			<span class="coordinates"></span>
			<div class="map" id='map' style='width: 500px; height: 400px;'></div>
		</div>
	</div> 
	</div>
`;

document.querySelector('#select').value = sessionStorage.getItem('language') ? sessionStorage.getItem('language') : 'en';

document.querySelector('#select').onchange = () => {
	const language = document.querySelector('#select').value;
	searchLocation(sessionStorage.getItem('location'), language);
	sessionStorage.setItem('language', language);
};

document.querySelector('#search').addEventListener('click', () => {
	const place = document.querySelector('#input');
	const language = document.querySelector('#select').value;
	searchLocation(place.value, language);
});

document.querySelector('.image').addEventListener('click', () => {
	getImage(sessionStorage.getItem('weather'));
});

document.querySelector('.temperature').addEventListener('click', transformTemperature);

document.querySelector('.microphon').addEventListener('click', () => { inputByMicrophone(sessionStorage.getItem('language')); });
