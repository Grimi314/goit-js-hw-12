import iziToast from "izitoast";

import {
  createGallery,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

import { getImagesByQuery } from "./js/pixabay-api";

const buttonShowMore = document.querySelector(".button-load-more");
const userForm = document.querySelector(".form");

let query = "";
let page = 1;
let loadedImages = 0;
let totalImages = 0;

/* ---------- SUBMIT ---------- */
userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  query = event.target.elements["search-text"].value.trim();
  if (!query) return;

  page = 1;
  loadedImages = 0;

  clearGallery();
  hideLoadMoreButton(); // ховаємо кнопку на старті нового пошуку
  showLoader();

  try {
    const search = await getImagesByQuery(query, page);

    if (search.hits.length === 0) {
      iziToast.error({
        title: "Error",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    createGallery(search.hits);

    totalImages = search.totalHits;
    loadedImages += search.hits.length;

    if (loadedImages < totalImages) {
      showLoadMoreButton();
    } else {
      iziToast.error({
        title: "Error",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Server error. Try again later.",
    });
  } finally {
    hideLoader();
  }
});

/* ---------- LOAD MORE ---------- */
buttonShowMore.addEventListener("click", async () => {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const search = await getImagesByQuery(query, page);

    createGallery(search.hits);
    loadedImages += search.hits.length;

    smoothScroll();

    if (loadedImages < totalImages) {
      showLoadMoreButton();
    } else {
      iziToast.error({
        title: "Error",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Server error.",
    });
  } finally {
    hideLoader();
  }
});

/* ---------- SCROLL ---------- */
function smoothScroll() {
  requestAnimationFrame(() => {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lastItem = galleryItems[galleryItems.length - 1];
    if (!lastItem) return;

    const { height } = lastItem.getBoundingClientRect();

    window.scrollBy({
      top: height * 2,
      behavior: "smooth",
    });
  });
}
