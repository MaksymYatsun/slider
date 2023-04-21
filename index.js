const imagesArray = [
  { id: 0, src: 'https://picsum.photos/700/500?random=1' },
  { id: 1, src: 'https://picsum.photos/700/500?random=2' },
  { id: 2, src: 'https://picsum.photos/700/500?random=3' },
  { id: 3, src: 'https://picsum.photos/700/500?random=4' },
  { id: 4, src: 'https://picsum.photos/700/500?random=5' },
  { id: 5, src: 'https://picsum.photos/700/500?random=6' },
  { id: 6, src: 'https://picsum.photos/700/500?random=7' },
  { id: 7, src: 'https://picsum.photos/700/500?random=8' },
];

addSlider(imagesArray, '#slider', 5);

function addSlider(imgArr, sliderId, thumbnailsCount) {
  const sliderContainer = document.querySelector(sliderId);
  const slider = sliderContainer.querySelector('#slider-main');
  const controls = sliderContainer.querySelector('#controls');
  const buttonNext = controls.querySelector('#buttonNext');
  const buttonPrev = controls.querySelector('#buttonPrev');
  const thumbnails = sliderContainer.querySelector('#thumbnails');

  const mainImg = document.createElement('img');
  mainImg.classList.add('main-img');
  mainImg.src = imgArr[0].src;
  mainImg.dataset.index = imgArr[0].id;
  slider.appendChild(mainImg);

  addThumbnails();

  thumbnails.addEventListener('click', (e) => {
    mainImg.src = imgArr[e.target.dataset.index].src;
    mainImg.dataset.index = e.target.dataset.index;

    addThumbnails();
  });

  buttonNext.addEventListener('click', () => {
    const currentIndex = parseInt(mainImg.dataset.index);

    if (currentIndex + 1 > imgArr.length - 1) {
      mainImg.src = imgArr[0].src;
      mainImg.dataset.index = imgArr[0].id;
    } else {
      mainImg.src = imgArr[currentIndex + 1].src;
      mainImg.dataset.index = imgArr[currentIndex + 1].id;
    }

    addThumbnails();
  })

  buttonPrev.addEventListener('click', () => {
    const currentIndex = parseInt(mainImg.dataset.index);

    if (currentIndex - 1 < 0) {
      mainImg.src = imgArr[imgArr.length - 1].src;
      mainImg.dataset.index = imgArr[imgArr.length - 1].id;
    } else {
      mainImg.src = imgArr[currentIndex - 1].src;
      mainImg.dataset.index = imgArr[currentIndex - 1].id;
    }

    addThumbnails();
  })

  document.addEventListener('keydown', e => {
    const currentIndex = parseInt(mainImg.dataset.index);

    if (e.key === 'ArrowRight') {
      if (currentIndex + 1 > imgArr.length - 1) {
        mainImg.src = imgArr[0].src;
        mainImg.dataset.index = imgArr[0].id;
      } else {
        mainImg.src = imgArr[currentIndex + 1].src;
        mainImg.dataset.index = imgArr[currentIndex + 1].id;
      }
    }

    if (e.key === 'ArrowLeft') {
      if (currentIndex - 1 < 0) {
        mainImg.src = imgArr[imgArr.length - 1].src;
        mainImg.dataset.index = imgArr[imgArr.length - 1].id;
      } else {
        mainImg.src = imgArr[currentIndex - 1].src;
        mainImg.dataset.index = imgArr[currentIndex - 1].id;
      }
    }

    addThumbnails();
  });

  function addThumbnails() {
    Array.from(thumbnails.children).forEach((e) => {
      e.remove();
    })

    const staringIndex = parseInt(mainImg.dataset.index);

    const newThumbnailsArr = imgArr.slice(staringIndex, staringIndex + thumbnailsCount);
    let restThumbnailsArr = [];

    if (newThumbnailsArr.length < thumbnailsCount) {
      restThumbnailsArr = imgArr.slice(0, thumbnailsCount - newThumbnailsArr.length);
    }

    const finalThumbnails = [...newThumbnailsArr, ...restThumbnailsArr];

    finalThumbnails.forEach((e, index) => {
      const thumbnailsImg = document.createElement('img');

      if (index === 0) {
        thumbnailsImg.classList.add('thumbnail-active');
      }

      thumbnailsImg.classList.add('thumbnail-image');
      thumbnailsImg.src = finalThumbnails[index].src;
      thumbnailsImg.dataset.index = finalThumbnails[index].id;
      thumbnails.appendChild(thumbnailsImg);
    });
  }
}


