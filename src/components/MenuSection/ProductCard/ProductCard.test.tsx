import { describe, it, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CartContext } from '@/context/useCart';
import type { CartContextValue } from '@/types/cart';
import { act, render, screen, waitFor } from '@testing-library/react';
import CartProvider from '@/context/CartProvider';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';

describe('ProductCard', () => {
    const product: Product = {
        id: 1,
        category_id: 1,
        title: 'Маргарита',
        description: null,
        image_name: 'маргарита.webp',
        weight: '410 г',
        price: 390,
    };

    afterEach(() => {
        vi.useRealTimers();
      });

    it('Показывает название, вес и цену', () => {
        //wrapper — это компонент, который получит отрендеренное дерево как children
        //Результат эквивалентен <CartProvider><ProductCard ... /></CartProvider>
        render(<ProductCard product={product} />, { wrapper: CartProvider });

        expect(screen.getByText('Маргарита')).toBeInTheDocument();
        expect(screen.getByText('410 г')).toBeInTheDocument();
        expect(screen.getByText('390 ₽')).toBeInTheDocument();
    });

    it('Показывает кнопку добавления товара в корзину', () => {
        render(<ProductCard product={product} />, { wrapper: CartProvider });

        expect(screen.getByRole('button', { name: 'Добавить Маргарита в корзину' })).toBeInTheDocument();
    });

    it('Название это ссылка на страницу товара', () => {
        render(<ProductCard product={product} />, { wrapper: CartProvider });

        const link = screen.getByRole('link', { name: 'Маргарита' });
        expect(link).toHaveAttribute('href', '/product/1');

    });

    it('по клику добавляет товар в корзину', async () => {   // ← async
        // Arrange
        const addToCart = vi.fn();
        const cartValue: CartContextValue = {
            cartItems: [],
            addToCart,
            removeFromCart: vi.fn(),
            updateQuantity: vi.fn(),
            clearCart: vi.fn(),
        };

        //setup() заводит «сессию»: она помнит состояние клавиш-модификаторов, положение указателя и прочий контекст между действиями
        const user = userEvent.setup();

        render(
            <CartContext.Provider value={cartValue}>
                <ProductCard product={product} />
            </CartContext.Provider>
        );

        // Act
        await user.click(screen.getByRole('button', { name: 'Добавить Маргарита в корзину' }));

        // Assert
        expect(addToCart).toHaveBeenCalledTimes(1); 
        expect(addToCart).toHaveBeenCalledWith(product, 1);

    });

    it('показывает счётчик добавлений и сбрасывает его через секунду', async () => {
        // Arrange
        const user = userEvent.setup(); 
      
        render(<ProductCard product={product} />, { wrapper: CartProvider });
        const button = screen.getByRole('button', { name: 'Добавить Маргарита в корзину' });
      
        // Act — клик
        await user.click(button);
      
        // Assert — счётчик появился
        expect(button).toHaveTextContent("+1");
        await waitFor(() => expect(button).toHaveTextContent(/^\+$/), { timeout: 1200 });
      
      });
});