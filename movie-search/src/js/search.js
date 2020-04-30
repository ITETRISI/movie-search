import { mySwiper , collection } from './swiper';

const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search');
const cancelBtn = document.querySelector('.cancel');
const loader = document.querySelector('.loader');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const result = document.querySelector('.result');
class Search {
	constructor(){
	}

	async startSearch(){
		if(input.value){
		const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T194324Z.1fc3d382b16099a7.576c0a6f5f134312f2eaec19bb60b5a666de1916&text=${input.value}&lang=ru-en`
		const response = await fetch(url);
		const data = await response.json();
		result.innerHTML = `Result for ${data.text[0]}`
		mySwiper.removeAllSlides()
		mySwiper.update()
		searchBtn.style.display = 'none';
		loader.style.display = 'block'
		await delay(500);
		await collection.getCollection(data.text[0])
		searchBtn.style.display = 'block';
		loader.style.display = 'none'
		}
	}
}

const search = new Search()

input.addEventListener('keydown',(event)=>{
 if(event.key === 'Enter'){
	 search.startSearch();
 }
})

searchBtn.addEventListener('click',()=>{
	search.startSearch();
})

cancelBtn.addEventListener('click',()=>{
	input.value = '';
})