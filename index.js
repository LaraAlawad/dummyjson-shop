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
  if (newId < 1) return; // Prevent going below ID 1
  showProductDetails(newId);
}

// Category and products load
axios.get('https://dummyjson.com/products/category-list')
  .then(res => {
    const categoriesTable = document.getElementById('categories-table');
    res.data.forEach(category => {
      const row = document.createElement('tr');
      row.innerHTML = `<td><a href="products.html?category=${category}">${category}</a></td>`;
      categoriesTable.appendChild(row);
    });
  });

axios.get('https://dummyjson.com/products?limit=5')
  .then(res => {
    const productsTable = document.getElementById('home-products-table');
    res.data.products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.thumbnail}" alt="${product.title}"></td>
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td><a href="#" onclick="showProductDetails(${product.id})">Details</a></td>
      `;
      productsTable.appendChild(row);
    });
  });
