
import galleryItems from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(elements) {
  return elements
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

refs.galleryContainer.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  evt.preventDefault();

  refs.modal.classList.add('is-open');
  refs.modalImage.src = evt.target.dataset.source;
  refs.modalImage.alt = evt.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowLeftPress);
  window.addEventListener('keydown', onArrowRightPress);
}

refs.modalCloseBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowLeftPress);
  window.removeEventListener('keydown', onArrowRightPress);
}

refs.modalOverlay.addEventListener('click', onOverlayClick);

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onArrowLeftPress(evt) {
  const ARR_LEFT_KEY_CODE = 'ArrowLeft';
  const isArrLeftKey = evt.code === ARR_LEFT_KEY_CODE;

  if (isArrLeftKey) {
    const sources = galleryItems.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(refs.modalImage.src);

    if (indexOfCurrentImg === 0) {
      indexOfCurrentImg = sources.length;
    }
    refs.modalImage.src = sources[indexOfCurrentImg - 1];
    console.log(indexOfCurrentImg);
  }
}

function onArrowRightPress(evt) {
  const ARR_RIGHT_KEY_CODE = 'ArrowRight';
  const isArrRightKey = evt.code === ARR_RIGHT_KEY_CODE;

  if (isArrRightKey) {
    const sources = galleryItems.map(({ original }) => original);
    let indexOfCurrentImg = sources.indexOf(refs.modalImage.src);

    if (indexOfCurrentImg + 1 > sources.length - 1) {
      indexOfCurrentImg = -1;
    }
    refs.modalImage.src = sources[indexOfCurrentImg + 1];
    console.log(indexOfCurrentImg + 1);
  }
}

export default {refs, galleryMarkup, createGalleryMarkup, onOpenModal, onCloseModal, onOverlayClick, onEscKeyPress, onArrowLeftPress, onArrowRightPress}