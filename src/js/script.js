import '@babel/polyfill';
import Link from './link';
import Card from './card';
import {container} from './data';
import './game';
import NavigationBar from './menu';

Object.prototype.findIndex = function (target) {
	return [].indexOf.call(this.children, target)
}

function isElementLink(event) {
	if (event.target.closest('.link')) {
		const index = container.findIndex(event.target.closest('div'));
		NavigationBar.activeElement(index+1)
		Card.drawCards(index);
	}
}

function isElementCard(event) {
	if (event.target.classList.contains('rotate')) {
		event.target.parentElement.classList.add('translate');
	} else if (event.target.closest('.card')) {
		const index = container.findIndex(event.target.closest('.card-container'))
		Card.soundCard(index);
	}
}

container.addEventListener('click', isElementLink);
container.addEventListener('click', isElementCard);

container.addEventListener('mouseout', (event) => {
	if (event.target.classList.contains('card')) {
		event.target.classList.remove('translate');
	}
});

export {
	isElementLink,
	isElementCard
}