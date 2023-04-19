const img = [
  { id: 0, src: 'img/img1.webp' },
  { id: 1, src: 'img/img2.webp' },
  { id: 2, src: 'img/img3.webp' },
  { id: 3, src: 'img/img4.webp' },
  { id: 4, src: 'img/img5.webp' },
  { id: 5, src: 'img/img6.webp' },
  { id: 6, src: 'img/img7.webp' },
  { id: 7, src: 'img/img8.webp' },
];

const slider = document.querySelector('#slider');
const controls = document.querySelector('#controls');
const buttonNext = controls.querySelector('#buttonNext');
const buttonPrev = controls.querySelector('#buttonPrev');
const thumbnails = document.querySelector('#thumbnails');

const mainImg = document.createElement('img');
mainImg.src = img[0].src;
mainImg.dataset.index = img[0].id;
slider.appendChild(mainImg);

preloadImages();
addThumbnails();

buttonNext.addEventListener('click', () => {
  const currentIndex = parseInt(mainImg.dataset.index);

  if (currentIndex + 1 > img.length - 1) {
    mainImg.src = img[0].src;
    mainImg.dataset.index = img[0].id;
  }
  if (currentIndex + 1 <= img.length - 1) {
    mainImg.src = img[currentIndex + 1].src;
    mainImg.dataset.index = img[currentIndex + 1].id;
  }

  removeThumbnails();
  addThumbnails();
})

buttonPrev.addEventListener('click', () => {
  const currentIndex = parseInt(mainImg.dataset.index);

  if (currentIndex - 1 < 0) {
    mainImg.src = img[img.length - 1].src;
    mainImg.dataset.index = img[img.length - 1].id;
  }

  if (currentIndex - 1 >= 0) {
    mainImg.src = img[currentIndex - 1].src;
    mainImg.dataset.index = img[currentIndex - 1].id;
  }

  removeThumbnails();
  addThumbnails();
})

document.addEventListener('keydown', e => {
  const currentIndex = parseInt(mainImg.dataset.index);

  if (e.key === 'ArrowRight') {
    if (currentIndex + 1 > img.length - 1) {
      mainImg.src = img[0].src;
      mainImg.dataset.index = img[0].id;
    }
    if (currentIndex + 1 <= img.length - 1) {
      mainImg.src = img[currentIndex + 1].src;
      mainImg.dataset.index = img[currentIndex + 1].id;
    }
  }

  if (e.key === 'ArrowLeft') {
    if (currentIndex - 1 < 0) {
      mainImg.src = img[img.length - 1].src;
      mainImg.dataset.index = img[img.length - 1].id;
    }

    if (currentIndex - 1 >= 0) {
      mainImg.src = img[currentIndex - 1].src;
      mainImg.dataset.index = img[currentIndex - 1].id;
    }
  }

  removeThumbnails();
  addThumbnails();
});


function addThumbnails() {
  const staringIndex = parseInt(mainImg.dataset.index);
  img.forEach((e, index) => {
    if (index >= staringIndex && index <= staringIndex + 4) {
      const thumbnailsImg = document.createElement('img');

      if (index === staringIndex) {
        thumbnailsImg.classList.add('thumbnail-active');
      }

      thumbnailsImg.src = img[index].src;
      thumbnailsImg.dataset.index = img[index].id;
      thumbnails.appendChild(thumbnailsImg);

      if (index === img.length - 1) {
        const newThumbnailsCount = 5 - Array.from(thumbnails.children).length;

        img.forEach((e, index) => {
          if (index < newThumbnailsCount) {
            const thumbnailsImg = document.createElement('img');

            thumbnailsImg.src = img[index].src;
            thumbnailsImg.dataset.index = img[index].id;
            thumbnails.appendChild(thumbnailsImg);
          }
        })
      }
    }
  })

  const currentThumbnails = Array.from(thumbnails.children);

  currentThumbnails.forEach((e) => {
    e.addEventListener('click', () => {
      mainImg.src = img[e.dataset.index].src;
      mainImg.dataset.index = e.dataset.index;

      removeThumbnails();
      addThumbnails();
    })
  })
}

function removeThumbnails() {
  Array.from(thumbnails.children).forEach((e) => {
    e.remove();
  })
}

function preloadImages() {
  img.forEach((e) => {
    let img = new Image();
    img.src = e.src;
    console.log(e.src)
  })
}



