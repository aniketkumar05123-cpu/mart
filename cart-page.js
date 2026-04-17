const cartItemsEl = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const couponInput = document.getElementById('coupon-input');
const couponMsg = document.getElementById('coupon-msg');
const applyCouponBtn = document.getElementById('apply-coupon');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal');
const checkoutModal = document.getElementById('checkout-modal');

let discountFactor = 1;
let activeCoupon = null;

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

function getCartItems() {
  return JSON.parse(localStorage.getItem('mart-cart') || '[]');
}

function renderCart() {
  const cart = getCartItems();
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="products.html" class="btn-outline">Continue shopping</a>
      </div>
    `;
    subtotalEl.textContent = formatCurrency(0);
    totalEl.textContent = formatCurrency(0);
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-thumb" style="background:${item.bg}">${item.emoji}</div>
      <div class="cart-details">
        <div class="cart-name">${item.name}</div>
        <div class="cart-category">${item.category}</div>
        <div class="cart-price">${formatCurrency(item.price)} x ${item.qty}</div>
      </div>
      <div class="cart-actions">
        <button class="qty-btn" onclick="updateCartItem(${item.id}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="updateCartItem(${item.id}, 1)">+</button>
        <button class="remove-btn" onclick="removeCartItem(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal * discountFactor;

  subtotalEl.textContent = formatCurrency(subtotal);
  totalEl.textContent = formatCurrency(total);
}

function saveCartItems(cart) {
  localStorage.setItem('mart-cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartItem(id, delta) {
  const cart = getCartItems();
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex === -1) return;

  cart[itemIndex].qty += delta;
  if (cart[itemIndex].qty <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCartItems(cart);
  renderCart();
}

function removeCartItem(id) {
  const cart = getCartItems().filter(item => item.id !== id);
  saveCartItems(cart);
  renderCart();
  showToast('Item removed from cart.');
}

function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) {
    couponMsg.textContent = 'Enter a coupon code to apply.';
    couponMsg.classList.remove('success');
    return;
  }

  if (code === 'MART50') {
    discountFactor = 0.5;
    activeCoupon = code;
    couponMsg.textContent = 'Coupon applied: 50% off!';
    couponMsg.classList.add('success');
  } else {
    discountFactor = 1;
    activeCoupon = null;
    couponMsg.textContent = 'Invalid coupon code.';
    couponMsg.classList.remove('success');
  }

  renderCart();
}

function checkout() {
  const cart = getCartItems();
  if (cart.length === 0) {
    showToast('Your cart is empty.');
    return;
  }

  saveCartItems([]);
  renderCart();
  couponInput.value = '';
  couponMsg.textContent = '';
  discountFactor = 1;
  activeCoupon = null;
  checkoutModal.classList.add('active');
}

function closeModal() {
  checkoutModal.classList.remove('active');
}

window.updateCartItem = updateCartItem;
window.removeCartItem = removeCartItem;

applyCouponBtn.addEventListener('click', applyCoupon);
checkoutBtn.addEventListener('click', checkout);
closeModalBtn.addEventListener('click', closeModal);

renderCart();