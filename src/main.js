import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './js/pixabay-api';
import { renderImageList } from './js/render-functions';

const lightbox = new SimpleLightbox('.gallery-list a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});

function showToast(message, color) {
  iziToast.show({
    message,
    image: '../img/bi_x-octagon.svg',
    messageColor: '#FFF',
    position: 'topRight',
    backgroundColor: color,
    maxWidth: '472px',
    imageWidth: 24,
  });
}

function showErrorToast(message) {
  showToast(message, '#EF4040');
}

function showInfoToast(message) {
  showToast(message, '#323C7F');
}

const form = document.querySelector('.form');
const loadMore = document.querySelector('.btn-lmore');
const imageList = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');

function scrollImages(rows) {
  let imgHeight = imageList.querySelector('li').getBoundingClientRect().height;
  window.scrollBy({
    top: imgHeight * rows,
    behavior: 'smooth',
  });
}

function updateImageList(hits, append) {
  const markup = renderImageList(hits);
  if (append) {
    const tmp = document.createElement('template');
    tmp.innerHTML = markup
    imageList.appendChild(tmp.content);
  } else {
    imageList.innerHTML = markup;
  }
  lightbox.refresh();
}

function toggle(element, visible) {
  if (visible) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

const search = {
  query: '',
  page: {
    number: 0,
    size: 15,
    last: false,
  },
  totalItems: 0,

  nextPage() {
    this.page.number++;
    return this.page;
  },

  hasNextPage() {
    const loadedItems = this.page.number * this.page.size;
    return this.totalItems && loadedItems < this.totalItems;
  },

  reset(query, pageSize = 15) {
    this.query = query.trim();
    this.totalItems = 0;
    this.page = {
      number: 0,
      size: pageSize,
      last: false,
    };
  },
};

async function loadImages(callback) {
  toggle(loader, true);
  toggle(loadMore, false);
  try {
    const data = await searchImages(search.query, search.nextPage());
    callback(data);
  } catch (e) {
    console.error(e);
    showErrorToast("Sorry, something went wrong. Try one more time.");
  } finally {
    toggle(loader, false);
    toggle(loadMore, search.hasNextPage());

    if (search.totalItems) {
      if (!search.hasNextPage()) {
        showInfoToast("We're sorry, but you've reached the end of search results.");
      }
    } else {
      showErrorToast("Sorry, there are no images matching your search query. Please try again!");
    }
  }
}


form.addEventListener('submit', async event => {
  event.preventDefault();

  search.reset(event.target.elements.query.value);
  if (!search.query.length) {
    showErrorToast("Please input non-blank query.");
    return;
  }

  updateImageList([], false);

  await loadImages(data => {
    updateImageList(data.hits || [], false);
    search.totalItems = data.totalHits || 0;
  });
});

loadMore.addEventListener('click', async event => {
  event.preventDefault();

  await loadImages(data => {
    updateImageList(data.hits || [], true);
    scrollImages(2);
  });
});


