export default class TimeService {
	static place = ''

	static currentInterval

	static clickHandler = (place) => {
		TimeService.generateRequest(place).then((data) => TimeService.parseData(data));
		TimeService.changePlaceHandler(place);
	}

	static changePlaceHandler = (newPlace) => {
		if (TimeService.place !== newPlace && newPlace) {
			clearInterval(TimeService.currentInterval);
			TimeService.place = newPlace;
			if (newPlace) {
				TimeService.currentInterval = setInterval(() => {
					TimeService.generateRequest(newPlace).then((data) => TimeService.parseData(data));
				}, 60000);
			}
		}
	}

	static generateRequest = async (place) => {
		const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=JIJTUMOM9GC7&format=json&by=position&${place}`;
		const response = await fetch(url);
		const data = await response.json();
		return data;
	}

	static parseData = (data) => {
		document.querySelector('.weather-today_data').innerHTML = `
		<span class="data">${data.formatted.slice(0, -3)}</span>`;
	}
}
