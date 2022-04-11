"use strict";

let fitlerPopup = document.querySelector(".filterPopup");
let fitlerLabel = document.querySelector(".filterLabel");
let filterIcon = document.querySelector(".filterIcon");

fitlerLabel.addEventListener("click", function () {
  fitlerPopup.classList.toggle("hidden");
  fitlerLabel.classList.toggle("filterLabelPink");
  filterIcon.classList.toggle("filterIconPink");

  if (filterIcon.getAttribute("src") === "images/filter.svg") {
    filterIcon.setAttribute("src", "images/filterHover.svg");
  } else {
    filterIcon.setAttribute("src", "images/filter.svg");
  }
});

let filterHeaders = document.querySelectorAll(".filterCategoryHeader");
filterHeaders.forEach(function (header) {
  header.addEventListener("click", function (event) {
    event.target.nextElementSibling.classList.toggle("hidden");
  });
});

let filterSizes = document.querySelector(".filterSizes");
let filterSizeWrap = document.querySelector(".filterSizeWrap");
filterSizeWrap.addEventListener("click", function () {
  filterSizes.classList.toggle("hidden");
});

const addedProducts = {};
const addedProductsCountElem = document.querySelector(".cartIconWrap > span");
document.querySelector(".featuredItems").addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") {
    return;
  }
  const productElem = event.target.closest(".featuredItem");
  const productName = productElem.querySelector(".featuredName").textContent;
  const addedProduct = addedProducts[productName];
  if (addedProduct) {
    addedProduct.count++;
  } else {
    addedProducts[productName] = {
      name: productName,
      price: +productElem
        .querySelector(".featuredPrice")
        .textContent.replace("$", ""),
      count: 1,
    };
  }
  addedProductsCountElem.textContent = Object.keys(addedProducts).reduce(
    (sum, productName) => sum + addedProducts[productName].count,
    0
  );
  cartPanelElem.innerHTML = getHTMLString(addedProducts);
});
const cartPanelElem = document.querySelector(".cartPanel");
const cartIconElem = document.querySelector(".cartIcon");
cartIconElem.addEventListener("click", (event) => {
  cartPanelElem.classList.toggle("hidden");
});

function getHTMLString(products) {
  const headers = `
    <tr>
      <th>Название<br>товара</th>
      <th>Количество</th>
      <th>Цена за шт.</th>
      <th>Итого</th>
    </tr>
    `;
  const rows = Object.keys(products)
    .map((productName) => {
      const { price, count } = products[productName];
      return `
        <tr>
          <td>${productName}</td>
          <td>${count} шт.</td>
          <td>$${price}</td>
          <td>$${price * count}</td>
        </tr>
      `;
    })
    .join("");
  const sum = Object.keys(products).reduce((sum, productName) => {
    const { price, count } = products[productName];
    return sum + price * count;
  }, 0);
  return `
    <table>
      ${headers}
      ${rows}
    </table>
    <p class="total">Товаров в корзине на сумму: $${sum}</p>
    `;
}
