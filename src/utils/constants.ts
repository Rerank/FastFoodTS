export const IMAGE_BASE_URL = `${import.meta.env.BASE_URL}images/`;
export const PRODUCTS_PREVIEW_LIMIT = 6;
export const CURRENCY_SYMBOL = '₽';
export const TAP_EFFECT_DELAY = 180;
export const PLACEHOLDER_PRODUCT_IMAGE = 'products.webp';
export const PLACEHOLDER_AVATAR_IMAGE = 'avatar.webp';

// Флаги активности промоакций
export const ACTIVE_PROMOTIONS = {
    FREE_DELIVERY: true,
    TWO_FOR_ONE: true,
    COMBO_DISCOUNT: true,
} as const;

export const DELIVERY_COST = 250;
export const FREE_DELIVERY_THRESHOLD = 1000;
export const TWO_FOR_ONE_CATEGORY_ID = 1;
export const COMBO_CATEGORY_IDS = [1, 2, 3, 4];
export const COMBO_DISCOUNT_PERCENT = 0.3;