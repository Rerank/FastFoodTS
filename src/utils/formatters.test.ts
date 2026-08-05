import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { pluralize, formatOrderDate } from './formatters';


describe('pluralize', () => {
    const forms: [string, string, string] = ['товар', 'товара', 'товаров'];

    it.each([
        { count: 1, expected: 'товар' },
        { count: 2, expected: 'товара' },
        { count: 5, expected: 'товаров' },
        { count: 11, expected: 'товаров' },
        { count: 14, expected: 'товаров' },
        { count: 21, expected: 'товар' },
        { count: 0, expected: 'товаров' },
    ])('для $count возвращает "$expected"', ({ count, expected }) => {
        expect(pluralize(count, forms)).toBe(expected);
    });
});


describe('formatOrderDate', () => {
    const NOW = new Date('2026-08-05T14:30:00');

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(NOW));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    // тесты
    it('для сегодняшней даты подставляет "Сегодня"', () => {
        // Arrange
        const today = new Date();
        // Act
        const formattedDate = formatOrderDate(today)

        // Assert
        expect(formattedDate).toBe("Сегодня, 14:30");

    });

    it('для вчерашней даты подставляет "Вчера"', () => {
        // Arrange
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        // Act
        const formattedDate = formatOrderDate(yesterday)

        // Assert
        expect(formattedDate).toBe("Вчера, 14:30");

    });

    it('для более ранней даты подставляет дату', () => {
        // Arrange
        const orderDate = new Date('2026-07-31T14:30:00');
        // Act
        const formattedDate: string = formatOrderDate(orderDate)

        // Assert
        expect(formattedDate).toBe("31 июля, 14:30");

    });
});