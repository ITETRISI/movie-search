import {
  errorBlock,
} from './data';

export default async function getImage(month, hour, icon) {
  if (hour < 19 && hour > 9) {
    hour = 'day';
  } else {
    hour = 'night';
  }
  try {
    sessionStorage.setItem('weather', `${month},${hour},${icon}`);
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${month},${hour},${icon},landscape&client_id=ab0868d66e52831fa660f145b8ba78d100ff841127ab78a118ad08f3fcf0e98e`;
    const response = await fetch(url);
    const data = await response.json();
    const backgroundImage = document.querySelector('.background-image');
    backgroundImage.classList.add('bg-loading');
    let preloaderImg = document.createElement('img');
    preloaderImg.src = data.urls.regular;
    preloaderImg.addEventListener('load', () => {
      backgroundImage.classList.remove('bg-loading');
      backgroundImage.style.backgroundImage = `url(${data.urls.regular})`;
      preloaderImg = null;
    });
  } catch (error) {
    errorBlock.innerText = 'Image limit reached';
  }
}
