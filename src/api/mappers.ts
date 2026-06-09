import type { Product, ProductDto } from '@/types/product';

export const mapProductToDomain = (dto: ProductDto): Product => {
    return { ...dto, price: Number(dto.price) };
};