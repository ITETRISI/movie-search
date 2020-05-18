import { link, drawLinks } from './link';
import { drawCards } from './card';
import { menu, score, container } from './data';
import Stats from './statistics';

export default class NavigationBar {
	static activeElement(position) {
		[...menu.children].forEach((element) => element.classList.remove('active'));
		menu.children[position].classList.add('active');
	}
}

menu.addEventListener('click', (event) => {
	if (event.target.classList.contains('navigation__list-item')) {
		const index = menu.findIndex(event.target) - 1;
		score.innerHTML = '';
		if (index < 0) {
			drawLinks();
		} else if (index + 1 === menu.childElementCount - 1) {
			Stats.createTable();
		} else {
			link.linkIndex = index;
			drawCards(index);
		}
		NavigationBar.activeElement(index + 1);
		document.querySelector('#navigation__toggle').checked = false;
	}
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.navigation')) {
		document.querySelector('#navigation__toggle').checked = false;
	}

	if (!event.target.classList.contains('rotate')) {
		[...container.children].forEach((element) => element.classList.remove('translate'));
	}
});
