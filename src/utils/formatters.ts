import { CURRENCY_SYMBOL } from '@/utils/constants';

export const formatPrice = (price: number): string => {
  return `${price} ${CURRENCY_SYMBOL}`;
};