// ===== PRODUCTS PAGE =====
let filtered = [...products];

function renderProducts(list) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#999;padding:3rem">No products found.</p>`;
    return;
  }
  list.forEach(p => grid.appendChild(buildProductCard(p)));
}

function applyFilters() {
  const cat = document.getElementById('cat-filter').value;
  const maxPrice = parseFloat(document.getElementById('price-filter').value);
  const sort = document.getElementById('sort-filter').value;
  const search = document.getElementById('search-input').value.toLowerCase();

  filtered = products.filter(p => {
    const matchCat = cat === 'all' || p.category === cat;
    const matchPrice = p.price <= maxPrice;
    const matchSearch = p.name.toLowerCase().includes(search) || p.category.includes(search);
    return matchCat && matchPrice && matchSearch;
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  renderProducts(filtered);
}

// Price slider display
document.getElementById('price-filter').addEventListener('input', function () {
  document.getElementById('price-val').textContent = this.value;
});

document.getElementById('apply-filters').addEventListener('click', applyFilters);
document.getElementById('search-input').addEventListener('input', applyFilters);

// Pre-select category from URL param
const params = new URLSearchParams(window.location.search);
const catParam = params.get('cat');
if (catParam) {
  document.getElementById('cat-filter').value = catParam;
}

// Initial render
applyFilters();


