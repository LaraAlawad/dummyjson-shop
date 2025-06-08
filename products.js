// Modal functionality
const modal = document.getElementById("productModal");
const span = document.getElementsByClassName("close")[0];
let currentProductId = null;

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function showProductDetails(id) {
  currentProductId = id;
  axios.get(`https://dummyjson.com/products/${id}`)
    .then(res => {
      const product = res.data;
      const table = document.getElementById("modal-product-details");
      table.innerHTML = `
        <tr><th>Title</th><td>${product.title}</td></tr>
        <tr><th>Price</th><td>$${product.price}</td></tr>
        <tr><th>Description</th><td>${product.description}</td></tr>
        <tr><th>Image</th><td><img src="${product.thumbnail}" alt="${product.title}"/></td></tr>
        <tr><td colspan="2" style="text-align:center;">
          <button onclick="navigateProduct(-1)">&#8592; Previous</button>
          <button onclick="navigateProduct(1)">Next &#8594;</button>
        </td></tr>
      `;
      modal.style.display = "block";
    })
    .catch(error => {
      console.error("Error fetching product details:", error);
    });
}

function navigateProduct(direction) {
  let newId = currentProductId + direction;
  if (newId < 1) return; // prevent negative ID
  showProductDetails(newId);
}

// Load products
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const url = category 
  ? `https://dummyjson.com/products/category/${category}` 
  : 'https://dummyjson.com/products';

axios.get(url)
  .then(res => {
    const table = document.getElementById('products-table');
    const products = res.data.products || res.data;
    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.thumbnail}" alt="${product.title}"></td>
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td><a href="#" onclick="showProductDetails(${product.id})">Details</a></td>
      `;
      table.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });
