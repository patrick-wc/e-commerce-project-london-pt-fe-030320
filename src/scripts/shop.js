// *********************
// products stuff
// *********************
const products_ul = document.querySelector(".products");

const renderProduct = (product) => {
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
};

const renderProducts = (productsToRender) => {
  products_ul.innerHTML = "";

  productsToRender.forEach((product) => {
    renderProduct(product);
  });
};

renderProducts(products);

// *********************
// range / category filtering stuff
// *********************

const uniqueColorsArrays = products.map((p) => p.colors);

// I've returned 20 arrays of colors
// I want to extract each individual color combination from those arrays, and then build filters from those options
// so...

// maybe I should be using one of the more fancy functions from ex37 here? I dunno, please let me know if so:
let uniqueColorsValuesArray = [];
uniqueColorsArrays.forEach((color, i) => {
  // for of loop because array
  for (let index = 0; index < color.length; index++) {
    const element = color[index];
    uniqueColorsValuesArray.push(element);
  }
});

// now I have the array, I need remove all duplicates:
// console.log(uniqueColorsValuesArray);

// you can do this via Set, filter or reduce apparently https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
// I'm going to do it via all 3 methods to help it stick in my brain
// Set:

// create a new ES6 object data type of Set:
// const uniqueSet = new Set(uniqueColorsValuesArray);

// // convert the object back into an array:
// const uniqueColorsValuesProper = [...uniqueSet];

// // could also use Array.from and keep the same variable name
uniqueColorsValuesArray = Array.from(new Set(uniqueColorsValuesArray));
// console.log(uniqueColorsValuesArray);

// console.log(uniqueColorsValuesProper);

// filter
// uniqueColorsValuesArrayFilter = uniqueColorsValuesArray.filter(
//   (item, index) => uniqueColorsValuesArray.indexOf(item) === index
// );

// // so the filter method returns a new array
// // item = the color
// // index = the loop # of the filter method
// // uniqueColorsValuesArray.indexOf(item) = the first index found for that item
// // conditional = uniqueColorsValuesArray.indexOf(item) === true
// // if the first index found matches the item being processed, return true
// // otherwise, its not unique so exclude it from the array
// // so the new array is populated with only unique items
// console.log(uniqueColorsValuesArrayFilter);

// reduce:
// this is the tough one from ex37 that I struggled with.
// apparently even Google engineers argued whether it should ever be used
// I'm gonna leave this until I finish the project
// uniqueColorsValuesArrayReduce = uniqueColorsValuesArray.reduce(
//   (unique, (item) => (unique.includes(item) ? unique : [...unique, item]), [])
// );
// console.log(uniqueColorsValuesArrayReduce);

// categories
let uniqueCategories = products.map((p) => p.type);

uniqueCategories = Array.from(new Set(uniqueCategories));
const colorsCheckboxContainer = document.querySelector(
  "ul[data-filter-tax=colors]"
);
const typesCheckboxContainer = document.querySelector(
  "ul[data-filter-tax=types]"
);
// tried to do
const userCheckedTaxes = {};
// but couldn't work out how to do it without a data-type on the input, and some other steps

const userCheckedColors = [];
const userCheckedTypes = [];

const applyTaxEventListener = (input, tax) => {
  input.addEventListener("change", (event) => {
    console.log(`input changed ${event.target.value}`);
    const value = event.target.value;

    if (userCheckedTaxes.hasOwnProperty(tax)) {
      // console.log("tax object property already exists");

      if (userCheckedTaxes[tax].includes(value)) {
        // console.log("we already have this value, so remove it");

        // I think there might be a smarter ES6 function here, maybe .filter?
        // find index:
        let index = userCheckedTaxes[tax].findIndex(
          (taxTerm) => taxTerm === value
        );

        userCheckedTaxes[tax].splice(index, 1);
      } else {
        // console.log("we do not have this value yet, add it");
        userCheckedTaxes[tax].push(value);
      }
    } else {
      // console.log("tax object property does not exist");

      let checkedTax = [];
      checkedTax.push(value);
      userCheckedTaxes[tax] = checkedTax;
    }

    // now we have an object with the types arrays, we want to render products with those selected taxTerms:
    // so, first get array of products by those terms...

    // then render Products:
    // renderProducts();
  });
};

const renderTaxes = (taxes, tax) => {
  const container = document.querySelector(`ul[data-filter-tax=${tax}]`);
  // clear colors first
  container.innerHTML = "";

  // sort colors array by alphabetical
  taxes.sort();

  taxes.forEach((taxTerm) => {
    const li = document.createElement("li");

    const label = document.createElement("label");
    label.innerText = taxTerm;
    label.setAttribute("for", taxTerm);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = taxTerm;
    input.name = taxTerm;
    input.id = taxTerm;

    li.append(input);
    li.append(label);
    container.append(li);

    // add event listeners to checkbox:
    applyTaxEventListener(input, tax);
  });
};

renderTaxes(uniqueColorsValuesArray, "colors");
renderTaxes(uniqueCategories, "types");

const range = document.querySelector(".range__input");
const rangeScaleLow = document.querySelector(".range__scale--low");
const rangeScaleHigh = document.querySelector(".range__scale--high");

const lowestProductPrice = [...products].sort((a, b) => a.price - b.price)[0]
  .price;
const highestProductPrice = [...products].sort((a, b) => b.price - a.price)[0]
  .price;

rangeScaleLow.innerText = `$${lowestProductPrice}`;
rangeScaleHigh.innerText = `$${highestProductPrice}`;

range.setAttribute("min", lowestProductPrice);
range.setAttribute("max", highestProductPrice);

range.addEventListener("change", () => {
  console.log(range.value);
  const from = parseInt(0);
  const to = parseInt(range.value);

  const filteredProducts = products.filter((product) => {
    // return true or false;
    if (product.price >= from && product.price <= to) {
      return true;
    } else {
      return false;
    }
  });

  renderProducts(filteredProducts);
});
