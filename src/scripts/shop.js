// *********************
// products stuff
// *********************
const products_ul = document.querySelector(".products");

// clear products
// products_ul.innerHTML = "";

products.forEach((product) => {
  // console.log(product);

  // <li class="product">
  //     <img
  //     class="product__image"
  //     src="images/products/sofa-1.jpg"
  //     alt=""
  //     />
  //     <a class="product__link" href=""
  //     ><h2 class="product__title">Yenings</h2></a
  //     >
  //     <div class="product__details">
  //     <p class="product__cat">Sofa</p>
  //     <p class="product__price">£2,600</p>
  //     </div>
  //     <button class="product__add">
  //     <img
  //         src="images/icons/cart.svg"
  //         width="24"
  //         height="24"
  //         alt="add to cart"
  //     />
  //     </button>
  // </li>
  const li = document.createElement("li");
  li.classList.add("product");

  const image = document.createElement("img");
  image.classList.add("product__image");
  image.setAttribute("src", "images/products/sofa-1.jpg");
  li.append(image);

  const a = document.createElement("a");
  a.classList.add("product__link");

  const h2 = document.createElement("h2");
  h2.innerText = product.name;
  h2.classList.add("product__title");

  a.append(h2);
  li.append(a);

  const details = document.createElement("div");
  details.classList.add("product__details");

  const cat = document.createElement("cat");
  cat.classList.add("product__cat");
  cat.innerText = product.type;
  details.append(cat);

  const price = document.createElement("price");
  price.classList.add("product__price");
  price.innerText = `$${product.price}`;
  price.setAttribute("data-price", product.price);
  details.append(price);

  li.append(details);

  const add = document.createElement("button");
  add.classList.add("product__add");
  add.setAttribute("src", "images/icons/cart.svg");
  add.setAttribute("width", "24");
  add.setAttribute("height", "24");
  add.setAttribute("alt", "add to cart");
  li.append(add);

  products_ul.append(li);
});

const range = document.querySelector(".range__input");

let productPrices = [];
products.forEach((product) => {
  console.log(product.price);

  productPrices.push(product.price);
});

console.log(productPrices);

const rangeFrom = Math.min(...productPrices);
console.log(rangeFrom);

const rangeTo = Math.max(...products.price);
console.log(rangeTo);

range.addEventListener("change", () => {
  console.log(range.value);
  const from = parseInt(0);
  const to = parseInt(range.value);

  filteredProducts = products.filter((product) => {
    // return true or false;
    if (product.price >= from && product.price <= to) {
      return true;
    } else {
      return false;
    }
  });

  console.log(filteredProducts);
});
