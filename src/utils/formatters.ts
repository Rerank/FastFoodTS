import { CURRENCY_SYMBOL } from '@/utils/constants';
import type { OrderStatus } from '@/types/order';

export const formatPrice = (price: number): string => {
  return `${price} ${CURRENCY_SYMBOL}`;
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  preparing: 'Готовится',
  delivered: 'Доставлен',
  cancelled: 'Отменён'
};

export const pluralize = (count: number, forms: [string, string, string]): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];                       // 1, 21, 101 → товар
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1]; // 2-4, 22-24 → товара
  return forms[2];                                                          // 0, 5-20, 11-14 → товаров
};

export const formatOrderDate = (date: Date): string => {
  const time = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' }).format(date);

  const today = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  if (isSameDay(date, today)) return `Сегодня, ${time}`;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (isSameDay(date, yesterday)) return `Вчера, ${time}`;

  const dayMonth = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date);
  return `${dayMonth}, ${time}`;
};