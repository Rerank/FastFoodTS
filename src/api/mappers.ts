import type { Product, ProductDto } from '@/types/product';
import type { Order, OrderItem, OrderDto, OrderItemDto } from '@/types/order';

export const mapProductToDomain = (dto: ProductDto): Product => {
    return { ...dto, price: Number(dto.price) };
};

const mapOrderItemToDomain = (dto: OrderItemDto): OrderItem => {
    return { ...dto, price: Number(dto.price) };
};

export const mapOrderToDomain = (dto: OrderDto): Order => {
    return {
        ...dto,
        total: Number(dto.total),  
        createdAt: new Date(dto.createdAt), 
        items: dto.items.map(mapOrderItemToDomain), 
    };
};