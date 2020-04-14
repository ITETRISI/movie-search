import {
	cards,
	links
} from './data'
import Card from './card'

class Link {

	static linkIndex;

	constructor(options) {
		this.title = options.title;
		this.image = options.image;
	}

	init() {
		const link = `<div class="link" style="background-image: url(${this.image})">
		<span>${this.title}</span>
		</div>`
		container.innerHTML += link;
	}

	static drawLinks() {
		container.innerHTML = '';
		links.forEach(element => {
			const link = new Link(element)
			link.init()
		})
	}
}

const container = document.querySelector('.container')

Link.drawLinks()

container.addEventListener('click', () => {
	if (event.target.closest('.link')) {
		const findIndex = [].indexOf.call(container.children, event.target.closest('div'));
		Card.drawCards(findIndex);
		Link.linkIndex = findIndex;
	}
})

export default Link
