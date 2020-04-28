import {
	isElementCard,
} from './script';
import { link , drawLinks} from './link';
import {
	cards,
	container,
	score,
	waitForEndingFinalResult,
	waitForEndingAudio,
	correctAudio,
	wrongAudio,
	failureAudio,
	successAudio
} from './data';
import NavigationBar from './menu';

class Game {

	constructor(){
		this.randomCardsArray;
		this.currentCard;
		this.finalScore;
		this.startBtn;
	}
	
	createRandomCardsArray() {
		this.randomCardsArray = cards[link.linkIndex].map((a) => a).sort(() => 0.5 - Math.random());
	}

	restartGame() {
		this.startBtn = document.querySelector('.btn-game');
		if (this.startBtn) {
			this.startBtn.classList.remove('active');
			this.startBtn.querySelector('button').innerHTML = 'Start';
		}
		[...container.children].forEach((element) => element.classList.remove('inactive'));
		container.removeEventListener('click', clickOnCard);
		container.lastChild.addEventListener('click', start);
		score.innerHTML = '';
		this.finalScore = [];
		this.currentCard = 0;
		this.createRandomCardsArray();
	}

	repeatSound() {
		this.playSound(this.randomCardsArray[this.currentCard].audioSrc);
	}

	selectedCard(target) {
		const index = container.findIndex(target.closest('.card-container'));
		const card = this.randomCardsArray[this.currentCard];
		if (this.currentCard < this.randomCardsArray.length - 1) {
			if (cards[link.linkIndex][index] === card) {
				this.correctCurd(card);
				cards[link.linkIndex][index].correct++;
			} else {
				this.wrongCard();
				cards[link.linkIndex].find((element) => element === card).wrong++;
			}
		} else {
			this.gameResult();
		}
		sessionStorage.setItem('cards', JSON.stringify(cards));
	}

	correctCurd() {
		event.target.closest('.card-container').classList.add('inactive');
		this.currentCard++;
		this.playSound(correctAudio);
		setTimeout(() => {
			this.playSound(this.randomCardsArray[this.currentCard].audioSrc);
		}, waitForEndingAudio);
		score.innerHTML += '<div class="score-correct"></div>';
		this.finalScore.push(true);
	}

	wrongCard() {
		this.playSound(wrongAudio);
		score.innerHTML += '<div class="score-wrong"></div>';
		this.finalScore.push(false);
	}

	gameResult() {
		container.innerHTML = '';
		score.innerHTML = '';
		if (this.finalScore.includes(false)) {
			document.body.classList.add('lose');
			const errors = this.finalScore.filter((star) => !star).length;
			container.innerHTML = `<span>ошибок ${errors}</span>`;
			this.playSound(failureAudio);
		} else {
			document.body.classList.add('win');
			this.playSound(successAudio);
		}
		setTimeout(() => {
			NavigationBar.activeElement(0);
			document.body.classList.remove('lose', 'win');
			this.finalScore = [];
			this.currentCard = 0;
			drawLinks();
		}, waitForEndingFinalResult);
	}

	playSound(sound) {
		const audio = new Audio(sound);
		audio.play();
	}

	changeStartBtn(){
		this.startBtn.classList.add('active');
		this.startBtn.querySelector('button').innerHTML = 'Restart';
	}
}

document.querySelector('#navigation__switch').addEventListener('change', (event) => {
	if (event.target.checked) {
		container.classList.remove('play');
		container.addEventListener('click', isElementCard);
		game.restartGame();
	} else {
		container.classList.add('play');
		container.removeEventListener('click', isElementCard);
		game.createRandomCardsArray();
	}
});

function start() {
	game.repeatSound();
	game.changeStartBtn()
	container.addEventListener('click', clickOnCard);
}

function clickOnCard(event) {
	if (event.target.closest('.card') && !event.target.closest('.inactive')) {
		game.selectedCard(event.target);
	}
}

const game = new Game()

export default game;
