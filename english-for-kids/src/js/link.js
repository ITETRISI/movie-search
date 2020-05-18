import {
	links,
	container,
} from './data';

class Link {
	constructor() {
		this.linkIndex = 0;
	}

	init(element) {
		const linkCard = `<div class="link" style="background-image: url(${element.image})">
		<span>${element.title}</span>
		</div>`;
		container.innerHTML += linkCard;
	}
}

const link = new Link();

function drawLinks() {
	container.innerHTML = '';
	links.forEach((element) => {
		link.init(element);
	});
}
drawLinks();

export { link, drawLinks };
