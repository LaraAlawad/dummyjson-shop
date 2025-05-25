const params = new URLSearchParams(window.location.search);
const id = params.get('id');

axios.get(`https://dummyjson.com/products/${id}`)
  .then(res => {
    const product = res.data;
    const table = document.getElementById('product-details-table');
    table.innerHTML = `
      <tr><th>Title</th><td>${product.title}</td></tr>
      <tr><th>Price</th><td>$${product.price}</td></tr>
      <tr><th>Description</th><td>${product.description}</td></tr>
      <tr><th>Image</th><td><img src="${product.thumbnail}" alt="${product.title}"/></td></tr>
    `;
  })
  .catch(error => {
    console.error("Error fetching product details:", error);
  });
