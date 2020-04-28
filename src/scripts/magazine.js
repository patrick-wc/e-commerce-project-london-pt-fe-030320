const addToCartProduct = document.querySelector(
  ".c-product-page__info__add-to-basket"
);

addToCartProduct.addEventListener("click", (event) => {
  event.preventDefault();
  let productId = 1;

  addToCart(products[productId]);
});
