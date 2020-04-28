// *********************
// cart stuff
// *********************
const cart =
  localStorage.getItem("cart") != null
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
const cartQuantity = document.querySelector(".cart-quantity");
const cartElement = document.querySelector(".c-header__menu-btn--cart");

const renderNewCartSize = () => {
  cartQuantity.innerText = cart.length;
};

renderNewCartSize();

const addToCart = (product) => {
  console.log("add to cart", product);
  cart.push(product);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderNewCartSize();
};
