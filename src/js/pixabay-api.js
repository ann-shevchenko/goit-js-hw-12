import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const searchImages = async (query, page) => {
  let response = await axios.get(BASE_URL, {
    params: {
      key: '44022790-a27ad4929b92e52df6d2f0bb4',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page.number,
      per_page: page.size,
    },
  });

  return response.data || {};
};

export {
  searchImages,
};