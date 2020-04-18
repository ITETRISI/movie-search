import '@babel/polyfill';
import Link from './link';
import Card from './card';
import './game';

Object.prototype.findIndex = function (target) {
	return [].indexOf.call(this.children, target)
}

const menu = document.querySelector('.navigation__list');
menu.addEventListener('click', (event) => {
	if (event.target.classList.contains('navigation__list-item')) {
		const index = menu.findIndex(event.target) - 1
		if (index < 0) {
			Link.drawLinks();
		} else {
			Link.linkIndex = index;
			Card.drawCards(index);
		}
		document.querySelector('#navigation__toggle').checked = false;
	}
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.navigation')) {
		document.querySelector('#navigation__toggle').checked = false;
	}
})

const container = document.querySelector('.container');

function isElementLink(event) {
	if (event.target.closest('.link')) {
		const index = container.findIndex(event.target.closest('div'));
		Link.linkIndex = index;
		Card.drawCards(index);
	}
}

function isElementCard(event) {
	if (event.target.classList.contains('rotate')) {
		event.target.parentElement.classList.add('translate');
	} else if (event.target.closest('.card')) {
		const index = container.findIndex(event.target.closest('.card-container'))
		Card.soundCard(index-1);
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