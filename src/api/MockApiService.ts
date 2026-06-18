import type { ApiService } from '@/api/types';
import { mockCategories, mockProducts, mockPromotions, mockUsers, mockOrders } from '@/api/mockData';
import { mapProductToDomain, mapOrderToDomain } from '@/api/mappers';
import type { OrderItemDto, OrderDto } from '@/types/order';

const delay = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const SIMULATED_DELAY = 180;


export const mockApiService: ApiService = {
  getCategories: async () => {
    await delay(SIMULATED_DELAY);
    return { data: mockCategories, error: null };
  },

  getPromotions: async () => {
    await delay(50);
    return { data: mockPromotions, error: null };
  },

  getProducts: async () => {
    await delay(SIMULATED_DELAY);
    return { data: mockProducts.map(mapProductToDomain), error: null };

  },

  getProductById: async (id) => {
    await delay(SIMULATED_DELAY);
    const result = mockProducts.find(p => p.id === id);
    if (!result) {
      return { data: null, error: 'Товар не найден' };
    }
    return { data: mapProductToDomain(result), error: null };
  },

  getUser: async (id) => {
    await delay(SIMULATED_DELAY);
    const result = mockUsers.find(p => p.id === id);
    if (!result) {
      return { data: null, error: 'Пользователь не найден' };
    }
    return { data: result, error: null };
  },

  getOrders: async (_userId) => {
    await delay(SIMULATED_DELAY);
    const orders = mockOrders.map(mapOrderToDomain);
    orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return { data: orders, error: null };

  },
  createOrder: async (_userId, orderPayload) => {
    await delay(1500);

    const items: OrderItemDto[] = [];

    for (const payloadItem of orderPayload.items) {
      const product = mockProducts.find(p => p.id === payloadItem.productId);

      if (!product) {
        return { data: null, error: 'Товара нет в базе' };
      }

      items.push({
        productId: product.id,
        title: product.title, 
        price: product.price, 
        quantity: payloadItem.quantity, 
      });
    }

    const newOrderDto: OrderDto = {
      id: Math.max(...mockOrders.map(o => o.id)) + 1,
      status: 'preparing',
      createdAt: new Date().toISOString(),
      total: orderPayload.total.toFixed(2),
      items,
    };

    mockOrders.push(newOrderDto);
    return { data: mapOrderToDomain(newOrderDto), error: null };
  }
   

}