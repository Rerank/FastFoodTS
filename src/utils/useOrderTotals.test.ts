import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOrderTotals } from './useOrderTotals';
import type { CartItem } from '@/types/cart';

describe('useOrderTotals', () => {
    // Создаём функцию которая возвращает дефолтный CartItem с возможностью перезаписать поля
    const makeItem = (overrides: Partial<CartItem>): CartItem => ({
        id: 1,
        category_id: 5,
        title: 'Товар',
        description: null,
        image_name: null,
        weight: '100 г',
        price: 100,
        quantity: 1,
        ...overrides,
    });

    it('считает заказ без акций', () => {
        // Arrange
        const cartItems = [makeItem({ category_id: 5, price: 140, quantity: 2 })];

        // Act
        const { result } = renderHook(() => useOrderTotals(cartItems));

        // Assert
        // 140*2 + 250 (доставка) = 530
        expect(result.current.finalPrice).toBe(530);
    });

    it('считает комбо-скидку', () => {
        // Arrange
        const cartItems = [
            makeItem({ category_id: 1, price: 390, quantity: 1 }),
            makeItem({ category_id: 2, price: 280, quantity: 1 }),
            makeItem({ category_id: 3, price: 250, quantity: 1 }),
            makeItem({ category_id: 4, price: 460, quantity: 1 }),
            makeItem({ category_id: 5, price: 140, quantity: 1 }),
        ];

        // Act
        // renderHook создаёт минимальный компонент-обёртку, который вызывает хук useOrderTotals
        const { result } = renderHook(() => useOrderTotals(cartItems));

        // Assert
        // 1520 − комбо 30% (456) = 1064, доставка бесплатна (≥1000)
        expect(result.current.finalPrice).toBe(1064);
    });
});