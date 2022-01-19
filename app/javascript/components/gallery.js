const gallery = () => {
  // query selector
  const lightboxEnabled = document.querySelectorAll('.lightbox-enabled');
  const lightboxArray = Array.from(lightboxEnabled);
  const lastImage = lightboxArray.length -1;

  const lightboxContainer = document.querySelector('.lightbox-container');
  const lightboxImage = document.querySelector('.lightbox-image');

  const lightboxBtns = document.querySelectorAll('.lightbox-btn');
  const lightboxBtnLeft = document.querySelector('#left');
  const lightboxBtnRight = document.querySelector('#right');

  let activeImage;

  // Functions

  const showLightBox = () => { lightboxContainer.classList.add('active') }

  const hideLightBox = () => { lightboxContainer.classList.remove('active') }

  const setActiveImage = (image) => {
    lightboxImage.src = image.dataset.imagesrc;
    activeImage = lightboxArray.indexOf(image);

    switch (activeImage) {
      case 0:
        lightboxBtnLeft.classList.add('inactive');
        break;
      case lastImage:
        lightboxBtnRight.classList.add('inactive');
        break;
      default:
        lightboxBtns.forEach(btn => {
          btn.classList.remove('inactive');
        })
    }
  }

  const transitionSlideLeft = () => {
    lightboxBtnLeft.focus();
    activeImage === 0 ? setActiveImage(lightboxArray[lastImage]) : setActiveImage(lightboxArray[activeImage].previousElementSibling);
  }

  const transitionSlideRight = () => {
    lightboxBtnRight.focus();
    activeImage === lastImage ? setActiveImage(lightboxArray[0]) : setActiveImage(lightboxArray[activeImage].nextElementSibling);
  }

  const transitionSlideHandler = (moveItem) => {
    moveItem.includes('left') ? transitionSlideLeft() : transitionSlideRight();
  }

  // Event Listeners

  lightboxEnabled.forEach(image => {
    image.addEventListener('click', (e) => {
      showLightBox();
      setActiveImage(image);
    })
  })

  lightboxContainer.addEventListener('click', (e) => {
    hideLightBox();
  })

  lightboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      transitionSlideHandler(e.currentTarget.id);
    })
  })
};

export { gallery };
