import {
	cards
} from './data'
import Links from './link'
import {Game,start} from './game'

class Card {
	constructor(options) {
		this.word = options.word;
		this.translation = options.translation;
		this.image = options.image;
	}

	init() {
		const card = `
		<div class="card-container">
		<div class="card">
			<div class="front" style="background-image: url(${this.image})">
				<span>${this.word}</span>
			</div>
			<div class="back" style="background-image: url(${this.image})">
				<span>${this.translation}</span>
			</div>
			<button class="rotate"></button>
		</div>
		</div>`
		container.innerHTML += card;
	}

	static drawCards(index) {
		container.innerHTML = '';
		container.innerHTML += `<div class="score"></div>` 
		cards[index].forEach(element => {
			const card = new Card(element)
			card.init()
		})
		container.innerHTML += `<div class="btn-game">
			<button>Start</button>
		</div>`
		container.lastChild.addEventListener('click', start)
		Game.finalScore = [];
		Game.currentCard = 0;
		Game.createRandomCardsArray()
	}

	static soundCard(cardIndex) {
		const sound = cards[Links.linkIndex][cardIndex].audioSrc
		const audio = document.querySelector('.audio')
		audio.src = sound;
		audio.play();
	}
}

const container = document.querySelector('.container');

export default Card