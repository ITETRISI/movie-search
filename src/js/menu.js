import Link from './link'
import Card from './card'

export default class NavigationBar {
	static activeElement(position) {
		[...menu.children].forEach(element => element.classList.remove('active'))
		menu.children[position].classList.add('active')
	}
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
		NavigationBar.activeElement(index+1)
		document.querySelector('#navigation__toggle').checked = false;
	}
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.navigation')) {
		document.querySelector('#navigation__toggle').checked = false;
	}
})