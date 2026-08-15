import type { ApiError, ApiResult, ApiService } from '@/api/types';
import type { Product, ProductDto } from '@/types/product';
import type { User } from '@/types/user';
import type { Category } from '@/types/category';
import type { Promotion } from '@/types/promotion';
import type { Order, OrderDto } from '@/types/order';
import { mapProductToDomain, mapOrderToDomain } from '@/api/mappers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


const isObject = (data: unknown): data is Record<string, unknown> => {
    return data !== null && typeof data === 'object' && !Array.isArray(data);
};

const kindByStatus = (status: number): ApiError['kind'] => {
    if (status === 401) return 'auth';
    if (status >= 500) return 'server';
    return 'client';
};


const fetchWithErrorHandling = async <T>(
    url: string,
    validator: (data: unknown) => boolean,
    options?: RequestInit
): Promise<ApiResult<T>> => {
    const response = await fetch(url, { ...options, credentials: 'include' }).catch(() => null);

    if (response === null) {
        return { data: null, error: { kind: 'network', status: null, message: 'Нет связи с сервером' } };
    }

    // При logout бэкенд вернёт "204 No Content" — парсить и проверять нечего
    if (response.status === 204) return { data: null, error: null };

    // если тело распарсить не удалось, то гасим исключение от .json()
    const rawData: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        return {
            data: null,
            error: {
                kind: kindByStatus(response.status),
                status: response.status,
                message: isObject(rawData) && typeof rawData.error === 'string' ? rawData.error : 'Не удалось загрузить данные.',
            },
        };
    }

    // сервер ответил успехом, но прислал не то
    if (!validator(rawData)) {
        console.error('Неверный формат данных: ', rawData);
        return {
            data: null,
            error: { kind: 'server', status: response.status, message: 'Не удалось загрузить данные.' },
        };
    }

    return { data: rawData as T, error: null };
};


export const httpApiService: ApiService = {
    getCategories: () =>
        fetchWithErrorHandling<Category[]>(`${API_BASE_URL}/categories`, Array.isArray),

    getPromotions: () =>
        fetchWithErrorHandling<Promotion[]>(`${API_BASE_URL}/promotions`, Array.isArray),

    getCurrentUser: () =>
        //куки с токеном будут в запросе благодаря credentials: 'include'
        fetchWithErrorHandling<User>(`${API_BASE_URL}/auth/me`, isObject),

    login: async (phone, password) =>
        fetchWithErrorHandling<User>(`${API_BASE_URL}/auth/login`, isObject, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, password }),
        }),

    register: async (name, phone, password) =>
        fetchWithErrorHandling<User>(`${API_BASE_URL}/auth/register`, isObject, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, password }),
        }),

    logout: () =>
        fetchWithErrorHandling<null>(`${API_BASE_URL}/auth/logout`, isObject, { method: 'POST' }),

    getProducts: async (): Promise<ApiResult<Product[]>> => {
        const result = await fetchWithErrorHandling<ProductDto[]>(`${API_BASE_URL}/products`, Array.isArray);

        if (result.error || result.data === null) {
            return { data: null, error: result.error };
        }

        return {
            data: result.data.map(mapProductToDomain),
            error: null,
        };
    },

    getProductById: async (id): Promise<ApiResult<Product>> => {
        const result = await fetchWithErrorHandling<ProductDto>(`${API_BASE_URL}/products/${id}`, isObject);

        if (result.error || result.data === null) {
            return { data: null, error: result.error };
        }

        return {
            data: mapProductToDomain(result.data),
            error: null,
        }
    },

    getOrders: async (): Promise<ApiResult<Order[]>> => {
        const result = await fetchWithErrorHandling<OrderDto[]>(`${API_BASE_URL}/orders`, Array.isArray);

        if (result.error || result.data === null) {
            return { data: null, error: result.error };
        }

        return {
            data: result.data.map(mapOrderToDomain),
            error: null,
        }

    },
    createOrder: async (orderPayload) => {
        const result = await fetchWithErrorHandling<OrderDto>(
            `${API_BASE_URL}/orders`,
            isObject,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
            }
        );

        if (result.error || result.data === null) {
            return { data: null, error: result.error };
        }

        return {
            data: mapOrderToDomain(result.data),
            error: null,
        }
    }
};