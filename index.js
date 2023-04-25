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

addSlider('slider', imagesArray);

function addSlider(sliderId, imgArr, thumbnailsCount = 5) {
  const sliderContainer = document.getElementById(sliderId);
  const slider = sliderContainer.querySelector('.slider-main');
  const controls = sliderContainer.querySelector('.controls');
  const buttonPrev = controls.querySelector('.btn-prev');
  const buttonNext = controls.querySelector('.btn-next');
  const thumbnails = sliderContainer.querySelector('.thumbnails');

  const mainImg = document.createElement('img');
  mainImg.classList.add('main-img');

  updateMainImg(imgArr[0]);

  slider.appendChild(mainImg);

  addThumbnails();

  thumbnails.addEventListener('click', (e) => {
    updateMainImg(imgArr[e.target.dataset.index]);
    addThumbnails();
  });

  buttonNext.addEventListener('click', () => {
    const currentIndex = parseInt(mainImg.dataset.index);

    if (currentIndex + 1 > imgArr.length - 1) {
      updateMainImg(imgArr[0])
    } else {
      updateMainImg(imgArr[currentIndex + 1]);
    }

    addThumbnails();
  });

  buttonPrev.addEventListener('click', () => {
    const currentIndex = parseInt(mainImg.dataset.index);

    if (currentIndex - 1 < 0) {
      updateMainImg(imgArr[imgArr.length - 1]);
    } else {
      updateMainImg(imgArr[currentIndex - 1]);
    }

    addThumbnails();
  });

  document.addEventListener('keydown', e => {
    const currentIndex = parseInt(mainImg.dataset.index);

    if (e.key === 'ArrowRight') {
      if (currentIndex + 1 > imgArr.length - 1) {
        updateMainImg(imgArr[0]);
      } else {
        updateMainImg(imgArr[currentIndex + 1]);
      }
    }

    if (e.key === 'ArrowLeft') {
      if (currentIndex - 1 < 0) {
        updateMainImg(imgArr[imgArr.length - 1]);
      } else {
        updateMainImg(imgArr[currentIndex - 1]);
      }
    }

    addThumbnails();
  });

  function updateMainImg(img) {
    mainImg.src = img.src;
    mainImg.dataset.index = img.id;
    document.body.style.backgroundImage = (`url(${img.src})`)
  }

  function addThumbnails() {
    Array.from(thumbnails.children).forEach((e) => {
      e.remove();
    });

    const staringIndex = parseInt(mainImg.dataset.index);
    const newThumbnailsArr = imgArr.slice(staringIndex, staringIndex + thumbnailsCount);

    if (newThumbnailsArr.length < thumbnailsCount) {
      newThumbnailsArr.push(...imgArr.slice(0, thumbnailsCount - newThumbnailsArr.length));
    }

    newThumbnailsArr.forEach((e, index) => {
      const thumbnailsImg = document.createElement('img');

      if (index === 0) {
        thumbnailsImg.classList.add('thumbnail-active');
      }

      thumbnailsImg.classList.add('thumbnail-image');
      thumbnailsImg.src = newThumbnailsArr[index].src;
      thumbnailsImg.dataset.index = newThumbnailsArr[index].id;
      thumbnails.appendChild(thumbnailsImg);
    });
  }
}


