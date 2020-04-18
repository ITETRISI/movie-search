import {
	isElementCard
} from './script';
import Link from './link';
import {
	cards
} from './data';

const container = document.querySelector('.container');
let score = document.querySelector('.score')
document.querySelector('#myonoffswitch').addEventListener('change', (event) => {
	if (event.target.checked) {
		container.classList.remove('play');
		container.addEventListener('click', isElementCard)
		container.removeEventListener('click', clickOnCard)
		Game.finalScore = [];
		Game.currentCard = 0;
		if(score){
		score.innerHTML = '';
		}
	} else {
		container.classList.add('play');
		container.removeEventListener('click', isElementCard)
		Game.createRandomCardsArray()
	}
})

export function start() {
	const player = new Game();
	player.repeatSound()
	container.addEventListener('click', clickOnCard)
}

function clickOnCard(event) {
	if (event.target.closest('.card') && !event.target.classList.contains('inactive')) {
		const card = new Game();
		card.selectedCard(event.target)
	}
}

export class Game {
	static cardsArray;
	static currentCard = 0;
	static finalScore = [];

	static createRandomCardsArray() {
		this.cardsArray = cards[Link.linkIndex].map(a => a).sort(() => 0.5 - Math.random())
	}

	repeatSound() {
		this.playSound(Game.cardsArray[Game.currentCard].audioSrc)
	}

	selectedCard(target) {
		score = document.querySelector('.score')
		const index = container.findIndex(target.closest('.card-container')) - 1
		if (Game.currentCard < Game.cardsArray.length - 1) {
			if (cards[Link.linkIndex][index] === Game.cardsArray[Game.currentCard]) {
				event.target.classList.add('inactive')
				Game.currentCard++;
				this.playSound('./src/audio/correct.mp3')
				setTimeout(() => {
					this.playSound(Game.cardsArray[Game.currentCard].audioSrc)
				}, 1000)
				score.innerHTML += `<div class="score-correct"></div>`
				Game.finalScore.push(true)
			} else {
				this.playSound('./src/audio/error.mp3')
				score.innerHTML += `<div class="score-wrong"></div>`
				Game.finalScore.push(false)
			}
		} else {
			this.gameResult()
		}
	}

	gameResult() {
		container.innerHTML = ''
		if (Game.finalScore.includes(false)) {
			document.body.classList.add('lose')
			this.playSound('./src/audio/failure.mp3')
		} else {
			document.body.classList.add('win')
			this.playSound('./src/audio/success.mp3')
		}
		setTimeout(() => {
			document.body.classList.remove('lose', 'win');
			Game.finalScore = [];
			Game.currentCard = 0;
			Link.drawLinks()
		}, 3000)
	}

	playSound(sound) {
		const aud = new Audio(sound);
		aud.play()
	}
}