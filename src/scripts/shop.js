// main deliverables done
// things I'd like to fix:
/**
 * Problem: When clicking pagination, the products array is loaded and all of the pagination
 * for the products.json products are displayed.
 *
 * Solution: Somehow use selectedFilteredProducts array
 *
 */
/**
 * Problem: Range is independent of color and type checkbox lists (taxes)
 *
 * Solution: Integrate range into the dynamic funtions which update products via color and type
 *
 */
/**
 * Problem: Price sorting is also independent of color and type checkbox lists (taxes)
 *
 * Solution: Integrate range into the dynamic funtions which update products via color and type
 *
 */
// I'd also like to make color and type appear/reappear on click
// I'd like to get the range slider styled like the design and also update the min to high from the selectedFilteredProducts array

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
  const img = document.createElement("img");
  img.setAttribute("src", "images/icons/cart.svg");
  img.setAttribute("width", "24");
  img.setAttribute("height", "24");
  img.setAttribute("alt", "add to cart");
  add.append(img);

  add.addEventListener("click", () => {
    addToCart(product);
  });
  li.append(add);

  products_ul.append(li);
};

const renderProducts = (productsToRender) => {
  products_ul.innerHTML = "";

  productsToRender
    .filter((product, index) => {
      const startingIndex = (pageNumber - 1) * quantityPerPage;
      const endingIndex = startingIndex + quantityPerPage;
      if (index >= startingIndex && index < endingIndex) {
        return true;
      } else {
        return false;
      }
    })
    .forEach((product) => {
      renderProduct(product);
    });

  // update pagination links
  paginationLinksToRender =
    parseInt(productsToRender.length / quantityPerPage) + 1;

  renderPaginationLinks(paginationLinksToRender);
  setPaginationLinkEventHandlers(productsToRender);
};

// *********************
// pagination
// *********************
const paginationLinksContainer = document.querySelector(".pagination");
const quantityPerPage = 6;
let paginationLinksToRender = parseInt(products.length / quantityPerPage) + 1;
let pageNumber = 1;

const renderPaginationLinks = (links) => {
  paginationLinksContainer.innerHTML = "";
  let counter = links + 1;

  for (let index = 1; index < counter; index++) {
    renderPaginationLink(index);
  }

  renderPaginationNextLink();
};

const setPaginationLinkEventHandlers = (products) => {
  // paginationLinks event listener stuff
  // add event listender for next button, which adds 1 to pageNumber and calls render products again
  const nextButton = document.querySelector(".pagination .next");
  nextButton.addEventListener("click", (event) => {
    event.preventDefault();

    let currentLink = document.querySelector(
      `.pagination li:nth-of-type(${pageNumber}) a`
    );
    console.log(currentLink);

    if (pageNumber > products.length / quantityPerPage) {
      return;
    } else {
      console.log(pageNumber);

      currentLink.classList.remove("active");
      let nextLink = document.querySelector(
        `.pagination li:nth-of-type(${pageNumber + 1}) a`
      );
      nextLink.classList.add("active");
      pageNumber++;
      renderProducts(products);
    }
  });

  const paginationLinks = document.querySelectorAll(".pagination a:not(.next)");

  paginationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      // remove all active links
      paginationLinks.forEach((link) => {
        link.classList.remove("active");
      });
      link.classList.add("active");
      event.preventDefault();
      pageNumber = event.target.innerText;

      renderProducts(products);
    });
  });
};

const renderPaginationNextLink = () => {
  // render next link
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.innerHTML = ">";
  a.classList.add("next");
  li.append(a);
  paginationLinksContainer.append(li);
};

const renderPaginationLink = (link) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.innerText = link;
  if (link === 1) {
    a.classList.add("active");
  }
  li.append(a);
  paginationLinksContainer.append(li);
};

// renderPaginationLinks(paginationLinksToRender);

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

// const userCheckedColors = [];
// const userCheckedTypes = [];

const applyTaxEventListener = (input, tax) => {
  input.addEventListener("change", (event) => {
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

        if (userCheckedTaxes[tax].length === 0) {
          delete userCheckedTaxes[tax];
        }
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

    // here (maybe passed to another function) I need to check if userCheckedTaxes are empty
    // if so, render all products again...

    applyTaxes(userCheckedTaxes);
  });
};

const productDoesMatchSelections = (product, selections) => {
  // Object.keys retuns array of object properties
  const properties = Object.keys(selections);
  const matchingProperties = properties.filter((property) => {
    if (Array.isArray(product[property])) {
      // if property is an array (like colors) return true if array includes product
      return product[property].some((propertyValue) =>
        selections[property].includes(propertyValue)
      );
    } else if (typeof product[property] === "string") {
      // if property is string, like types, return true if string is in product types array
      return selections[property].includes(product[property]);
    }
  });

  // if number of matching properties = the number of properties in the selected array (eg. 2 types colors)
  // i.e. AND fitering
  return matchingProperties.length === properties.length;

  // this would be OR
  // return matchingProperties.length > 0;
};

const applyTaxes = (userCheckedTaxes) => {
  let filteredProducts = {};

  filteredProducts = products.filter((product) => {
    // iterate over object with keys, check if string (array) check if
    // write separate function, which returns
    return productDoesMatchSelections(product, userCheckedTaxes);
  });

  console.log(filteredProducts);

  renderProducts(filteredProducts);

  // // create empty array for filtered products
  // let filteredProducts = {};

  // // loop over userCheckedTaxes with a for in loop for an object...
  // for (const key in userCheckedTaxes) {
  //   if (userCheckedTaxes.hasOwnProperty(key)) {
  //     filteredProducts[key] = products.filter((product) => {
  //       // console.log(key);
  //       // console.log(userCheckedTaxes[key]);
  //       // console.log(product[key]);
  //       // console.log(typeof product[key]);

  //       if (typeof product[key] === "string") {
  //         // if string, use .includes for that string
  //         if (userCheckedTaxes[key].includes(product[key])) {
  //           // console.log("true, type match");
  //           return true;
  //         } else {
  //           // console.log("false, no match");

  //           return false;
  //         }
  //       } else if (typeof product[key] === "object") {
  //         // if object, loop over object and ...
  //         // check if term is within both arrays...
  //         // console.log(
  //         //   product[key].some((r) => userCheckedTaxes[key].indexOf(r) >= 0)
  //         // );

  //         return product[key].some(
  //           (r) => userCheckedTaxes[key].indexOf(r) >= 0
  //         );
  //       }
  //     });
  //   }
  // }

  // // now build one array from these results, whilst removing duplicate products
  // // console.log(filteredProducts);

  // // get unique products
  // uniqueCheckedProducts = [];

  // for (const key in filteredProducts) {
  //   if (filteredProducts.hasOwnProperty(key)) {
  //     // loop over that array, and add to uniqueCheckedProducts
  //     for (let index = 0; index < filteredProducts[key].length; index++) {
  //       const element = filteredProducts[key][index];
  //       // console.log(element);
  //       uniqueCheckedProducts.push(element);
  //     }
  //   }
  // }

  // // console.log(uniqueFilteredProducts);

  // // uniqueFilteredProducts = Array.from(new Set(uniqueFilteredProducts));

  // // console.log(uniqueFilteredProducts);

  // // this gives an array of all keys in that object
  // const filterTypes = Object.keys(filteredProducts);
  // // console.log(filterTypes);

  // // make a new array, first value = first key, then rest of keys...
  // const [firstKey, ...restKeys] = filterTypes;
  // // console.log(firstKey);

  // // make array of rest of products, to compare with
  // let productsInRestKeys = [];

  // for (const key of restKeys) {
  //   if (filteredProducts.hasOwnProperty(key)) {
  //     for (let index = 0; index < filteredProducts[key].length; index++) {
  //       const element = filteredProducts[key][index];
  //       console.log(element);

  //       // console.log(element);
  //       productsInRestKeys.push(filteredProducts[key][index]);
  //     }
  //   }
  // }

  // const matchingProducts = filteredProducts[firstKey].filter((product) => {
  //   return productsInRestKeys.includes(product);
  // });

  // if more than 1 tax selected, render matched products
  // if (filterTypes.length === 1) {
  //   renderProducts(uniqueCheckedProducts);
  // } else {
  //   renderProducts(matchingProducts);
  // }
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
renderTaxes(uniqueCategories, "type");

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

const applyFilters = (from, to) => {
  const filteredProducts = products.filter((product) => {
    // return true or false;
    if (product.price >= from && product.price <= to) {
      return true;
    } else {
      return false;
    }
  });

  renderProducts(filteredProducts);
};

range.addEventListener("change", () => {
  console.log(range.value);
  const from = parseInt(0);
  const to = parseInt(range.value);

  applyFilters(from, to);
});

const sortProductsSelect = document.querySelector("#sort_products");
sortProductsSelect.addEventListener("change", (event) => {
  const value = event.target.value;
  if (value === "default") {
    renderProducts(products);
  } else if (value === "price_highest") {
    const productsSortedByHighestPrice = [...products].sort(
      (a, b) => b.price - a.price
    );
    renderProducts(productsSortedByHighestPrice);
  } else if (value === "price_lowest") {
    const productsSortedByLowestPrice = [...products].sort(
      (a, b) => a.price - b.price
    );
    renderProducts(productsSortedByLowestPrice);
  }
});
