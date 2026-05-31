import type { Product } from './product';

// Товар в корзине = доменный Product + количество.
export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextValue {
    cartItems: CartItem[];
  
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, amount: number) => void;
  }