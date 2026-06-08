# 🍔 FastFood (TypeScript)

Учебный **пет-проект**: одностраничное приложение (SPA) для заказа еды на **React + TypeScript**.
Это TypeScript-версия более раннего проекта на React + JavaScript — он переписан целиком с упором
на типобезопасную архитектуру.

---

## 🛠 Технологии

- **Frontend:** React 19, TypeScript 6 (строгий режим), Vite 8, чистый CSS (BEM).
- **Роутинг:** собственный мини-роутер на History API (без `react-router`).
- **Состояние:** локальный `useState`/`useEffect` + Context API для корзины.
- **Backend:** отдельный REST API на **Node.js + Express + TypeScript + PostgreSQL** (отдаёт JSON),
  вынесен в самостоятельный проект; фронтенд обращается к нему по HTTP.

---

## 🚀 Запуск (локально)

Нужен **Node.js**. Бэкенд-API запускается отдельно (см. его README).

1. **Backend.** Поднять API-сервер (Node.js + Express + PostgreSQL) — по умолчанию он слушает
   `http://localhost:3000`.
2. **Frontend:**
   ```bash
   npm install
   npm run dev      # дев-сервер Vite → http://localhost:5173
   npm run build    # tsc -b (проверка типов) + сборка
   npm run lint     # eslint
   ```

Базовый URL API задаётся переменной окружения `VITE_API_BASE_URL` (файл `.env`),
по умолчанию — `http://localhost:3000/api`.

---

## 🗂 Структура проекта

```text
src/
├── api/
│   └── apiService.ts        # слой работы с API: fetch, валидация, маппинг DTO→домен
├── types/                   # типы предметной области (общий "словарь")
│   ├── category.ts          # Category
│   ├── product.ts           # ProductDto (сырой) | Product (домен) | ProductWithCategoryTitle (view)
│   ├── promotion.ts         # Promotion
│   ├── user.ts              # User
│   └── cart.ts              # CartItem, CartContextValue
├── router/                  # собственный SPA-роутер
│   ├── Router.tsx           # сопоставляет URL → страница
│   ├── Link.tsx             # <a>, перехватывающий клик (без перезагрузки)
│   └── navigate.ts          # программный переход
├── context/                 # корзина через Context API
│   ├── useCart.ts           # CartContext + хук useCart()
│   └── CartProvider.tsx     # хранилище и логика корзины
├── utils/
│   ├── constants.ts         # IMAGE_BASE_URL, фичефлаги акций, заглушки картинок и пр.
│   ├── formatters.ts        # formatPrice()
│   ├── useOrderTotals.ts    # расчёт итогов заказа (акции, доставка) — пайплайн
│   └── useDragToScroll.ts   # drag-to-scroll мышью для горизонтальных списков
├── components/
│   ├── common/              # переиспользуемые: BottomNav, ErrorState, SearchField,
│   │                        #   SearchResultsList, ImageWithFallback
│   ├── MenuHeader/          # шапка (принимает SearchField как children)
│   ├── CategoryTabs/        # табы категорий
│   ├── MenuSection/         # секция товаров + ProductCard
│   └── PromoCarousel/       # карусель акций + PromoCard
├── pages/                   # MenuPage, ProductPage, CartPage, ProfilePage, NotFoundPage
├── App.tsx                  # корень: <CartProvider> вокруг <Router/> и <BottomNav/>
└── main.tsx                 # точка входа React
```

---

## 🧩 Как это устроено (архитектура)

### Маршрутизация
Кастомный роутер на `window.history.pushState` + событие `popstate`.
- `Router.tsx` хранит текущий `pathname` в состоянии и по нему рендерит нужную страницу;
  для `/product/:id` достаёт `id` из URL и передаёт в `ProductPage`.
- Переходы — только через `<Link to="...">` (перехватывает клик) или функцию `navigate('...')`.

### Слой API и типов — главная идея проекта
Граница «внешний мир → приложение» строго типизирована:
- `apiService.ts` делает `fetch`, проверяет ответ (`unknown` + type guards) и возвращает
  единый результат **`ApiResult<T>` = `{ data: T | null; error: string | null }`**.
- **Три слоя типов товара** (см. `types/product.ts`):
  - `ProductDto` — то, что *реально* приходит с сервера (например, `price` — **строка** `"390.00"`,
    т.к. это `NUMERIC` в БД);
  - `Product` — доменная модель, с которой работает приложение (`price` уже **число**);
  - `ProductWithCategoryTitle` — `Product` + название категории (собирается на клиенте для поиска).
- Превращение `ProductDto → Product` (в т.ч. `Number(price)`) делает **маппер** в `apiService`.
  Так «грязь формата» заперта в одном месте, а вся остальная логика работает с чистыми числами.


### Состояние корзины
Context API: `CartProvider` хранит товары и операции (`addToCart`, `removeFromCart`,
`updateQuantity`), а компоненты читают их через хук `useCart()`. Хук бросает понятную ошибку,
если вызван вне `<CartProvider>`. Итоги заказа (скидки, доставка) считает `useOrderTotals()`.

### Картинки и устойчивость к ошибкам
- В БД хранятся **только имена файлов**; полный URL собирается на клиенте из `IMAGE_BASE_URL`.
- Компонент `ImageWithFallback` подставляет заглушку, если имени нет (`null`) **или** файл не
  загрузился (404, через `onError`).
- Ошибки загрузки данных и состояния «грузится» показываются через `ErrorState` и скелетоны.

### Типичный поток загрузки страницы
`useEffect` → вызов `apiService.getX()` → проверка `result.error` / `result.data` →
запись в `useState` → рендер (скелетон во время загрузки, `ErrorState` при ошибке, данные при успехе).

---

## 🗄 Модель данных (PostgreSQL, БД `fastfood_db`)

В БД хранятся только имена файлов картинок (`image_name` / `avatar_file_name`), URL формируется на клиенте.

| Таблица | Поля |
|---|---|
| `categories` | `id`, `slug` (для URL), `title`, `sort_order`, `is_active` |
| `products` | `id`, `category_id` (FK), `title`, `description`, `weight`, `price` (NUMERIC), `image_name`, `is_active` |
| `promotions` | `id`, `type` (CSS-модификатор), `label`, `title`, `description`, `image_name`, `is_active` |
| `users` | `id`, `name`, `phone`, `avatar_file_name` (nullable), `created_at` |

**Эндпоинты API** (отдают JSON): `GET /api/categories`, `GET /api/products`,
`GET /api/products/:id`, `GET /api/promotions`, `GET /api/user/:id`.

Важные особенности формата (отражены в типах): `price` приходит **строкой**;
`description`, `image_name`, `avatar_file_name` могут быть `null`.

---

## 📌 Известные упрощения

- Аутентификации нет: профиль грузится для захардкоженного `id` (`getUser(1)`).
- Адрес доставки, оплата, кнопка «Заказать» — статичные заглушки в вёрстке.
