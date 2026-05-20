import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from "../../../utils/cart";

const cartItemsEl = document.getElementById("cartItems") as HTMLDivElement;
const emptyCartEl = document.getElementById("emptyCart") as HTMLParagraphElement;
const cartSummaryEl = document.getElementById(
  "cartSummary"
) as HTMLDivElement;
const cartTotalEl = document.getElementById("cartTotal") as HTMLSpanElement;

function renderCart(): void {
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "";
    emptyCartEl.style.display = "block";
    cartSummaryEl.style.display = "none";
    return;
  }

  emptyCartEl.style.display = "none";
  cartSummaryEl.style.display = "flex";
  cartItemsEl.innerHTML = "";

  for (const item of cart) {
    const row = document.createElement("div");
    row.className = "cart-item";

    const name = document.createElement("span");
    name.className = "cart-item-name";
    name.textContent = item.product.nombre;

    const price = document.createElement("span");
    price.className = "cart-item-price";
    price.textContent = `$${item.product.precio.toFixed(2)}`;

    const qtyWrapper = document.createElement("div");
    qtyWrapper.className = "cart-item-qty";

    const decBtn = document.createElement("button");
    decBtn.className = "qty-btn";
    decBtn.textContent = "−";
    decBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        updateQuantity(item.product.id, item.quantity - 1);
      } else {
        removeFromCart(item.product.id);
      }
      renderCart();
    });

    const qtySpan = document.createElement("span");
    qtySpan.textContent = String(item.quantity);

    const incBtn = document.createElement("button");
    incBtn.className = "qty-btn";
    incBtn.textContent = "+";
    incBtn.addEventListener("click", () => {
      updateQuantity(item.product.id, item.quantity + 1);
      renderCart();
    });

    qtyWrapper.appendChild(decBtn);
    qtyWrapper.appendChild(qtySpan);
    qtyWrapper.appendChild(incBtn);

    const subtotal = document.createElement("span");
    subtotal.className = "cart-item-subtotal";
    subtotal.textContent = `$${(item.product.precio * item.quantity).toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";
    removeBtn.textContent = "Eliminar";
    removeBtn.addEventListener("click", () => {
      removeFromCart(item.product.id);
      renderCart();
    });

    row.appendChild(name);
    row.appendChild(price);
    row.appendChild(qtyWrapper);
    row.appendChild(subtotal);
    row.appendChild(removeBtn);
    cartItemsEl.appendChild(row);
  }

  cartTotalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

renderCart();
