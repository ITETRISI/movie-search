import Card from './card';
import {
	cardContainer,
	result,
	mySwiper,
	userCollection,
	userCollectionCount,
} from './data';

class Collection {
	constructor() {
		this.page = 1;
		this.searchWord = 'star';
		this.favoriteCollection = []
	}

	async getCollection(keyWord = this.searchWord) {
		try {
			const url = `https://www.omdbapi.com/?s=${keyWord}&page=${this.page}&apikey=e795be05`
			const response = await fetch(url);
			const data = await response.json();
			this.checkRequestOnErrors(data, keyWord)
		} catch (error) {
			result.innerHTML = error;
		}
	}

	checkRequestOnErrors(data, keyWord){
		if (!data.Error ) {
			if(keyWord !== this.searchWord){
				removeEventOnSwiper()
				this.searchWord = keyWord;
			}
			this.drawCollection(data.Search)
		} else {
			result.innerHTML = `No results for <span>${keyWord}</span>`
		}
	}

	updateCollection() {
		this.page++;
		this.getCollection(this.searchWord)
	}

	async drawCollection(array) {
		for (const item of array) {
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

function removeEventOnSwiper() {
	mySwiper.off('reachEnd');
	mySwiper.removeAllSlides();
	mySwiper.update();
	cardContainer.classList.remove('show');
}

const collection = new Collection();
collection.getCollection();
addEventOnSwiper();

cardContainer.addEventListener('click', (event) => {
	if (event.target.classList.contains('card__wrapper-like')) {
		const cardHref = event.target.nextElementSibling.querySelector('a').href;
		const cardId = {
			imdbID: cardHref.split('/').splice(4, 1).join()
		}
		if (!collection.favoriteCollection.find(element => element.imdbID === cardId.imdbID)) {
			userCollectionCount.innerText = 1 + Number(userCollectionCount.innerText)
			collection.favoriteCollection.push(cardId)
		}
	}
})

userCollection.addEventListener('click', () => {
	result.innerHTML = "Press on <span>heart</span> to add in your collection"
	removeEventOnSwiper()
	collection.drawCollection(collection.favoriteCollection)
})

export {
	removeEventOnSwiper,
	addEventOnSwiper,
	collection
}