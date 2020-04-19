import {
	container,
	defaultCards,
	cards,
} from './data';
import Card from './card';


export default class Stats {
	static statistic;

	static direction = true;

	static difficultWords;

	static cardsArray;

	static createTable() {
		this.deleteDifficultWords();
		this.statistic = [].concat(...this.cardsArray);
		container.innerHTML = `
		<div class="table__btn">
			<button class="table__btn-repeat">Repeat difficult words</button>
			<button class="table__btn-reset">Reset</button>
		</div>
		<table>
			<thead>
				<tr>
					<th>word <span class="arrow"></span></th>
					<th>translation</th>
					<th>train</th>
					<th>correct</th>
					<th>wrong</th>
					<th>percent</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>`;
		const stats = new Stats();
		stats.drawRow();
		addEvents();
	}

	drawRow() {
		document.querySelector('tbody').innerHTML = '';
		Stats.statistic.forEach((element) => {
			let number = Math.floor(element.wrong * 100 / (element.wrong + element.correct));
			if (!Number.isInteger(number)) {
				number = 0;
			}
			element.percent = number;
			document.querySelector('tbody').innerHTML += `
				<tr>
					<td>${element.word}</td>
					<td>${element.translation}</td>
					<td>${element.train}</td>
					<td>${element.correct}</td>
					<td>${element.wrong}</td>
					<td>% ${element.percent}</td>
				</tr>`;
		});
	}

	sortBy(parameter) {
		const arrow = document.querySelector('th').classList;
		if (Stats.direction) {
			Stats.statistic.sort((a, b) => (a[parameter] < b[parameter] ? -1 : 1));
			Stats.direction = false;
			arrow.add('active');
		} else {
			Stats.statistic.sort((a, b) => (b[parameter] < a[parameter] ? -1 : 1));
			Stats.direction = true;
			arrow.remove('active');
		}
		this.drawRow();
	}

	static deleteDifficultWords() {
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
}

function addEvents() {
	document.querySelector('.table__btn-repeat').addEventListener('click', () => {
		Stats.statistic.sort((a, b) => (b.percent < a.percent ? -1 : 1));
		Stats.difficultWords = [];
		for (let i = 0; i <= 8; i++) {
			if (Stats.statistic[i].percent !== 0) {
				Stats.difficultWords.push(Stats.statistic[i]);
			}
		}
		if (Stats.difficultWords.length !== 0) {
			cards.push(Stats.difficultWords);
			sessionStorage.setItem('cards', JSON.stringify(cards));
			Card.drawCards(cards.length - 1);
		} else {
			container.innerHTML = '<span>Вы не совершали ошибок</span>';
		}
	});

	document.querySelector('.table__btn-reset').addEventListener('click', () => {
		sessionStorage.setItem('cards', JSON.stringify(defaultCards));
		Stats.statistic = [].concat(...defaultCards);
		const stats = new Stats();
		stats.drawRow();
	});

	document.querySelector('tr').addEventListener('click', () => {
		const sort = new Stats();
		sort.sortBy(event.target.closest('th').innerText);
	});
}
