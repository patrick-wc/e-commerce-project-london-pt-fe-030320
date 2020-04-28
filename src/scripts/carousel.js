// *********************
// carousel
// *********************
const carousel = document.querySelector(".c-carousel__items");
const carouselSlidesQuantity = document.querySelectorAll(".c-carousel__item")
  .length;
const carouselArrowNext = document.querySelector(".c-carousel__arrow--next");
const carouselArrowPrev = document.querySelector(".c-carousel__arrow--prev");
const carouselThumbs = document.querySelectorAll(".c-carousel-thumbs__img");
let counter = 1;

carouselArrowNext.addEventListener("click", () => {
  const localCounter = counter % carouselSlidesQuantity;
  const perc = `${localCounter}00`;
  carousel.style.transform = `translate(-${perc}%, 0)`;
  counter++;
});

carouselArrowPrev.addEventListener("click", () => {
  const localCounter = counter % carouselSlidesQuantity;
  const perc = `-${localCounter}00`;
  carousel.style.transform = `translate(${perc}%, 0)`;
  counter--;
});

if (carouselThumbs) {
  carouselThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      let thumbsPerc = `0`;
      if (index > 0) {
        let thumbsPerc = `-${index}00`;
      }
      carousel.style.transform = `translate(-${index}00%, 0)`;
    });
  });
}
