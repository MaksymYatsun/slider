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

addSlider('#slider', imagesArray);

function addSlider(sliderId, imgArr, thumbnailsCount = 5) {
  const sliderContainer = document.querySelector(sliderId);
  const slider = sliderContainer.children[0];
  const controls = sliderContainer.children[1];
  const buttonPrev = controls.children[0];
  const buttonNext = controls.children[1];
  const thumbnails = sliderContainer.children[2];

  const mainImg = document.createElement('img');
  mainImg.classList.add('main-img');

  updateMainImg(imgArr[0]);

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
      updateMainImg(imgArr[0])
    } else {
      updateMainImg(imgArr[currentIndex + 1]);
    }

    addThumbnails();
  })

  buttonPrev.addEventListener('click', () => {
    const currentIndex = parseInt(mainImg.dataset.index);

    if (currentIndex - 1 < 0) {
      updateMainImg(imgArr[imgArr.length - 1]);
    } else {
      updateMainImg(imgArr[currentIndex - 1]);
    }

    addThumbnails();
  })

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
  }

  function addThumbnails() {
    Array.from(thumbnails.children).forEach((e) => {
      e.remove();
    })

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


