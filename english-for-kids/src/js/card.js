import {
	cards,
	container,
} from './data';
import {link} from './link';
import Game from './game';

class Card {
	init(element) {
		const card = `
		<div class="card-container">
		<div class="card">
			<div class="front" style="background-image: url(${element.image})">
				<span>${element.word}</span>
			</div>
			<div class="back" style="background-image: url(${element.image})">
				<span>${element.translation}</span>
			</div>
			<button class="rotate"></button>
		</div>
		</div>`;
		container.innerHTML += card;
	}

	soundCard(cardIndex) {
		const sound = cards[link.linkIndex][cardIndex].audioSrc;
		const audio = new Audio(sound);
		audio.play();
	}
}

const card = new Card()

function drawCards(index) {
	link.linkIndex = index;
	container.innerHTML = '';
	cards[index].forEach((element) => {
		card.init(element);
	});
	container.innerHTML += `<div class="btn-game">
		<button>Start</button>
	</div>`;
	Game.restartGame();
}

export {
	card,
	drawCards,
};