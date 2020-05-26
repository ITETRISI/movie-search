import {
	temperatureButton,
	celsius,
	fahrenheit,
} from './data';

class Temperature {
	
	constructor() {
		this.temperatures = '';
	}

	transformTemperature() {
		this.temperatures = document.querySelectorAll('.day_week_temperature, .today_temperature, .sensation');
		if (temperatureButton.value === celsius) {
			this.transformTemperatureIntoFahrenheit()
		} else {
			this.transformTemperatureIntoCelsius()
		}
		sessionStorage.setItem('temperature', temperatureButton.value);
	}

	transformTemperatureIntoCelsius() {
		this.temperatures.forEach((element) => {
			const transformToCelsius = (((element.innerHTML.slice(0, -2) - 32) * 5) / 9);
			element.innerHTML = `${transformToCelsius.toFixed(0)}°C`;
		});
		temperatureButton.value = celsius;
		temperatureButton.innerHTML = celsius;
	}

	transformTemperatureIntoFahrenheit(){
		this.temperatures.forEach((element) => {
			const transformToFahrenheit = (((element.innerHTML.slice(0, -2) * 9) / 5) + 32);
			element.innerHTML = `${transformToFahrenheit.toFixed(0)}°F`;
		});
		temperatureButton.value = fahrenheit;
		temperatureButton.innerHTML = fahrenheit;
	}

	checkTemperature() {
		if (sessionStorage.getItem('temperature') !== '°C' && sessionStorage.getItem('temperature')) {
			this.transformTemperature();
		}
	}

}

const temperature = new Temperature();

export default temperature;