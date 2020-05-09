import {
	cardContainer,
	mySwiper,
} from './data';

export default class Card {
	constructor(options) {
		this.id = options.imdbID;
		this.poster = '';
		this.title = '';
		this.plot = '';
		this.released = '';
		this.director = '';
		this.rating = '';
	}

	async getMoreInfoCard() {
		const url = `https://www.omdbapi.com/?i=${this.id}&apikey=e795be05`;
		const response = await fetch(url);
		const data = await response.json();
		this.plot = data.Plot;
		this.released = data.Released;
		this.director = data.Director;
		this.rating = data.imdbRating;
		this.title = data.Title;
		this.poster = data.Poster;
		this.createCard();
	}

	createCard() {
		cardContainer.innerHTML += `
		<div class="swiper-slide">
			<div class="card__wrapper" style="background-image: url('${this.poster}'),url('../src/image/no-poster.jpg');">
			<div class="card__header">
			<span>${this.released}</span>
			<div class="card__header-rating">
			<img src="../src/image/star.svg" width="20"/>
			<span>${this.rating}</span>
			</div>
			</div>
			<button class="card__wrapper-like"></button>
			<div class="card__body">
			<span>${this.director}</span>
			<a href="https://www.imdb.com/title/${this.id}/" target="_blank">${this.title}</a>
			<p>${this.plot}</p>
			</div>
			</div>
		</div>
		`;
		mySwiper.update();
	}
}
