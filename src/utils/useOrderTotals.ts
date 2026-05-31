import { useMemo } from 'react';
import { DELIVERY_COST, FREE_DELIVERY_THRESHOLD, ACTIVE_PROMOTIONS, TWO_FOR_ONE_CATEGORY_ID, COMBO_CATEGORY_IDS, COMBO_DISCOUNT_PERCENT } from '@/utils/constants';
import type { CartItem } from '@/types/cart';


interface OrderState {
    cartItems: CartItem[];
    totalItems: number;
    itemsPrice: number;
    discount: number;
    twoForOneDiscount: number;
    comboDiscount: number;
    deliveryCost: number;
    isComboApplied: boolean;
    isTwoForOneApplied: boolean;
    isFreeDelivery: boolean;
  }

// --- Вспомогательные функции (промоакции) ---

const applyFreeDelivery = (orderState: OrderState): OrderState => {
    const priceAfterDiscounts = orderState.itemsPrice - orderState.discount;

    // Если стоимость товаров больше или равна порогу, доставка 0
    if (priceAfterDiscounts >= FREE_DELIVERY_THRESHOLD) {
        return {
            ...orderState,
            deliveryCost: 0,
            isFreeDelivery: true
        };
    }
    return orderState;
};

const applyTwoForOne = (orderState: OrderState): OrderState => {
    let promoDiscount = 0;

    orderState.cartItems.forEach(item => {
        if (item.category_id === TWO_FOR_ONE_CATEGORY_ID) {
            const freeItemsCount = Math.floor(item.quantity / 2);
            promoDiscount += freeItemsCount * item.price;
        }
    });

    if (promoDiscount > 0) {
        return {
            ...orderState,
            twoForOneDiscount: promoDiscount,
            discount: orderState.discount + promoDiscount,
            isTwoForOneApplied: true // Флаг для UI
        };
    }

    return orderState;
};

const applyComboDiscount = (orderState: OrderState): OrderState => {
    const cartCategoryIds = new Set(orderState.cartItems.map(item => item.category_id));

    const hasAllCategories = COMBO_CATEGORY_IDS.every(id => cartCategoryIds.has(id));

    if (hasAllCategories) {
        //Считаем скидку от ОСТАТКА суммы (после применения предыдущих акций)
        const remainingPrice = orderState.itemsPrice - orderState.discount;
        const comboDiscountAmount = remainingPrice * COMBO_DISCOUNT_PERCENT;

        return {
            ...orderState,
            comboDiscount: comboDiscountAmount,
            discount: orderState.discount + comboDiscountAmount,
            isComboApplied: true // Флаг для UI
        };
    }

    return orderState;
};


// --- Сам хук ---

export const useOrderTotals = (cartItems: CartItem[]) => {
    // Используем useMemo, чтобы не пересчитывать всё при каждом рендере,
    // а только когда изменится корзина (cartItems)
    const totals = useMemo(() => {
        
        // Базовый расчет (без акций)
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const itemsPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Начальное состояние заказа
        let orderState: OrderState = {
            cartItems,
            totalItems,
            itemsPrice,
            discount: 0,
            twoForOneDiscount: 0,
            comboDiscount: 0,
            deliveryCost: DELIVERY_COST,
            isComboApplied: false,
            isTwoForOneApplied: false,
            isFreeDelivery: false,
        };

        // Применяем промоакции по очереди (Пайплайн)
        if (ACTIVE_PROMOTIONS.TWO_FOR_ONE) {
            orderState = applyTwoForOne(orderState);
        }

        if (ACTIVE_PROMOTIONS.COMBO_DISCOUNT) {
            orderState = applyComboDiscount(orderState);
        }

        if (ACTIVE_PROMOTIONS.FREE_DELIVERY) {
            orderState = applyFreeDelivery(orderState);
        }

        // Итоговая цена
        const finalPrice = orderState.itemsPrice - orderState.discount + orderState.deliveryCost;

        // Возвращаем всё наружу
        return {
            ...orderState,
            finalPrice
        };
        
    }, [cartItems]); // Пересчитываем только при изменении cartItems

    return totals;
};