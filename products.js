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
        <td><a href="product-details.html?id=${product.id}">Details</a></td>
      `;
      table.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });

