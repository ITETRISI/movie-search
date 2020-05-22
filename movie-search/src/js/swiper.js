import { mySwiper, cardContainer } from './data';
import collection from './collection';

function addEventOnSwiper() {
  mySwiper.on('reachEnd', () => {
    collection.updateCollection();
  });
}

function removeEventOnSwiper() {
  mySwiper.off('reachEnd');
  mySwiper.removeAllSlides();
  mySwiper.update();
  cardContainer.classList.remove('show', 'films-collection');
}

export { addEventOnSwiper, removeEventOnSwiper };
