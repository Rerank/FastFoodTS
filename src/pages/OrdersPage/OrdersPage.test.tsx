import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { apiService } from '@/api/apiService';
import OrdersPage from './OrdersPage';
import type { Order } from '@/types/order';

//Подменяем apiService
vi.mock('@/api/apiService', () => ({
  apiService: { getOrders: vi.fn() },
}));

describe('OrdersPage', () => {
  const order: Order = {
    id: 1,
    status: 'preparing',
    total: 640,
    createdAt: new Date('2026-08-05T14:30:00'),
    items: [{ productId: 1, title: 'Маргарита', quantity: 2, price: 390 }],
  };

  it('показывает заказы после загрузки', async () => {
    // Arrange — «сервер» ответит одним заказом
    vi.mocked(apiService.getOrders).mockResolvedValue({ data: [order], error: null });

    // Act
    render(<OrdersPage />);

    // Assert — ждём, пока на странице появится Заказ №1
    expect(await screen.findByText('Заказ №1')).toBeInTheDocument();
    expect(await screen.findByText('Маргарита')).toBeInTheDocument();
  });

  it('показывает скелетон до загрузки товара', () => {
    // Arrange
    vi.mocked(apiService.getOrders).mockResolvedValue({ data: [order], error: null });

    // Act
    render(<OrdersPage />);

    // Assert
    // нужно зарефакторить скелетоны, чтобы можно было искать по getByRole, но пока так
    expect(document.querySelector('.skeleton-line')).toBeInTheDocument();
    expect(screen.queryByText('Заказ №1')).not.toBeInTheDocument();

  });

  it('показывает сообщение об ошибке, если не удалось загрузить', async () => {
    // Arrange
    vi.mocked(apiService.getOrders).mockResolvedValue({ data: null, error: 'Не удалось загрузить данные.' });

    // Act
    render(<OrdersPage />);

    // Assert
    //нужно добавить нормальный ErrorState, но пока так
    expect(await screen.findByText('Не удалось загрузить данные.')).toBeInTheDocument();
    expect(screen.queryByText('Заказ №1')).not.toBeInTheDocument();

  });
});