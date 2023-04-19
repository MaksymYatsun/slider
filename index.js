const img = [
  { id: 0, imgSrc: 'img/img1.webp' },
  { id: 1, imgSrc: 'img/img2.webp' },
  { id: 2, imgSrc: 'img/img3.webp' },
  { id: 3, imgSrc: 'img/img4.webp' },
  { id: 4, imgSrc: 'img/img5.webp' },
  { id: 5, imgSrc: 'img/img6.webp' },
  { id: 6, imgSrc: 'img/img7.webp' },
  { id: 7, imgSrc: 'img/img8.webp' },
];

const slider = document.querySelector('#slider');
const controls = document.querySelector('#controls');
const buttonNext = controls.querySelector('#buttonNext');
const buttonPrev = controls.querySelector('#buttonPrev');
const thumbnails = document.querySelector('#thumbnails');
let currentImgIndex = 0;

const mainImg = document.createElement('img');
mainImg.src = img[0].imgSrc;
slider.appendChild(mainImg);

img.forEach((e, index) => {
  const thumbnailsImg = document.createElement('img');

  if (index <= 4) {
    thumbnailsImg.src = img[index].imgSrc;
    thumbnailsImg.dataset.index = img[index].id;
    if (index === 0) {
      thumbnailsImg.classList.add('thumbnail-active');
    }
    thumbnails.appendChild(thumbnailsImg);
  }
});

moveToImage()

buttonNext.addEventListener('click', () => {
  currentImgIndex++;
  moveToNextThumbnail()

  if (currentImgIndex === img.length) {
    currentImgIndex = 0;
  }

  mainImg.src = img[currentImgIndex].imgSrc;
  moveToImage()
})

buttonPrev.addEventListener('click', () => {
  currentImgIndex--;

  if (currentImgIndex === -1) {
    currentImgIndex = img.length - 1;
  }


  mainImg.src = img[currentImgIndex].imgSrc;

  moveToPrevThumbnail()
})

function moveToNextThumbnail() {
  const currentThumbnails = Array.from(thumbnails.children);

  currentThumbnails[0].classList.remove('thumbnail-active');
  currentThumbnails[0].remove();
  currentThumbnails[1].classList.add('thumbnail-active')


  const newThumbnail = document.createElement('img');
  if (currentImgIndex + 4 < img.length) {
    newThumbnail.src = img[currentImgIndex + 4].imgSrc;
    newThumbnail.dataset.index = img[currentImgIndex + 4].id;
    thumbnails.appendChild(newThumbnail);
  }

  if (currentImgIndex + 4 >= img.length) {
    newThumbnail.src = img[currentImgIndex - 4].imgSrc;
    newThumbnail.dataset.index = img[currentImgIndex - 4].id;
    thumbnails.appendChild(newThumbnail);
  }

  moveToImage()
}

function moveToPrevThumbnail() {
  const currentThumbnails = Array.from(thumbnails.children);

  currentThumbnails[4].remove()
  currentThumbnails[0].classList.remove('thumbnail-active');

  const newThumbnail = document.createElement('img');

  newThumbnail.src = img[currentImgIndex].imgSrc;
  newThumbnail.dataset.index = img[currentImgIndex].id;
  newThumbnail.classList.add('thumbnail-active')
  thumbnails.prepend(newThumbnail);
  moveToImage()
}

function moveToImage() {
  const currentThumbnails = Array.from(thumbnails.children);

  currentThumbnails.forEach((e) => {
    e.addEventListener('click', () => {
      if (parseInt(e.dataset.index) === currentImgIndex) {
        console.log('Already Here')
        return
      }

      mainImg.src = img[parseInt(e.dataset.index)].imgSrc;
      currentImgIndex = parseInt(e.dataset.index);

      for (const thumbnail of currentThumbnails) {
        thumbnail.remove();
      }

      const newThumbnails = Array.from(thumbnails.children);
      const newThumbnailsCount = currentThumbnails.length - newThumbnails.length;

      for (let i = 0; i < newThumbnailsCount; i++) {

        if (parseInt(e.dataset.index) + i < img.length) {
          const newThumbnail = document.createElement('img');
          newThumbnail.src = img[parseInt(e.dataset.index) + i].imgSrc;

          if (i === 0) {
            newThumbnail.classList.add('thumbnail-active')
          }

          thumbnails.appendChild(newThumbnail)
        }
        if (parseInt(e.dataset.index) + i >= img.length) {
          const newThumbnail = document.createElement('img');
          newThumbnail.src = img[(parseInt(e.dataset.index) + i) - img.length].imgSrc;
          thumbnails.appendChild(newThumbnail);
        }
      }
    })
  })
}



