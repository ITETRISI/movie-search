import {
	cards,
	links
} from './data'

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
		<audio class="audio" src='${this.audioSrc}'></audio>
		</div>`
		container.innerHTML += card;
	}

}

const container = document.querySelector('.container')

function drawCards(index) {
	container.innerHTML = '';
	cards[index].forEach(element => {
		const card = new Card(element)
		card.init()
	})
}

container.addEventListener('click', () => {
	if (event.target.classList.contains('rotate')) {
		event.target.parentElement.classList.add('translate')
	} else if (event.target.parentElement.classList.contains('card')) {
		event.target.parentElement.nextElementSibling.play()
	}
})

container.addEventListener('mouseout', () => {
	if (event.target.classList.contains('card')) {
		event.target.classList.remove('translate')
	}
})

export default drawCards