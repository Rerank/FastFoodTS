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
- **Источник данных:** два взаимозаменяемых источника за единым интерфейсом `ApiService` —
  HTTP-бэкенд или **вшитые моки**; выбор переключается переменной окружения (см. «Запуск»).
  Моки позволяют публиковать приложение на статическом хостинге (GitHub Pages) без сервера и БД.

---

## 🚀 Запуск (локально)

Нужен **Node.js**. Источник данных переключается переменной `VITE_DATA_SOURCE` в файле `.env`:

- `VITE_DATA_SOURCE=mock` — приложение работает на **вшитых данных** (`src/api/mockData.ts`),
  бэкенд и БД не нужны. Этот режим используется для деплоя на статический хостинг.
- любое другое значение (или отсутствие переменной) — данные берутся с **REST-бэкенда** по HTTP.
  Его нужно поднять отдельно (Node.js + Express + PostgreSQL, по умолчанию слушает
  `http://localhost:3000`); базовый URL задаётся в `VITE_API_BASE_URL`
  (по умолчанию `http://localhost:3000/api`).

**Frontend:**
```bash
npm install
npm run dev      # дев-сервер Vite → http://localhost:5173
npm run build    # tsc -b (проверка типов) + сборка
npm run lint     # eslint
npm run preview  # локальный предпросмотр собранного билда
npm run deploy   # сборка + публикация на GitHub Pages (см. «Деплой»)
```

---

## 🚀 Деплой (GitHub Pages)

В **mock-режиме** приложение — это статика, поэтому публикуется на GitHub Pages без сервера и БД.
Живая демо-версия: **https://rerank.github.io/FastFoodTS/**.

Что настроено под Pages:

- **Mock-данные принудительно.** Файл `.env.production` задаёт `VITE_DATA_SOURCE=mock` — прод-сборка
  всегда работает на вшитых данных (бэкенда в проде нет). При `vite build` он приоритетнее `.env`.
- **Базовый путь.** Project-страница раздаётся из подпапки `/<repo>/`, поэтому в `vite.config.ts`
  `base` задаётся условно: `/FastFoodTS/` для `build`, `/` для dev.
- **Учёт base в роутере.** `router/basePath.ts` срезает префикс базы при чтении URL (`toAppPath`)
  и добавляет его при переходах/`href` (`toBrowserUrl`) — иначе клиентские маршруты на подпапке не
  совпадут. Картинки тоже учитывают base: `IMAGE_BASE_URL` строится от `import.meta.env.BASE_URL`.
- **SPA-фолбэк `404.html`.** GitHub Pages — статический хостинг и не знает о клиентских маршрутах:
  при прямом заходе/обновлении на под-адрес он вернул бы свою 404. Скрипт `copy-404.js` (в корне)
  после сборки копирует `dist/index.html` → `dist/404.html`, тогда на любой путь Pages отдаёт
  приложение, а роутер уже показывает нужную страницу (или `NotFoundPage`).

**Как публиковать:**
```bash
npm run deploy   # predeploy (build + copy-404.js) → gh-pages -d dist
```
Команда собирает проект и пушит `dist/` в ветку `gh-pages` (создаётся автоматически). Один раз в
настройках: **Settings → Pages → Source = ветка `gh-pages`, папка `/ (root)`**; репозиторий должен
быть **публичным** (Pages для приватных — платная фича). Разработка идёт в `main`, сайт обновляется
только после `npm run deploy`.

---

## 🗂 Структура проекта

```text
src/
├── api/                     # слой данных за единым интерфейсом ApiService
│   ├── types.ts             # контракт: интерфейс ApiService + ApiResult<T>
│   ├── HttpApiService.ts    # реализация: fetch к бэкенду, валидация (unknown + type guards)
│   ├── MockApiService.ts    # реализация: вшитые данные + имитация сетевой задержки
│   ├── mockData.ts          # снимок БД (моки в форме DTO) для mock-режима, включая mockOrders
│   ├── mappers.ts           # mapProductToDomain / mapOrderToDomain — мапперы DTO→домен
│   └── apiService.ts        # фабрика: выбор реализации по VITE_DATA_SOURCE
├── types/                   # типы предметной области (общий "словарь")
│   ├── category.ts          # Category
│   ├── product.ts           # ProductDto (сырой) | Product (домен) | ProductWithCategoryTitle (view)
│   ├── promotion.ts         # Promotion
│   ├── user.ts              # User
│   ├── cart.ts              # CartItem, CartContextValue
│   └── order.ts             # OrderDto/Order, OrderItemDto/OrderItem, OrderStatus, CreateOrderPayload
├── router/                  # собственный SPA-роутер
│   ├── Router.tsx           # сопоставляет URL → страница
│   ├── Link.tsx             # <a>, перехватывающий клик (без перезагрузки)
│   ├── navigate.ts          # программный переход
│   ├── basePath.ts          # учёт base-пути (подпапки) при деплое на GitHub Pages
│   └── useCurrentPath.ts    # хук: текущий путь (с учётом base), общий для Router и BottomNav
├── context/                 # корзина через Context API
│   ├── useCart.ts           # CartContext + хук useCart()
│   └── CartProvider.tsx     # хранилище и логика корзины
├── utils/
│   ├── constants.ts         # IMAGE_BASE_URL, фичефлаги акций, заглушки картинок и пр.
│   ├── formatters.ts        # formatPrice(), formatOrderDate(), pluralize(), ORDER_STATUS_LABELS
│   ├── useOrderTotals.ts    # расчёт итогов заказа (акции, доставка) — пайплайн
│   └── useDragToScroll.ts   # drag-to-scroll мышью для горизонтальных списков
├── components/
│   ├── common/              # переиспользуемые: BottomNav, ErrorState, SearchField,
│   │                        #   SearchResultsList, ImageWithFallback
│   ├── MenuHeader/          # шапка (принимает SearchField как children)
│   ├── CategoryTabs/        # табы категорий
│   ├── MenuSection/         # секция товаров + ProductCard
│   ├── PromoCarousel/       # карусель акций + PromoCard
│   └── OrderCard/           # карточка заказа на странице «Мои заказы»
├── pages/                   # MenuPage, ProductPage, CartPage (+CheckoutModal), ProfilePage, OrdersPage, NotFoundPage
├── App.tsx                  # корень: <CartProvider> вокруг <Router/> и <BottomNav/>
└── main.tsx                 # точка входа React
```

---

## 🧩 Как это устроено (архитектура)

### Маршрутизация
Кастомный роутер на `window.history.pushState` + событие `popstate`.
- Текущий путь даёт общий хук `useCurrentPath()` (состояние + подписка на `popstate`); его
  используют и `Router.tsx`, и `BottomNav` — единый источник, без дублирования логики.
- `Router.tsx` по этому пути рендерит нужную страницу; для `/product/:id` достаёт `id` из URL.
- Переходы — только через `<Link to="...">` (перехватывает клик) или функцию `navigate('...')`.
- **Base-путь (подпапка на GitHub Pages):** `basePath.ts` срезает префикс базы при чтении URL
  (`toAppPath`) и добавляет его при переходах/`href` (`toBrowserUrl`) — маршруты работают и в
  корне (dev), и в подпапке `/FastFoodTS/` (прод).

### Слой данных и типов
Граница «внешний мир → приложение» строго типизирована и спрятана за **единым контрактом**.

- **Контракт `ApiService`** (`api/types.ts`) описывает методы доступа к данным
  (`getCategories`, `getProducts`, `getProductById`, `getPromotions`, `getUser`, `getOrders`,
  `createOrder`); каждый возвращает единый результат
  **`ApiResult<T>` = `{ data: T | null; error: string | null }`**.
- **Две взаимозаменяемые реализации** контракта:
  - `HttpApiService` — `fetch` к REST-бэкенду, проверка ответа (`unknown` + type guards);
  - `MockApiService` — отдаёт вшитые данные (`mockData.ts`) с имитацией сетевой задержки.
- **Фабрика** `apiService.ts` (composition root) выбирает реализацию по `VITE_DATA_SOURCE`
  и экспортирует её под именем `apiService`. Страницы импортируют только `apiService`
  и не знают, какой источник под капотом.

Зачем так (SOLID): страницы зависят от **абстракции**, а не от конкретного `fetch`
(*Dependency Inversion*); новый источник добавляется новой реализацией без правки страниц
(*Open/Closed*); реализации честно взаимозаменяемы — один контракт, одна форма ответа (*Liskov*).
По сути это паттерны **Стратегия** (взаимозаменяемые реализации) + **Фабрика** (выбор реализации).

**Три слоя типов товара** (см. `types/product.ts`):
- `ProductDto` — то, что *реально* приходит с сервера (например, `price` — **строка** `"390.00"`,
  т.к. это `NUMERIC` в БД); в этой же форме хранятся и моки;
- `Product` — доменная модель, с которой работает приложение (`price` уже **число**);
- `ProductWithCategoryTitle` — `Product` + название категории (собирается на клиенте для поиска).

Превращение `ProductDto → Product` (в т.ч. `Number(price)`) делает **общий маппер**
(`api/mappers.ts`) — им пользуются *обе* реализации. Так «грязь формата» заперта в одном месте,
а вся остальная логика работает с чистыми числами.


### Состояние корзины
Context API: `CartProvider` хранит товары и операции (`addToCart`, `removeFromCart`,
`updateQuantity`, `clearCart`), а компоненты читают их через хук `useCart()`. Хук бросает понятную
ошибку, если вызван вне `<CartProvider>`. Итоги заказа (скидки, доставка) считает `useOrderTotals()`.

### Заказы («Мои заказы» + оформление)
**Изменяемые** данные приложения (категории/товары/акции — статичный снимок).
- **Чтение** (`getOrders`): страница `OrdersPage` грузит заказы по типовому потоку и рендерит
  список `OrderCard`; сортировка по дате (свежие сверху) живёт в источнике данных, а не в UI.
- **Создание** (`createOrder`): кнопка «Заказать» в корзине собирает `CreateOrderPayload`
  (`items` + `total`) и вызывает контракт; результат показывается в `CheckoutModal`
  (состояния `processing` / `success` / `error`), при успехе корзина очищается.
- **Снимок (snapshot):** позиция заказа хранит `title` и `price` на момент покупки — заказ это
  исторический документ, он не пересчитывается по «живому» каталогу.
- **Хранилище в mock-режиме:** `createOrder` мутирует модульный массив `mockOrders` (имитация
  серверной БД за границей `apiService`); данные живут до перезагрузки страницы. React о них не
  знает — `OrdersPage` просто перезапрашивает их при открытии.

**Доменные слои заказа** (см. `types/order.ts`): `OrderDto`/`OrderItemDto` (с сервера: `total`,
`price` — строки, `createdAt` — ISO-строка) → `Order`/`OrderItem` (домен: числа и `Date`);
`OrderStatus` — union (`'preparing' | 'delivered' | 'cancelled'`); `CreateOrderPayload` —
отдельный «входной» тип запроса (намерение клиента ≠ готовая сущность).

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
| `orders` | `id`, `user_id` (FK), `status`, `total` (NUMERIC), `created_at` |
| `order_items` | `id`, `order_id` (FK), `product_id`, `title`, `price` (NUMERIC), `quantity` |

> Позиции заказа (`order_items`) хранят `title` и `price` как **снимок** на момент покупки,
> а не ссылку на актуальный товар — заказ это исторический документ.

**Эндпоинты API** (отдают JSON): `GET /api/categories`, `GET /api/products`,
`GET /api/products/:id`, `GET /api/promotions`, `GET /api/users/:id`,
`GET /api/users/:id/orders` (список заказов), `POST /api/users/:id/orders` (создать заказ).

Важные особенности формата (отражены в типах): `price` приходит **строкой**;
`description`, `image_name`, `avatar_file_name` могут быть `null`.

В **mock-режиме** те же данные отдаёт `src/api/mockData.ts` — это снимок БД в форме DTO
(те же поля, `price` тоже строкой), поэтому переключение источника не затрагивает остальной код.

---

## 📌 Известные упрощения

- Аутентификации нет: профиль и заказы грузятся для захардкоженного `id` (`getUser(1)`,
  `getOrders(1)`); `userId` передаётся в контракт «на вырост», но mock не фильтрует по нему.
- Адрес доставки и оплата — статичные заглушки в вёрстке; платёжной системы нет
  (новый заказ сразу получает статус `preparing`).
- В mock-режиме `total` приходит с клиента (готовый `finalPrice`); настоящий бэкенд должен
  пересчитывать сумму сам — `useOrderTotals` это React-хук и на «сервере» недоступен.
- Заказы в mock-режиме не сохраняются между перезагрузками (живут в памяти модуля).
- Задеплоенная на GitHub Pages версия работает только на моках — бэкенд в проде не развёрнут.