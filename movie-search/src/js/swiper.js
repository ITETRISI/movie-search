import Card from './card'

class Collection {
	constructor(){

	}

	async getCollection() {
		const url = 'http://www.omdbapi.com/?s=star&page=1&apikey=e795be05'
		const response = await fetch(url);
		const data = await response.json();
		data.Search.forEach(element => {
			new Card(element).getMoreInfoCard()
		});
		
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

export default mySwiper


