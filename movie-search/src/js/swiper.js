import Card from './card'

const result = document.querySelector('.result')

class Collection {
	constructor(){

	}

	async getCollection(keyWord = 'star') {
		const url = `http://www.omdbapi.com/?s=${keyWord}&page=1&apikey=e795be05`
		const response = await fetch(url);
		const data = await response.json();
		if(!data.Error){
			data.Search.forEach(element => {
				new Card(element).getMoreInfoCard()
			});
		} else {
			result.innerHTML = data.Error
		}
	}
	
}

const collection = new Collection();
collection.getCollection()

const mySwiper = new Swiper ('.swiper-container', {
	speed: 1500,
	direction: 'horizontal',
	loop: true,
	slidesPerView: 'auto',
	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		300:{
			slidesPerView:1,
			slidesPerGroup:1,
		},
    768: {
      slidesPerView: 2,
			slidesPerGroup:2,
    },
    1024: {
      slidesPerView: 3,
			slidesPerGroup:3,
    },
    1300: {
			slidesPerView: 4,				
			slidesPerGroup:4,
    }
  }
})

export { mySwiper , collection }


