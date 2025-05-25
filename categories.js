
axios.get('https://dummyjson.com/products/category-list')
  .then(res => {
    const table = document.getElementById('categories-table');
    res.data.forEach(category => {
      const row = document.createElement('tr');
      row.innerHTML = `<td><a href="products.html?category=${category}">${category}</a></td>`;
      table.appendChild(row);
    });
  });
