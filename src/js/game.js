const container = document.querySelector('.container');


document.querySelector('#myonoffswitch').addEventListener('change',(event)=>{
	if(event.target.checked){
		container.classList.remove('play');
	} else {
		container.classList.add('play');
	}
})

