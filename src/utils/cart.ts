import type { StoreProduct } from "../types";

export interface CartItem {
  product: StoreProduct;
  qty: number;
}

export function addToCart(cart: CartItem[], product: StoreProduct, qty = 1): CartItem[] {
  const existing = cart.find((c) => c.product.id === product.id);
  if (existing) {
    return cart.map((c) =>
      c.product.id === product.id ? { ...c, qty: Math.min(99, c.qty + qty) } : c,
    );
  }
  return [...cart, { product, qty: Math.max(1, qty) }];
}

export function removeFromCart(cart: CartItem[], productId: string): CartItem[] {
  return cart.filter((c) => c.product.id !== productId);
}

export function cartSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => {
    const price = item.product.variants?.[0]?.price ?? 0;
    return sum + price * item.qty;
  }, 0);
}

export function cartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}