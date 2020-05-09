import collection from './collection';
import {
	addEventOnSwiper,
} from './swiper';
import {
	container,
	input,
	searchBtn,
	cancelBtn,
	loader,
	result,
	keyboardShowBtn,
	keyboard,
} from './data';

function isCyrillic(word) {
	return /[а-яё]/i.test(word);
}

function showKeyboard() {
	if (keyboard.classList.contains('show')) {
		keyboard.classList.remove('show');
		container.classList.remove('active');
	} else {
		keyboard.classList.add('show');
		container.classList.add('active');
	}
}

class Search {
	constructor() {
		this.newWord = '';
	}

	async startSearch() {
		result.innerHTML = '';
		if (input.value) {
			if (isCyrillic(input.value)) {
				const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T194324Z.1fc3d382b16099a7.576c0a6f5f134312f2eaec19bb60b5a666de1916&text=${input.value}&lang=ru-en`;
				const response = await fetch(url);
				const data = await response.json();
				this.newWord = data.text[0];
				result.innerHTML = `Showing results for <span>${this.newWord}</span>`;
			} else {
				this.newWord = input.value;
			}
			this.waitingForLoading();
		}
	}

	async waitingForLoading() {
		collection.page = 1;
		this.showLoader();
		await collection.getCollection(this.newWord);
		this.showLoader();
		addEventOnSwiper();
	}

	showLoader() {
		searchBtn.style.display = searchBtn.style.display === 'none' ? 'block' : 'none';
		loader.style.display = loader.style.display === 'block' ? 'none' : 'block';
	}
}

const search = new Search();

document.addEventListener('keyup', (event) => {
	if (event.code === 'Enter') {
		search.startSearch();
	}
});

searchBtn.addEventListener('click', () => {
	search.startSearch();
});

cancelBtn.addEventListener('click', () => {
	input.value = '';
});

keyboardShowBtn.addEventListener('click', () => {
	showKeyboard();
});

export {
	search,
	showKeyboard,
};
