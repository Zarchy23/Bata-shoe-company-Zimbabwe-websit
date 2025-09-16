document.addEventListener('DOMContentLoaded', () => {
  console.log('Bata Zimbabwe Website Loaded');
  loadCart();
  if (document.getElementById('map')) initMap();
  if (document.getElementById('contactForm')) initContactForm();
});

function filterProducts() {
  const category = document.getElementById('category').value;
  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    product.style.display = (category === 'all' || product.dataset.category === category) ? 'block' : 'none';
  });
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(name + " added to cart!");
  loadCart();
}

function loadCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  if (!cartItemsDiv) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsDiv.innerHTML = cart.length === 0 ? "<p>Your cart is empty.</p>" :
    "<ul>" + cart.map(item => `<li>${item.name} - $${item.price}</li>`).join('') + "</ul>";
}

function checkout() {
  alert("Checkout simulation complete. Thank you for shopping with Bata Zimbabwe!");
  localStorage.removeItem('cart');
  loadCart();
}

function initMap() {
  const map = L.map('map').setView([-17.8292, 31.0522], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([-17.8292, 31.0522]).addTo(map).bindPopup('Bata Harare').openPopup();
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for contacting Bata Zimbabwe! We will respond shortly.');
    form.reset();
  });
}