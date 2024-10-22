let products = [];
let cart = [];
let transactions = [];

// Function to show the selected section
function showSection(sectionId) {
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

// Function to add product to the list (mock example)
function addProduct() {
  const productName = prompt("Nama Barang:");
  const productPrice = prompt("Harga:");
  products.push({ name: productName, price: parseFloat(productPrice) });
  renderProductList();
}

// Render product list
function renderProductList() {
  const productList = document.querySelector('#product-list tbody');
  productList.innerHTML = '';
  products.forEach((product, index) => {
    productList.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><button onclick="removeProduct(${index})">Hapus</button></td>
      </tr>`;
  });
}

// Function to remove product
function removeProduct(index) {
  products.splice(index, 1);
  renderProductList();
}

// Add item to cart
function addToCart() {
  const itemName = document.getElementById('item-name').value;
  const itemQuantity = document.getElementById('item-quantity').value;
  cart.push({ name: itemName, quantity: parseInt(itemQuantity) });
  renderCart();
}

// Render cart
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    cartItems.innerHTML += `<li>${item.name} - ${item.quantity} <button onclick="removeFromCart(${index})">Hapus</button></li>`;
  });
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Print nota (mock)
function printNota() {
  const notaNumber = Math.floor(Math.random() * 10000);
  alert("Nota No: " + notaNumber + "\nTerima kasih telah berbelanja!");
  transactions.push({ cart, notaNumber });
  cart = [];
  renderCart();
  renderTransactionHistory();
}

// Render transaction history
function renderTransactionHistory() {
  const historyList = document.getElementById('transaction-history');
  historyList.innerHTML = '';
  transactions.forEach(transaction => {
    historyList.innerHTML += `<li>Nota ${transaction.notaNumber} - ${JSON.stringify(transaction.cart)}</li>`;
  });
}

// Search transaction history
document.getElementById('search-transaction').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredTransactions = transactions.filter(transaction =>
    JSON.stringify(transaction).toLowerCase().includes(searchTerm)
  );
  const historyList = document.getElementById('transaction-history');
  historyList.innerHTML = '';
  filteredTransactions.forEach(transaction => {
    historyList.innerHTML += `<li>Nota ${transaction.notaNumber} - ${JSON.stringify(transaction.cart)}</li>`;
  });
});