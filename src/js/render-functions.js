'use ctrict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const buttonShowMore = document.querySelector('.button-load-more');
export async function createGallery(images) {
  const markup = await images
    .map(item => {
      const {
        downloads,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
      } = item;

      return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
          <img
            class="gallery-image"
            src="${webformatURL}"
            data-source="${largeImageURL}"
            alt="${tags}"
          />
        </a>
        <ul class="number-list">
          <li class="numder-item">
            <p class=" ">Likes</p>
            <p class="umber-text">${likes}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Views</p>
            <p class="umber-text">${views}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Comments</p>
            <p class="umber-text">${comments}</p>
          </li>
          <li class="numder-item">
            <p class="umber-text">Downloads</p>
            <p class="umber-text">${downloads}</p>
          </li>
        </ul>
      </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export async function clearGallery() {
  gallery.innerHTML = '';
}

export async function showLoader() {
  loader.classList.remove('hidden');
}

export async function hideLoader() {
  loader.classList.add('hidden');
}

export async function showLoadMoreButton() {
  buttonShowMore.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  buttonShowMore.classList.add('hidden');
}
