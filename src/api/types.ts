import type { Category } from '@/types/category';
import type { Promotion } from '@/types/promotion';
import type { Product } from '@/types/product';
import type { User } from '@/types/user';

export interface ApiResult<T> {
    data: T | null;
    error: string | null;
}

export interface ApiService {
    getCategories(): Promise<ApiResult<Category[]>>;
    getProducts(): Promise<ApiResult<Product[]>>;
    getProductById(id: number): Promise<ApiResult<Product>>;
    getPromotions(): Promise<ApiResult<Promotion[]>>;
    getUser(id: number): Promise<ApiResult<User>>;
  }