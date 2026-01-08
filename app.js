document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input");

  if (searchIcon && searchInput) {
    searchIcon.addEventListener("click", () => {
      searchInput.classList.toggle("active");
      if (searchInput.classList.contains("active")) searchInput.focus();
    });
  }
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price: Number(price) });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produs adăugat în coș!");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const body = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  if (!body || !total) return;

  body.innerHTML = "";
  let sum = 0;

  cart.forEach((item, idx) => {
    sum += item.price;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price} RON</td>
      <td><button onclick="removeFromCart(${idx})">X</button></td>
    `;
    body.appendChild(row);
  });

  total.textContent = "Total: " + sum + " RON";
}

document.addEventListener("DOMContentLoaded", renderCart);

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(icon) {
  const product = icon.closest(".product-card");
  if (!product) return;

  const productData = {
    id: product.dataset.id,
    name: product.dataset.name,
    price: product.dataset.price,
    image: product.querySelector("img").getAttribute("src") // păstrează relativ
  };

  const index = favorites.findIndex(p => p.id === productData.id);

  if (index === -1) {
    favorites.push(productData);
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
  } else {
    favorites.splice(index, 1);
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function markFavoritesOnLoad() {
  document.querySelectorAll(".product-card").forEach(card => {
    const id = card.dataset.id;
    const icon = card.querySelector(".favorite-icon");
    if (icon && favorites.find(p => p.id === id)) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    }
  });
}

function loadFavorites() {
  const container = document.getElementById("favorites-list");
  if (!container) return;

  favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  container.innerHTML = "";

  if (favorites.length === 0) {
    container.innerHTML = "<p>Nu ai produse favorite încă.</p>";
    return;
  }

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products");

  favorites.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="price">${product.price} RON</div>
    `;
    productsContainer.appendChild(card);
  });

  container.appendChild(productsContainer);
}

document.addEventListener("DOMContentLoaded", () => {
  markFavoritesOnLoad();
  loadFavorites();
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".image-slider .slide");
  if (!slides.length) return;

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  window.changeSlide = function(step) {
    currentSlide += step;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    showSlide(currentSlide);
  };

  setInterval(() => window.changeSlide(1), 4000);
  showSlide(currentSlide);

});
