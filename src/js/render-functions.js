function renderImageItem(image) {
  return `<li>
      <a class="gallery-link" href="${image.largeImageURL}">
      <img
          class="gallery-img"
          src="${image.webformatURL}"
          data-source="${image.largeImageURL}"
          alt="${image.tags}"></a>
      <div class="information">
       <div>
          <h3>Likes</h3>
          <p>${image.likes}</p>
       </div>
        <div>
            <h3>Views</h3>
            <p>${image.views}</p>
        </div>
        <div>
          <h3>Comments</h3>
          <p>${image.comments}</p>
        </div>
        <div>
          <h3>Downloads</h3>
          <p>${image.downloads}</p>
        </div>
      </div>
    </li>`;
}

function renderImageList(images) {
  if (images && images.length) {
    return images.map(renderImageItem).join('');
  }
  return '';
}

export {
  renderImageList,
};