import Card from './card';
import {
	cardContainer,
	result,
	mySwiper,
	userCollection,
} from './data';

class Collection {
	constructor() {
		this.page = 1;
		this.searchWord = '';
		this.favoriteCollection = []
	}

	async getCollection(keyWord = 'star') {
		try {
			const url = `http://www.omdbapi.com/?s=${keyWord}&page=${this.page}&apikey=e795be05`
			const response = await fetch(url);
			const data = await response.json();
			if (!data.Error) {
				for (const item of data.Search) {
					await new Card(item).getMoreInfoCard()
				}
				this.searchWord = keyWord;
			} else {
				result.innerHTML = `No results for ${keyWord}`
			}
			cardContainer.classList.add('show')
		} catch (error) {
			result.innerHTML = error;
		}
	}

	updateCollection() {
		this.page++;
		this.getCollection(this.searchWord)
	}

	async drawUserCollection() {
		mySwiper.off('reachEnd');
		mySwiper.removeAllSlides();
		mySwiper.update();
		for (const item of this.favoriteCollection) {
			await new Card(item).getMoreInfoCard()
		}
		cardContainer.classList.add('show')
	}

}

function addEventOnSwiper() {
	mySwiper.on('reachEnd', function () {
		collection.updateCollection()
	});
}

const collection = new Collection();
collection.getCollection();
addEventOnSwiper();

cardContainer.addEventListener('click', (event) => {
	if (event.target.classList.contains('card__wrapper-like')) {
		let cardId = event.target.nextElementSibling.querySelector('a').href.split('/').splice(4, 1)
		collection.favoriteCollection.push({
			imdbID: cardId.join()
		})
	}
})

userCollection.addEventListener('click', (event) => {
	collection.drawUserCollection()
})

export {
	addEventOnSwiper,
	collection
}