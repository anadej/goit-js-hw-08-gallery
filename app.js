const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryRef: document.querySelector('.js-gallery'),
  lightboxRef: document.querySelector('.js-lightbox'),
  imgLightboxRef: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

let indexActiveImg = 0;

const galleryTemplateStr = galleryItems
  .map(
    ({ preview, original, description }, index) =>
      `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image" data-index="${index}" src="${preview}" alt="${description}" /></a>
      </li>`,
  )
  .join('');

refs.galleryRef.insertAdjacentHTML('afterbegin', galleryTemplateStr);

refs.galleryRef.addEventListener('click', onImgClick);

//слушаем нажатие клавиш
refs.lightboxRef.addEventListener('click', e => {
  if (e.target.dataset.action === 'close-lightbox') onCloseLigthbox(e);
  if (e.target.classList.contains('lightbox__overlay')) onCloseLigthbox(e);
});

//слушаем нажатие клавиш
window.addEventListener('keydown', e => {
  if (!refs.lightboxRef.classList.contains('is-open')) return;
  if (e.code === 'Escape') onCloseLigthbox(e);
  if (e.code === 'ArrowLeft') onScrollingGallery(indexActiveImg, -1); //листаем налево
  if (e.code === 'ArrowRight') onScrollingGallery(indexActiveImg, 1); //листаем направо
});

//открытие модального окна
function onImgClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  indexActiveImg = +e.target.dataset.index; //получаем индекс активной картинки

  const srcOriginalImg = e.target.parentNode.getAttribute('href');
  const altOriginalImg = e.target.alt;

  refs.lightboxRef.classList.add('is-open');
  updateAttributeLightbox(srcOriginalImg, altOriginalImg);
}

//закрытие модального окна
function onCloseLigthbox(e) {
  refs.lightboxRef.classList.remove('is-open');
  updateAttributeLightbox();
}

//скролинг галереи
function onScrollingGallery(activeId, direction) {
  indexActiveImg = activeId + direction;

  if (indexActiveImg < 0) {
    indexActiveImg = galleryItems.length - 1;
  }

  if (indexActiveImg === galleryItems.length) {
    indexActiveImg = 0;
  }
  const nextSrcOriginalImg = galleryItems[indexActiveImg].original;
  const nextAltOriginalImg = galleryItems[indexActiveImg].description;

  updateAttributeLightbox(nextSrcOriginalImg, nextAltOriginalImg);
}

function updateAttributeLightbox(src = '', alt = '') {
  refs.imgLightboxRef.src = src;
  refs.imgLightboxRef.alt = alt;
}
