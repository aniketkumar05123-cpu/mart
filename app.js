// ===== PRODUCT DATA =====
const products = [
  { id: 1, name: "Wireless Headphones", category: "electronics", price: 79.99, emoji: "🎧", bg: "#dce8ff" },
  { id: 2, name: "Smart Watch", category: "electronics", price: 149.99, emoji: "⌚", bg: "#dce8ff" },
  { id: 3, name: "Bluetooth Speaker", category: "electronics", price: 49.99, emoji: "🔊", bg: "#dce8ff" },
  { id: 4, name: "Laptop Stand", category: "electronics", price: 34.99, emoji: "💻", bg: "#dce8ff" },
  { id: 5, name: "Cozy Throw Blanket", category: "home", price: 29.99, emoji: "🛋️", bg: "#f4e4c1" },
  { id: 6, name: "Ceramic Mug Set", category: "home", price: 24.99, emoji: "☕", bg: "#f4e4c1" },
  { id: 7, name: "Scented Candle", category: "home", price: 18.99, emoji: "🕯️", bg: "#f4e4c1" },
  { id: 8, name: "Wall Art Print", category: "home", price: 39.99, emoji: "🖼️", bg: "#f4e4c1" },
  { id: 9, name: "Denim Jacket", category: "fashion", price: 89.99, emoji: "🧥", bg: "#e8d4f4" },
  { id: 10, name: "Running Sneakers", category: "fashion", price: 119.99, emoji: "👟", bg: "#e8d4f4" },
  { id: 11, name: "Sunglasses", category: "fashion", price: 44.99, emoji: "🕶️", bg: "#e8d4f4" },
  { id: 12, name: "Leather Wallet", category: "fashion", price: 35.99, emoji: "👜", bg: "#e8d4f4" },
  { id: 13, name: "Face Moisturizer", category: "beauty", price: 22.99, emoji: "🧴", bg: "#ffd4ec" },
  { id: 14, name: "Lip Balm Set", category: "beauty", price: 12.99, emoji: "💄", bg: "#ffd4ec" },
  { id: 15, name: "Hair Serum", category: "beauty", price: 27.99, emoji: "✨", bg: "#ffd4ec" },
  { id: 16, name: "Yoga Mat", category: "sports", price: 39.99, emoji: "🧘", bg: "#d4f4d4" },
  { id: 17, name: "Water Bottle", category: "sports", price: 19.99, emoji: "💧", bg: "#d4f4d4" },
  { id: 18, name: "Jump Rope", category: "sports", price: 14.99, emoji: "🏋️", bg: "#d4f4d4" },
  { id: 19, name: "Organic Honey", category: "food", price: 15.99, emoji: "🍯", bg: "#fff0cc" },
  { id: 20, name: "Trail Mix Pack", category: "food", price: 11.99, emoji: "🥜", bg: "#fff0cc" },
];

// ===== CART =====
function getCart() {
  return JSON.parse(localStorage.getItem('mart-cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('mart-cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`${product.emoji} ${product.name} added to cart!`);
}
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = total);
}

// ===== PRODUCT CARD BUILDER =====
function buildProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-img" style="background:${product.bg}">${product.emoji}</div>
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
  return card;
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
      background:#1a1a1a; color:#fff; padding:12px 24px; border-radius:50px;
      font-size:0.9rem; font-weight:500; z-index:9999; box-shadow:0 8px 24px rgba(0,0,0,0.2);
      transition: opacity 0.3s; opacity: 0;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => toast.style.opacity = '0', 2500);
}

// ===== HAMBURGER =====
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// ===== INIT =====
updateCartCount();

// Featured products on homepage
const featuredGrid = document.getElementById('featured-grid');
if (featuredGrid) {
  const featured = products.slice(0, 8);
  featured.forEach(p => featuredGrid.appendChild(buildProductCard(p)));
}