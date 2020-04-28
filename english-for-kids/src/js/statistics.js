import {
	container,
	defaultCards,
	cards,
	template
} from './data';
import {drawCards} from './card';


class Stats {
	constructor() {
		this.statistic;
		this.direction = true;
		this.difficultWords;
		this.cardsArray;
	}
	createTable() {
		this.deleteDifficultWords();
		this.statistic = [].concat(...this.cardsArray);
		container.innerHTML = template;
		this.drawRow();
		this.addEvents();
	}
	drawRow() {
		document.querySelector('tbody').innerHTML = '';
		this.statistic.forEach((element) => {
			let number = Math.floor(element.wrong * 100 / (element.wrong + element.correct));
			if (!Number.isInteger(number)) {
				number = 0;
			}
			element.percent = number;
			document.querySelector('tbody').innerHTML += row(element)
		});
	}
	sortBy(parameter) {
		const arrow = document.querySelector('th').classList;
		if (this.direction) {
			this.statistic.sort((a, b) => (a[parameter] < b[parameter] ? -1 : 1));
			this.direction = false;
			arrow.add('active');
		} else {
			this.statistic.sort((a, b) => (b[parameter] < a[parameter] ? -1 : 1));
			this.direction = true;
			arrow.remove('active');
		}
		this.drawRow();
	}
	deleteDifficultWords() {
		if (cards.length === defaultCards.length + 1) {
			this.difficultWords = cards.pop();
			this.difficultWords.forEach((element) => {
				cards.forEach((array) => {
					array.find((card) => {
						if (card.word === element.word) {
							card.train = element.train;
							cards.correct = element.correct;
							cards.wrong = element.wrong;
						}
					});
				});
			});
			this.difficultWords = [];
			sessionStorage.setItem('cards', JSON.stringify(cards));
		}
		this.cardsArray = JSON.parse(sessionStorage.getItem('cards'));
	}
	addEvents() {
		document.querySelector('.table__btn-repeat').addEventListener('click', () => {
			this.statistic.sort((a, b) => (b.percent < a.percent ? -1 : 1));
			this.difficultWords = [];
			for (let i = 0; i <= 8; i++) {
				if (this.statistic[i].percent !== 0) {
					this.difficultWords.push(this.statistic[i]);
				}
			}
			if (this.difficultWords.length !== 0) {
				cards.push(this.difficultWords);
				sessionStorage.setItem('cards', JSON.stringify(cards));
				drawCards(cards.length - 1);
			} else {
				container.innerHTML = '<span>Вы не совершали ошибок</span>';
			}
		});

		document.querySelector('.table__btn-reset').addEventListener('click', () => {
			sessionStorage.setItem('cards', JSON.stringify(defaultCards));
			this.statistic = [].concat(...defaultCards);
			this.drawRow();
		});

		document.querySelector('tr').addEventListener('click', () => {
			this.sortBy(event.target.closest('th').innerText);
		});
	}

}

function row(element) {
	return `
 <tr>
	 <td>${element.word}</td>
	 <td>${element.translation}</td>
	 <td>${element.train}</td>
	 <td>${element.correct}</td>
	 <td>${element.wrong}</td>
	 <td>% ${element.percent}</td>
 </tr>`;
}

const stats = new Stats();
export default stats