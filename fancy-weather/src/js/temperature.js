function transformTemperature() {
	const temp = document.querySelectorAll('.day_week_temperature, .today_temperature, .sensation');
	const button = document.querySelector('.temperature');
	const celsius = '°C';
	const fahrenheit = '°F';
	if (button.value === celsius) {
		temp.forEach((element) => {
			const transformToFahrenheit = (((element.innerHTML.slice(0, -2) * 9) / 5) + 32);
			element.innerHTML = `${transformToFahrenheit.toFixed(0)}°F`;
		});

		button.value = fahrenheit;
		button.innerHTML = fahrenheit;
	} else {
		temp.forEach((element) => {
			const transformToCelsius = (((element.innerHTML.slice(0, -2) - 32) * 5) / 9);
			element.innerHTML = `${transformToCelsius.toFixed(0)}°C`;
		});
		button.value = celsius;
		button.innerHTML = celsius;
	}
	sessionStorage.setItem('temperature', button.value);
}

function checkValue() {
	if (sessionStorage.getItem('temperature') !== '°C' && sessionStorage.getItem('temperature')) {
		transformTemperature();
	}
}

export { transformTemperature, checkValue };
