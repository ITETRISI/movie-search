import { addEventOnSwiper , collection } from './swiper';
import {
	cardContainer,
	input,
	searchBtn,
	cancelBtn,
	loader,
	delay,
	result,
	mySwiper,
	keyboardShowBtn
} from './data'

function isCyrillic(word){
	return /[а-яё]/i.test(word);
}

class Search {
	constructor(){
		this.newWord = '';
	}

	async startSearch(){
		if(input.value){
			if(isCyrillic(input.value)){
				const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T194324Z.1fc3d382b16099a7.576c0a6f5f134312f2eaec19bb60b5a666de1916&text=${input.value}&lang=ru-en`
				const response = await fetch(url);
				const data = await response.json();
				this.newWord = data.text[0]
				result.innerHTML = `Showing results for ${this.newWord}`
			} else {
				this.newWord = input.value;
			}
			mySwiper.off('reachEnd');
			mySwiper.removeAllSlides();
			mySwiper.update();
			this.waitingForLoading()
		}
	}

	async waitingForLoading() {
		collection.searchWord = this.newWord;
		collection.page = 1;
		this.showLoader();
		cardContainer.classList.remove('show');
		await delay(500);
		await collection.getCollection(this.newWord);
		addEventOnSwiper()
		this.showLoader()
	}

	showLoader(){
		searchBtn.style.display = searchBtn.style.display==='none' ? 'block':'none'
		loader.style.display = loader.style.display==='block' ? 'none' : 'block';
	}
	
}

const search = new Search()

input.addEventListener('keydown',(event)=>{
 if(event.key === 'Enter'){
	  result.innerHTML = '';
	  search.startSearch();
 }
})

searchBtn.addEventListener('click',()=>{
	result.innerHTML = '';
	search.startSearch();
})

cancelBtn.addEventListener('click',()=>{
	input.value = '';
})

keyboardShowBtn.addEventListener('click',()=>{
	showKeyboard()
})

function showKeyboard(){
	if(document.querySelector('.keyboard').classList.contains('show')){
		document.querySelector('.keyboard').classList.remove('show')
	} else {
		document.querySelector('.keyboard').classList.add('show')
	}
		
}

export { search , showKeyboard }