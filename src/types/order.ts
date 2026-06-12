export type OrderStatus = 'preparing' | 'delivered' | 'cancelled';

export interface OrderItemDto {
    productId: number;
    title: string;
    quantity: number;
    price: string
}

export interface OrderDto {
    id: number;
    status: OrderStatus;
    total: string;
    createdAt: string;
    items: OrderItemDto[]
    
}

export interface OrderItem extends Omit<OrderItemDto, 'price'> {
    price: number

}

export interface Order extends Omit<OrderDto, 'total' | 'createdAt' | 'items'> {
    total: number;
    createdAt: Date;
    items: OrderItem[]
}


export interface CreateOrderPayload {
    items: {
      productId: number;
      quantity: number; 
    }[];
    total: number; 
  }