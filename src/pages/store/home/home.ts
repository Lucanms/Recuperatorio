import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";
import { addToCart, getCartCount } from "../../../utils/cart";
import { checkAuhtUser, logout } from "../../../utils/auth";

const productGrid = document.getElementById("productGrid") as HTMLDivElement;
const categoryList = document.getElementById("categoryList") as HTMLUListElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const noResults = document.getElementById("noResults") as HTMLParagraphElement;
const cartCountEl = document.getElementById("cartCount") as HTMLSpanElement;
const logoutBtn = document.getElementById("logoutButton") as HTMLButtonElement;
const toast = document.getElementById("toast") as HTMLDivElement;

let currentCategory = "all";
let currentSearch = "";

function updateCartCount(): void {
  cartCountEl.textContent = String(getCartCount());
}

function showToast(message: string): void {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function filterProducts(): Product[] {
  return PRODUCTS.filter((p) => {
    if (p.eliminado) return false;
    const matchSearch =
      !currentSearch ||
      p.nombre.toLowerCase().includes(currentSearch.toLowerCase());
    const matchCategory =
      currentCategory === "all" ||
      p.categorias.some(
        (c) => c.nombre.toLowerCase() === currentCategory.toLowerCase()
      );
    return matchSearch && matchCategory;
  });
}

function renderProducts(): void {
  const filtered = filterProducts();
  productGrid.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  for (const product of filtered) {
    const card = document.createElement("article");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = `/images/${product.imagen}`;
    img.alt = product.nombre;
    img.className = "product-image";
    img.loading = "lazy";
    img.onerror = () => {
      img.style.display = "none";
      const placeholder = document.createElement("div");
      placeholder.className = "product-image-placeholder";
      placeholder.textContent = product.nombre.charAt(0);
      img.parentElement?.insertBefore(placeholder, img);
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.nombre;

    const desc = document.createElement("p");
    desc.className = "product-description";
    desc.textContent = product.descripcion;

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = `$${product.precio.toFixed(2)}`;

    const stock = document.createElement("span");
    stock.className = `product-stock ${product.stock === 0 ? "out-of-stock" : ""}`;
    stock.textContent =
      product.stock === 0 ? "Sin stock" : `Stock: ${product.stock}`;

    const available = product.disponible && product.stock > 0;

    const actions = document.createElement("div");
    actions.className = "product-actions";

    const addBtn = document.createElement("button");
    addBtn.className = "btn-add-cart";
    addBtn.textContent = available ? "Agregar al carrito" : "No disponible";
    addBtn.disabled = !available;
    if (available) {
      addBtn.addEventListener("click", () => {
        addToCart(product);
        updateCartCount();
        showToast(`"${product.nombre}" agregado al carrito`);
      });
    }

    actions.appendChild(addBtn);
    info.appendChild(name);
    info.appendChild(desc);
    info.appendChild(price);
    info.appendChild(stock);
    info.appendChild(actions);

    card.appendChild(img);
    card.appendChild(info);
    productGrid.appendChild(card);
  }
}

function renderCategories(): void {
  const categories = getCategories();

  for (const cat of categories) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.dataset.category = cat.nombre;
    btn.textContent = cat.nombre;
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = cat.nombre;
      renderProducts();
    });
    li.appendChild(btn);
    categoryList.appendChild(li);
  }
}

const todosBtn = document.querySelector(
  '[data-category="all"]'
) as HTMLButtonElement;
todosBtn.addEventListener("click", () => {
  document
    .querySelectorAll(".category-btn")
    .forEach((b) => b.classList.remove("active"));
  todosBtn.classList.add("active");
  currentCategory = "all";
  renderProducts();
});

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.trim();
  renderProducts();
});

logoutBtn.addEventListener("click", () => {
  logout();
});

function initPage(): void {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );
  renderCategories();
  renderProducts();
  updateCartCount();
}

initPage();
