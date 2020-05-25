export default async function getImage(weather, summary) {
	sessionStorage.setItem('weather', `${weather},${summary}`);
	const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${weather},${summary}&client_id=ab0868d66e52831fa660f145b8ba78d100ff841127ab78a118ad08f3fcf0e98e`;
	const response = await fetch(url);
	const data = await response.json();
	document.querySelector('.wrapper').style.backgroundImage = `url(${data.urls.regular})`;
	document.querySelector('.wrapper').style.backgroundSize = 'cover';
}
