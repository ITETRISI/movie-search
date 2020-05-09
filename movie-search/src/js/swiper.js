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
			await this.checkRequestOnErrors(data, keyWord)
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
		} else if(data.Error === 'Movie not found!'){
			result.innerHTML = `No results for <span>${keyWord}</span>`
		} else {
			result.innerHTML = data.Error;
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

	updateUserCollection(){
		removeEventOnSwiper()
		cardContainer.classList.add('films-collection')
		this.drawCollection(collection.favoriteCollection)
	}

	checkUserCollectionOnCopies(cardId){
		return this.favoriteCollection.findIndex(element => element.imdbID === cardId.imdbID)
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
	cardContainer.classList.remove('show','films-collection');
}

const collection = new Collection();
collection.getCollection();
addEventOnSwiper();

if(sessionStorage.getItem('userCollection')){
	const savedUserCollection = JSON.parse(sessionStorage.getItem('userCollection'));
	collection.favoriteCollection = savedUserCollection;
	userCollectionCount.innerText = savedUserCollection.length
}

cardContainer.addEventListener('click', (event) => {
	if (event.target.classList.contains('card__wrapper-like')) {
		const cardHref = event.target.nextElementSibling.querySelector('a').href;
		const cardId = {
			imdbID: cardHref.split('/').splice(4, 1).join()
		}
		const cardIndex = collection.checkUserCollectionOnCopies(cardId)
		if (cardIndex === -1) {
			userCollectionCount.innerText = Number(userCollectionCount.innerText) + 1;
			collection.favoriteCollection.push(cardId)
		} else if(cardContainer.classList.contains('films-collection')){
			userCollectionCount.innerText = Number(userCollectionCount.innerText) - 1;
			collection.favoriteCollection.splice(cardIndex,1);
			collection.updateUserCollection()
		}
		sessionStorage.setItem('userCollection',JSON.stringify(collection.favoriteCollection))
	}
})

userCollection.addEventListener('click', () => {
	result.innerHTML = "Press on <span>heart</span> to add in your collection"
	collection.updateUserCollection()
})

export {
	removeEventOnSwiper,
	addEventOnSwiper,
	collection
}