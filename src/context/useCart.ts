import { createContext, useContext } from "react";
import type { CartContextValue } from "@/types/cart";

// undefined используется, если вызов контекста произойдёт вне провайдера
export const CartContext = createContext<CartContextValue | undefined>(undefined);

// можно было бы обойтись вызовом useContext(CartContext) в компоненте, но тогда нужно проверять на undefined
// этот хук сужает тип и гарантирует, что обращение к контексту будет внутри провайдера
export const useCart = (): CartContextValue => {
    const context = useContext(CartContext);
  
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
  
    return context;
  };