import {
	isElementCard,
} from './script';
import Link from './link';
import {
	cards,
	container,
	score,
} from './data';
import NavigationBar from './menu';

class Game {
	static randomCardsArray;

	static currentCard;

	static finalScore;

	static startBtn;

	static createRandomCardsArray() {
		this.randomCardsArray = cards[Link.linkIndex].map((a) => a).sort(() => 0.5 - Math.random());
	}

	static restartGame() {
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
		Game.createRandomCardsArray();
	}

	repeatSound() {
		this.playSound(Game.randomCardsArray[Game.currentCard].audioSrc);
	}

	selectedCard(target) {
		const index = container.findIndex(target.closest('.card-container'));
		const card = Game.randomCardsArray[Game.currentCard];
		if (Game.currentCard < Game.randomCardsArray.length - 1) {
			if (cards[Link.linkIndex][index] === card) {
				this.correctCurd(card);
				cards[Link.linkIndex][index].correct++;
			} else {
				this.wrongCard();
				cards[Link.linkIndex].find((element) => element === card).wrong++;
			}
		} else {
			this.gameResult();
		}
		sessionStorage.setItem('cards', JSON.stringify(cards));
	}

	correctCurd() {
		event.target.closest('.card-container').classList.add('inactive');
		Game.currentCard++;
		this.playSound('./src/audio/correct.mp3');
		setTimeout(() => {
			this.playSound(Game.randomCardsArray[Game.currentCard].audioSrc);
		}, 1000);
		score.innerHTML += '<div class="score-correct"></div>';
		Game.finalScore.push(true);
	}

	wrongCard() {
		this.playSound('./src/audio/error.mp3');
		score.innerHTML += '<div class="score-wrong"></div>';
		Game.finalScore.push(false);
	}

	gameResult() {
		container.innerHTML = '';
		score.innerHTML = '';
		if (Game.finalScore.includes(false)) {
			document.body.classList.add('lose');
			const errors = Game.finalScore.filter((star) => !star).length;
			container.innerHTML = `<span>ошибок ${errors}</span>`;
			this.playSound('./src/audio/failure.mp3');
		} else {
			document.body.classList.add('win');
			this.playSound('./src/audio/success.mp3');
		}
		setTimeout(() => {
			NavigationBar.activeElement(0);
			document.body.classList.remove('lose', 'win');
			Game.finalScore = [];
			Game.currentCard = 0;
			Link.drawLinks();
		}, 3000);
	}

	playSound(sound) {
		const aud = new Audio(sound);
		aud.play();
	}
}

document.querySelector('#navigation__switch').addEventListener('change', (event) => {
	if (event.target.checked) {
		container.classList.remove('play');
		container.addEventListener('click', isElementCard);
		Game.restartGame();
	} else {
		container.classList.add('play');
		container.removeEventListener('click', isElementCard);
		Game.createRandomCardsArray();
	}
});

function start() {
	const player = new Game();
	player.repeatSound();
	Game.startBtn.classList.add('active');
	Game.startBtn.querySelector('button').innerHTML = 'Restart';
	container.addEventListener('click', clickOnCard);
}

function clickOnCard(event) {
	if (event.target.closest('.card') && !event.target.closest('.inactive')) {
		const card = new Game();
		card.selectedCard(event.target);
	}
}

export default Game;
