// Elements
const toggleThemeBTN = document.getElementById("toggleThemeBTN");
const scrollUpBTN = document.getElementById("scrollUpBTN");
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const createBtn = document.getElementById("create");
const tbody = document.getElementById("tbody");
const search = document.getElementById("search");

let searchMode = "title";
let mode = "create";
let productID;

// Theme on load
if (localStorage.FavMode === "dark") {
  document.body.classList.add("dark");
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.FavMode = document.body.classList.contains("dark") ? "dark" : "light";
  toggleThemeBTN.textContent =
  document.body.classList.contains("dark") ? "☀️" : "🌙";
}
toggleThemeBTN.addEventListener("click", toggleTheme);

// Scroll Button
onscroll = () => {
  if (scrollY >= 400) scrollUpBTN.classList.add("show");
  else scrollUpBTN.classList.remove("show");
};
scrollUpBTN.onclick = () => {
  scroll({ top: 0, behavior: "smooth" });
};

// Local storage
let dataProducts = JSON.parse(localStorage.products || "[]");

// Display products on load
showProducts();

// Total price
function getTotalPrice() {
  if (price.value !== "" && +price.value > 0) {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// Clear input fields
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
  total.style.background = "#a00d02";
}

// Create product
function createNewProduct() {
  const newProduct = {
    title: title.value.trim().toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.trim().toLowerCase(),
  };

  if (
    newProduct.title &&
    newProduct.price &&
    newProduct.category &&
    newProduct.count <= 100
  ) {
    if (mode === "create") {
      const countVal = +newProduct.count || 1;
      for (let i = 0; i < countVal; i++) {
        dataProducts.push({ ...newProduct });
      }
    } else {
      dataProducts[productID] = newProduct;
      mode = "create";
      createBtn.innerHTML = "Create";
      count.style.display = "block";
    }

    clearInputs();
    localStorage.products = JSON.stringify(dataProducts);
    showProducts();
  }
}
createBtn.addEventListener("click", createNewProduct);

// Show products
function showProducts() {
  getTotalPrice();
  let html = "";

  dataProducts.forEach((prod, i) => {
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${prod.title}</td>
        <td>${prod.price}</td>
        <td>${prod.taxes}</td>
        <td>${prod.ads}</td>
        <td>${prod.discount}</td>
        <td>${prod.total}</td>
        <td>${prod.category}</td>
        <td><button onclick="updateProduct(${i})">Update</button></td>
        <td><button onclick="deleteProduct(${i})">Delete</button></td>
      </tr>`;
  });

  tbody.innerHTML = html;

  const deleteAllBtn = document.getElementById("deleteAll");
  deleteAllBtn.innerHTML = dataProducts.length
    ? `<button onclick="deleteAllProducts()">Delete All (${dataProducts.length})</button>`
    : "";
}

// Delete
function deleteProduct(id) {
  dataProducts.splice(id, 1);
  localStorage.products = JSON.stringify(dataProducts);
  showProducts();
}
function deleteAllProducts() {
  localStorage.removeItem("products");
  dataProducts = [];
  showProducts();
}

// Update
function updateProduct(ID) {
  const prod = dataProducts[ID];
  title.value = prod.title;
  price.value = prod.price;
  taxes.value = prod.taxes;
  ads.value = prod.ads;
  discount.value = prod.discount;
  category.value = prod.category;
  getTotalPrice();
  count.style.display = "none";
  createBtn.innerHTML = "Update";
  mode = "update";
  productID = ID;

  scroll({ top: 0, behavior: "smooth" });
}

// Search Mode
function getsearchMode(id) {
  searchMode = id === "searchTitle" ? "title" : "category";
  search.placeholder = `Search by ${searchMode}`;
  search.focus();
  search.value = "";
  showProducts();
}

// Search data
function searchData(value) {
  let table = "";
  const query = value.toLowerCase().trim();

  dataProducts.forEach((prod, i) => {
    if (prod[searchMode].includes(query)) {
      table += `
        <tr>
          <td>${i + 1}</td>
          <td>${prod.title}</td>
          <td>${prod.price}</td>
          <td>${prod.taxes}</td>
          <td>${prod.ads}</td>
          <td>${prod.discount}</td>
          <td>${prod.total}</td>
          <td>${prod.category}</td>
          <td><button onclick="updateProduct(${i})">Update</button></td>
          <td><button onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`;
    }
  });

  tbody.innerHTML = table;
}
