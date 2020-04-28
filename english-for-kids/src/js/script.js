import Link from './link';
import Card from './card';
import { container, cards } from './data';
import NavigationBar from './menu';

Object.prototype.findIndex = function (target) {
	return [].indexOf.call(this.children, target);
};

function isElementLink(event) {
	if (event.target.closest('.link')) {
		const index = container.findIndex(event.target.closest('div'));
		NavigationBar.activeElement(index + 1);
		Card.drawCards(index);
	}
}

function isElementCard(event) {
	if (event.target.classList.contains('rotate')) {
		event.target.closest('.card-container').classList.add('translate');
	} else if (event.target.closest('.card')) {
		const index = container.findIndex(event.target.closest('.card-container'));
		cards[Link.linkIndex][index].train++;
		sessionStorage.setItem('cards', JSON.stringify(cards));
		Card.soundCard(index);
	}
}

container.addEventListener('click', isElementLink);
container.addEventListener('click', isElementCard);
container.addEventListener('mouseout', (event) => {
	if (event.target.classList.contains('card')) {
		event.target.closest('.card-container').classList.remove('translate');
	}
});

export {
	isElementLink,
	isElementCard,
};
