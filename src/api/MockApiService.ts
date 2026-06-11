import type { ApiService } from '@/api/types';
import { mockCategories, mockProducts, mockPromotions, mockUsers, mockOrders } from '@/api/mockData';
import { mapProductToDomain, mapOrderToDomain } from '@/api/mappers';

const delay = (ms: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

const SIMULATED_DELAY = 200;


export const mockApiService: ApiService = {
    getCategories: async () => {
      await delay(SIMULATED_DELAY);
      return { data: mockCategories, error: null };
    },

    getPromotions: async () => {
        await delay(SIMULATED_DELAY);
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

    }
  };