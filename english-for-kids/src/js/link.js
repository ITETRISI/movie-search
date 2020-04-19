import {
	links,
	container
} from './data'

class Link {

	static linkIndex = 0;

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

Link.drawLinks()

export default Link