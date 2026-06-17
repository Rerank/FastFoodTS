import { useState, type ReactNode } from 'react';
import { CartContext } from './useCart';
import type { Product } from '@/types/product';
import type { CartItem } from '@/types/cart';


const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);


    const addToCart = (productToAdd: Product, quantity = 1) => {
        const isExisting = cartItems.some(item => item.id === productToAdd.id);

        if (isExisting) {
            updateQuantity(productToAdd.id, quantity);
        } else {
            setCartItems(prevItems => [...prevItems, { ...productToAdd, quantity }]);
        }

    };
    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };
    const updateQuantity = (productId: number, amount: number) => {
        setCartItems(prevItems => {
            return prevItems.reduce((acc: CartItem[], item: CartItem) => {
                // Если это не наш товар, то не меняем количество
                if (item.id !== productId) {
                    acc.push(item);
                    return acc;
                }

                // Если это наш товар, вычисляем новое количество
                const newQuantity = item.quantity + amount;

                // Если количество > 0, кладем обновленный товар в массив
                // Если <= 0, мы просто НЕ делаем acc.push(), и товар исчезает из корзины!
                if (newQuantity > 0) {
                    acc.push({ ...item, quantity: newQuantity });
                }

                return acc;
            }, []); // [] - это начальное значение acc (пустой массив)
        });
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;