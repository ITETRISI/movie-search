import '@babel/polyfill';
import Link from './link';
import Card from './card';

function findIndex(parent, target) {
	return [].indexOf.call(parent.children, target);
}

const menu = document.querySelector('.navigation__list');
menu.addEventListener('click', (event) => {
	if (event.target.classList.contains('navigation__list-item')) {
		const index = findIndex(menu, event.target);
		if (index === 0) {
			Link.drawLinks();
		} else {
			Link.linkIndex = index - 1;
			Card.drawCards(index - 1);
		}
		document.querySelector('#navigation__toggle').checked = false;
	}
});

document.addEventListener('click', (event)=> {
	if (!event.target.closest('.navigation')) {
		document.querySelector('#navigation__toggle').checked = false;
	}
  })

const container = document.querySelector('.container');
container.addEventListener('click', (event) => {
	if (event.target.closest('.link')) {
		const index = findIndex(container, event.target.closest('div'));
		Card.drawCards(index);
		Link.linkIndex = index;
	} else if (event.target.classList.contains('rotate')) {
		event.target.parentElement.classList.add('translate');
	} else if (event.target.closest('.card')) {
		Card.soundCard(findIndex(container, event.target.closest('.card-container')));
	}
});

container.addEventListener('mouseout', (event) => {
	if (event.target.classList.contains('card')) {
		event.target.classList.remove('translate');
	}
});

export default findIndex;
