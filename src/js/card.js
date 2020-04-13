import {cards,links} from './data'

class Card {
	constructor(options) {
		this.word = options.word;
		this.translation = options.translation;
		this.image = options.image;
	}

	init(){
		const card = `
		<div class="card-container">
		<div class="card">
			<div class="front" style="background-image: url(${this.image})">
				<span>${this.word}</span>
			</div>
			<div class="back" style="background-image: url(${this.image})">
				<span>${this.translation}</span>
			</div>
			<button class="rotate"></button>
		</div>
		</div>`	
		container.innerHTML += card;
	}

}

const container = document.querySelector('.container')

function drawCards(index) {
	container.innerHTML = '';
	cards[index].forEach(element => {
		const card = new Card(element)
		card.init()
	})
}

container.addEventListener('click', ()=>{
	if(event.target.classList.contains('rotate')){
		event.target.parentElement.classList.add('translate')
	}
})

container.addEventListener('mouseout', ()=>{
	if(event.target.classList.contains('card')){
		console.log(event.target)
		event.target.classList.remove('translate')	
	}
})

export default drawCards