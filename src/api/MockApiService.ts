import type { ApiService } from '@/api/types';
import { mockCategories, mockProducts, mockPromotions, mockUsers, mockOrders } from '@/api/mockData';
import { mapProductToDomain, mapOrderToDomain } from '@/api/mappers';
import type { OrderItemDto, OrderDto } from '@/types/order';
import type { User } from '@/types/user';

const delay = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const SIMULATED_DELAY = 180;
let currentUser: User | null = mockUsers[0]; //logout устанавливает null


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
      return {
        data: null,
        error: {
          kind: 'client',
          status: 404,
          message: 'Товар не найден',
        }
      };
    }
    return { data: mapProductToDomain(result), error: null };
  },

  getCurrentUser: async () => {
    await delay(SIMULATED_DELAY);
    return currentUser
      ? { data: currentUser, error: null }
      : {
        data: null,
        error: {
          kind: 'auth',
          status: 401,
          message: 'Требуется авторизация',
        }
      };
  },

  login: async (_phone, _password) => {
    await delay(SIMULATED_DELAY);
    currentUser = mockUsers[0];
    return { data: currentUser, error: null };
  },

  logout: async () => {
    await delay(SIMULATED_DELAY);
    currentUser = null;
    return { data: null, error: null };
  },

  register: async (name, phone, _password) => {
    await delay(SIMULATED_DELAY);
    const user: User = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      name,
      phone,
      avatar_file_name: null,
    };
    mockUsers.push(user);
    currentUser = user;
    return { data: user, error: null };
  },

  getOrders: async () => {
    await delay(SIMULATED_DELAY);
    if (!currentUser) {
      return {
        data: null,
        error: {
          kind: 'auth',
          status: 401,
          message: 'Требуется авторизация',
        }
      };
    }
    const orders = mockOrders.map(mapOrderToDomain);
    orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return { data: orders, error: null };

  },
  createOrder: async (orderPayload) => {
    await delay(1500);

    if (!currentUser) {
      return {
        data: null,
        error: {
          kind: 'auth',
          status: 401,
          message: 'Требуется авторизация',
        }
      };
    }

    const items: OrderItemDto[] = [];

    for (const payloadItem of orderPayload.items) {
      const product = mockProducts.find(p => p.id === payloadItem.productId);

      if (!product) {
        return {
          data: null,
          error: {
            kind: 'client',
            status: 404,
            message: 'Товара нет в базе',
          }
        };
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