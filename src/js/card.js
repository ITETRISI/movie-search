import {
	cards,
	links
} from './data'
import Links from './link'

class Card {
	constructor(options) {
		this.word = options.word;
		this.translation = options.translation;
		this.image = options.image;
		this.audioSrc = options.audioSrc;
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
		cards[index].forEach(element => {
			const card = new Card(element)
			card.init()
		})
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