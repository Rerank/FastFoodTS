// 1. DTO — форма ответа сервера, честно. Используется ТОЛЬКО в api-слое.
export interface ProductDto {
  id: number;
  category_id: number;
  title: string;
  description: string | null;
  image_name: string | null;
  weight: string;
  price: string;
}

// 2. Доменная модель — с ней работает всё приложение.
export interface Product extends Omit<ProductDto, 'price'> {
  price: number;
}

// 3. Доменная модель с названием категории. Собирается на MenuPage, используется в поиске.
export interface ProductWithCategoryTitle extends Product {
  category_title: string;
}