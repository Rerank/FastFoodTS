# 🔄 План миграции FastFood: JavaScript → TypeScript

Живой документ. Обновляется по мере продвижения. Формат: учитель — ученик.

## 🎯 Контекст

Переписываем учебный React-проект (заказ еды, SPA) с JS на TS.
Исходники легаси лежат в `temp/legacy/` (в `.gitignore`). Бэкенд (`backend/`, PHP+MySQL)
перенесён из легаси **как есть** и не мигрируется — это «клей», чтобы фронт работал.

---

## 🧭 Главные принципы миграции

1. **Идём по графу зависимостей, от листьев к корню.** Сначала то, что ни от чего не
   зависит (типы → утилиты → api → инфраструктура → компоненты → страницы → App).
   Иначе пришлось бы затыкать дыры через `any`.
2. **Тип — это утверждение о рантайме.** Компилятор не видит сервер и верит нам на слово.
   Источники истины: для **типа значений** — живой ответ API; для **NULL-допустимости** —
   схема БД (выборка показывает лишь текущие данные, а не то, что поле *может* быть `null`).
3. **Описываем только используемые поля.** Благодаря структурной типизации лишние поля
   в ответе не мешают. Минимум кода, тип выражает намерение (YAGNI).
4. **Граница «провод → приложение».** Там, где форма ответа сервера расходится с тем, что
   удобно фронту, заводим два типа: `XxxDto` (как на проводе) + `Xxx` (доменная модель) и
   маппер между ними в api-слое. Где расхождений нет — один тип.

---

## ✅ Зафиксированные решения

| Решение | Обоснование |
|---|---|
| Включён `"strict": true` | Без него (`noImplicitAny`, `strictNullChecks`) TS почти бесполезен для учёбы. |
| Имена полей оставляем в `snake_case` | Бэкенд неприкосновенен и шлёт `snake_case`. Переименование в camelCase = лишний маппинг и переписывание всех компонентов. |
| `Product` имеет DTO + домен | `price` приходит строкой (`"390.00"`, т.к. `DECIMAL`), а фронту нужно число. |
| `Category`, `Promotion`, `User` — один тип | Расхождений «провод↔фронт» нет. |
| `promo.type` → `string`, не литеральный union | Набор открыт (бэкенд может добавить тип), значение лишь подставляется в CSS-класс (мягкая деградация). |
| `avatar_file_name: string \| null` | По контракту БД бывает `null`. `\| null` (значение пустое), а не `?` (ключ отсутствует). |
| Алиас `@ → src` в `tsconfig.app.json` (`paths`), `jsconfig.json` удалён | Vite и `tsc` — две независимые системы, обе должны знать алиас. В TS 6+ `paths` без `baseUrl`, цель относительная: `["./src/*"]`. |
| `description` и `image_name` → `string \| null` в `ProductDto` и `Promotion` | Колонки в БД `NULL`-able → `SELECT *` может вернуть `null`. В `Product` протекает автоматически через `Omit`. |

---

## 🐞 Скрытые баги легаси (поймает TS при миграции)

- **`useOrderTotals.js`** — `item.price * item.quantity`: строка участвует в умножении,
  «работает» только из-за неявного приведения JS. TS заставит сделать `Number(...)`.
- **`ProfilePage.jsx:45`** — `avatar_file_name` подставляется в URL без проверки на `null`
  (`.../null` → битая картинка). `strictNullChecks` заставит обработать. То же с `image_name`
  товаров/промо (`null` → битая картинка). Возможное решение — дефолт в маппере (фаза 4).
- **`MenuPage.jsx:44`** — фронт дополняет товар полем `category_title`, которого нет в API.
  Понадобится расширенный тип при миграции `MenuPage`.

---

## 📋 Реальные формы ответов API (проверено на живых данных)

```
GET categories.php → [{ id:1, slug:"pizza", title:"Пицца", sort_order:10, is_active:1, created_at:"..." }]
GET products.php   → [{ id:1, category_id:1, title, description, weight:"410 г", price:"390.00", image_name, is_active:1, created_at }]
GET promotions.php → [{ id:1, type:"hot", label, title, description, image_name, is_active:1, created_at }]
GET user.php?id=1  → { id:1, name, phone:"+7 (...)", avatar_file_name:"avatar.webp"|null, created_at }
```
Заметки: числа приходят числами; `price` — **строка**; `is_active` — **число** `0/1`, не boolean.

---

## 🗺 Этапы

- [x] **Фаза 1. Фундамент.** Проверены `tsconfig`, включён `strict`. ✅
- [x] **Фаза 2. Типы предметной области** (`src/types/`). ✅
  - [x] `category.ts` — `Category`
  - [x] `product.ts` — `ProductDto` + `Product` (через `Omit`)
  - [x] `promotion.ts` — `Promotion`
  - [x] `user.ts` — `User`
- [~] **Фаза 3. Чистые утилиты и константы.**
  - [x] `constants.ts` — вывод типов (inference), `as const` на `ACTIVE_PROMOTIONS`
  - [x] `formatters.ts` — `formatPrice(price: number): string`, убран лишний `parseFloat`
  - [ ] `useDragToScroll`, `useOrderTotals` — React-хуки, отложены на фазу 7 (вместе с компонентами)
- [x] **Фаза 4. API-слой** (`apiService.ts`). ✅
  - [x] `ApiResult<T>` — дженерик-тип результата
  - [x] `isObject` (type guard), `Array.isArray` как встроенный guard
  - [x] `fetchWithErrorHandling<T>` — дженерик-функция, `unknown` + `as T` на границе
  - [x] `mapProductToDomain` — маппер `ProductDto → Product` (`Number(price)`)
  - [x] методы `apiService` (`get*`) с явными тип-аргументами и `import type`
  - [x] исправлен `API_BASE_URL` (`fastfood` → `fastfoodTS`)
- [ ] **Фаза 5. Инфраструктура UI** — `router/` (`Router`, `navigate`, `Link`), затем `BottomNav`.
- [ ] **Фаза 6. Контекст корзины** — `CartProvider`, `useCart`.
- [ ] **Фаза 7. Компоненты и страницы** (снизу вверх) — мелкие → секции → страницы → `App`.

---

## 📚 Освоенные темы TypeScript

- `interface` и описание формы объекта
- Структурная («утиная») типизация; лишние поля допустимы
- Union-типы (`string | null`) и когда они уместны (реальная вариативность, не неуверенность)
- Литеральные типы и когда их НЕ применять (открытый набор извне)
- `null` vs `undefined`, `| null` vs `?`, роль `strictNullChecks`
- Утилитные типы: `Omit<T, K>` = `Pick<T, Exclude<keyof T, K>>`, `keyof`, `extends` для интерфейсов
- Дженерики: у типов (`ApiResult<T>`) и у функций (`fetchWithErrorHandling<T>`, вывод `T` в `.map`)
- Type guards и предикаты типа (`data is ...`), сужение типа; `typeof` как встроенный guard
- Стирание типов в рантайме; `import type`; `any` vs `unknown` vs `as` (точка доверия на границе)
- `Promise<T>` и распаковка через `await` (две обёртки: Promise → ApiResult → data)
- Два мира — типы vs значения (Omit vs spread, конфликт `extends` vs «последний побеждает»)
- Стрелочные функции: блочное `=> {}` vs краткое `=> ({})` тело; point-free стиль в `.map`
