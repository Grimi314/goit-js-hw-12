import iziToast from 'izitoast';

import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import { getImagesByQuery, config } from './js/pixabay-api';
const buttonShowMore = document.querySelector('.button-load-more');

const userForm = document.querySelector('.form');

let query = '';
let loadedImages = 0;
let totalImages = 0;

userForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  clearGallery();
  showLoader();

  config.params.page = 1;
  loadedImages = 0;

  try {
    const search = await getImagesByQuery(query);

    if (search.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoader();
      return;
    }

    createGallery(search.hits);

    totalImages = search.totalHits;
    loadedImages += search.hits.length;

    showLoadMoreButton();
    hideLoader();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Server error. Try again later.',
    });
    hideLoader();
  }
});

// buttonShowMore.addEventListener('click', async () => {
//   config.params.page++;

//   const search = await getImagesByQuery(query);

//   createGallery(search.hits);
//   loadedImages += search.hits.length;

//   const galleryItems = document.querySelectorAll('.gallery-item');
//   const lastCard = galleryItems[galleryItems.length - 1];

//   const cardHeight = lastCard.getBoundingClientRect().height;

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
//   if (loadedImages >= totalImages) {
//     hideLoadMoreButton();
//     iziToast.error({
//       title: 'error',
//       message: "We're sorry, but you've reached the end of search results.",
//     });
//   }
// });

buttonShowMore.addEventListener('click', () => {
  config.params.page++;

  getImagesByQuery(query)
    .then(search => {
      createGallery(search.hits); // додаємо нові картинки
      loadedImages += search.hits.length;

      // Дочекатися наступного "рендеру" DOM
      requestAnimationFrame(() => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lastItem = galleryItems[galleryItems.length - 1];
        if (!lastItem) return;

        const lastImage = lastItem.querySelector('img');
        if (!lastImage.complete) {
          // якщо картинка ще не завантажилась
          lastImage.onload = () => {
            const { height } = lastItem.getBoundingClientRect();
            window.scrollBy({ top: height * 2, behavior: 'smooth' });
          };
        } else {
          // картинка вже завантажена
          const { height } = lastItem.getBoundingClientRect();
          window.scrollBy({ top: height * 3, behavior: 'smooth' });
        }
      });

      if (loadedImages >= totalImages) {
        hideLoadMoreButton();
        iziToast.error({
          title: 'Error',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    })
    .catch(() => {
      iziToast.error({ title: 'Error', message: 'Server error.' });
    });
});
