import type { Category } from '@/types/category';
import type { Promotion } from '@/types/promotion';
import type { Product } from '@/types/product';
import type { User } from '@/types/user';
import type { Order, CreateOrderPayload } from '@/types/order';

export type ApiError = {
    kind: 'auth' | 'client' | 'server' | 'network';
    status: number | null;
    message: string;
};

export interface ApiResult<T> {
    data: T | null;
    error: ApiError | null;
}

export interface ApiService {
    getCategories(): Promise<ApiResult<Category[]>>;
    getProducts(): Promise<ApiResult<Product[]>>;
    getProductById(id: number): Promise<ApiResult<Product>>;
    getPromotions(): Promise<ApiResult<Promotion[]>>;

    getCurrentUser(): Promise<ApiResult<User>>;
    register(name: string, phone: string, password: string): Promise<ApiResult<User>>;
    login(phone: string, password: string): Promise<ApiResult<User>>;
    logout(): Promise<ApiResult<null>>;

    getOrders(): Promise<ApiResult<Order[]>>;
    createOrder(orderPayload: CreateOrderPayload, idempotencyKey: string): Promise<ApiResult<Order>>;
}

  