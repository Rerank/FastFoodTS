import { createContext, useContext } from "react";
import type { CartContextValue } from "@/types/cart";


export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const useCart = (): CartContextValue => {
    const context = useContext(CartContext);
  
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
  
    return context;
  };