import type { CartItem, Product } from "../types/product";

const CART_KEY = "cart";

export function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product): void {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(productId: number): void {
  const cart = getCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: number, quantity: number): void {
  const cart = getCart();
  const item = cart.find((item) => item.product.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    item.quantity = quantity;
    saveCart(cart);
  }
}

export function getCartTotal(): number {
  return getCart().reduce(
    (total, item) => total + item.product.precio * item.quantity,
    0
  );
}

export function getCartCount(): number {
  return getCart().reduce((count, item) => count + item.quantity, 0);
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}
