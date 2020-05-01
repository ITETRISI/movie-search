const cardContainer = document.querySelector('.swiper-wrapper')
const result = document.querySelector('.result')
const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search');
const cancelBtn = document.querySelector('.cancel');
const loader = document.querySelector('.loader');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const mySwiper = new Swiper ('.swiper-container', {
	speed: 1000,
	direction: 'horizontal',
	slidesPerGroup:1,
	loop: true,
	slidesPerView: 'auto',
	
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	breakpoints: {
		300:{
			slidesPerView:1,
		},
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1300: {
			slidesPerView: 4,				
    }
	}
})

export {
	cardContainer,
	result,
	input,
	searchBtn,
	cancelBtn,
	loader,
	delay,
	mySwiper
}