
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
        <td><a href="product-details.html?id=${product.id}">Details</a></td>
      `;
      productsTable.appendChild(row);
    });
  });
