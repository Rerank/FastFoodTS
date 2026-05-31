import { createContext, useContext } from "react";
import type { CartContextValue } from "@/types/cart";

// Создаем контекст и экспортируем его, чтобы Провайдер мог его использовать
export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = (): CartContextValue => {
    const context = useContext(CartContext);
  
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
  
    return context;
  };