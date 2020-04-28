const detailsEl = document.querySelectorAll(".js-button");
const detailsElText = document.querySelector(".js-button__text");

detailsEl.forEach((detail) => {
  let detailsElText = detail.nextElementSibling;
  detail.addEventListener("click", (event) => {
    event.preventDefault();
    detailsElText.classList.toggle("js-button__text--show");
  });
});
