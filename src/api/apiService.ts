import type { Category } from '@/types/category';
import type { Promotion } from '@/types/promotion';
import type { ProductDto, Product } from '@/types/product';
import type { User } from '@/types/user';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface ApiResult<T> {
    data: T | null;
    error: string | null;
}

const isObject = (data: unknown): data is Record<string, unknown> => {
    return data !== null && typeof data === 'object' && !Array.isArray(data);
};

const fetchWithErrorHandling = async <T>(
    url: string,
    validator: (data: unknown) => boolean
): Promise<ApiResult<T>> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const rawData: unknown = await response.json();

        if (validator && !validator(rawData)) {
            console.error('Неверный формат данных: ', rawData);
            throw new Error('Неверный формат данных');
        }

        if (isObject(rawData) && 'error' in rawData) {
            console.error('Сервер вернул ошибку:', rawData.error);
            throw new Error(String(rawData.error));
        }
        return { data: rawData as T, error: null };
    } catch (error) {
        return { data: null, error: 'Не удалось загрузить данные.' };
    }
};


const mapProductToDomain = (dto: ProductDto): Product => {
    return { ...dto, price: Number(dto.price) };
};

export const apiService = {
    getCategories: () =>
        fetchWithErrorHandling<Category[]>(`${API_BASE_URL}/categories`, Array.isArray),

    getPromotions: () =>
        fetchWithErrorHandling<Promotion[]>(`${API_BASE_URL}/promotions`, Array.isArray),

    getUser: (id: number) =>
        fetchWithErrorHandling<User>(`${API_BASE_URL}/users/${id}`, isObject),

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

    getProductById: async (id: number): Promise<ApiResult<Product>> => {
        const result = await fetchWithErrorHandling<ProductDto>(`${API_BASE_URL}/products/${id}`, isObject);

        if (result.error || result.data === null) {
            return { data: null, error: result.error };
        }

        return {
            data: mapProductToDomain(result.data),
            error: null,
        }
    }
};