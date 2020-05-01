import Card from './card';
import {
	cardContainer,
	result,
	mySwiper
} from './data';

class Collection {
	constructor() {
		this.page = 1;
		this.searchWord = '';
	}

	async getCollection(keyWord = 'star') {
		try{
		const url = `http://www.omdbapi.com/?s=${keyWord}&page=${this.page}&apikey=e795be05`
		const response = await fetch(url);
		const data = await response.json();
		if (!data.Error) {
			for(const item of data.Search){
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
}

function addEventOnSwiper() {
	mySwiper.on('reachEnd', function () {
		collection.updateCollection()
	});
}

const collection = new Collection();
collection.getCollection();
addEventOnSwiper();

export {
	addEventOnSwiper,
	collection
}