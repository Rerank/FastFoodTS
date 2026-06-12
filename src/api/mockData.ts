// Вшитые данные приложения (снимок боевой БД fastfood_db).
// Товары — в форме ProductDto (price строкой "390.00"), как их отдаёт сервер,
// чтобы MockApiService прогонял их через тот же маппер, что и HttpApiService.
import type { Category } from '@/types/category';
import type { ProductDto } from '@/types/product';
import type { Promotion } from '@/types/promotion';
import type { User } from '@/types/user';
import type { OrderDto } from '@/types/order';


export const mockCategories: Category[] = [
    {
        id: 1,
        slug: "pizza",
        title: "Пицца"
    },
    {
        id: 2,
        slug: "shawarma",
        title: "Шаурма"
    },
    {
        id: 3,
        slug: "burgers",
        title: "Бургеры"
    },
    {
        id: 4,
        slug: "sushi",
        title: "Суши"
    },
    {
        id: 5,
        slug: "drinks",
        title: "Напитки"
    }
];


export const mockProducts: ProductDto[] = [
    {
        id: 1,
        category_id: 1,
        title: "Маргарита",
        description: "Классическая пицца с томатным соусом, нежной моцареллой и свежим базиликом. Простой и любимый вкус для ценителей итальянской классики.",
        weight: "410 г",
        price: "390.00",
        image_name: "маргарита.webp"
    },
    {
        id: 2,
        category_id: 1,
        title: "Пепперони",
        description: "Сочная пицца с острыми ломтиками пепперони и расплавленной моцареллой. Для тех, кто любит насыщенный мясной вкус.",
        weight: "520 г",
        price: "490.00",
        image_name: "пепперони.webp"
    },
    {
        id: 3,
        category_id: 1,
        title: "Четыре сыра",
        description: "Изысканное сочетание моцареллы, пармезана, дорблю и чеддера на тонком тесте. Нежная и ароматная пицца для настоящих сырных гурманов.",
        weight: "460 г",
        price: "550.00",
        image_name: "четыре_сыра.webp"
    },
    {
        id: 4,
        category_id: 1,
        title: "Гавайская",
        description: "Сочное сочетание нежной курицы, ананаса и моцареллы под томатным соусом. Лёгкий тропический вкус, который не оставит равнодушным.",
        weight: "520 г",
        price: "470.00",
        image_name: "гавайская.webp"
    },
    {
        id: 5,
        category_id: 1,
        title: "Барбекю",
        description: "Пикантная пицца с говядиной, луком и фирменным соусом барбекю. Дымный аромат и насыщенный вкус в каждом кусочке.",
        weight: "530 г",
        price: "530.00",
        image_name: "барбекю.webp"
    },
    {
        id: 6,
        category_id: 1,
        title: "Грибная",
        description: "Ароматная пицца с шампиньонами, моцареллой и сливочным соусом. Нежный вкус для любителей грибов.",
        weight: "490 г",
        price: "420.00",
        image_name: "грибная.webp"
    },
    {
        id: 7,
        category_id: 2,
        title: "Классическая",
        description: "Сочная шаурма с курицей, свежими овощами и фирменным соусом в мягком лаваше. Сытный и любимый всеми вкус.",
        weight: "350 г",
        price: "280.00",
        image_name: "классическая.webp"
    },
    {
        id: 8,
        category_id: 2,
        title: "Мексиканская",
        description: "Острая шаурма с курицей, фасолью, кукурузой и пикантным соусом. Яркий вкус с мексиканским характером.",
        weight: "330 г",
        price: "260.00",
        image_name: "мексиканская.webp"
    },
    {
        id: 9,
        category_id: 2,
        title: "Острая",
        description: "Шаурма с курицей, овощами и жгучим перечным соусом. Для тех, кто любит погорячее.",
        weight: "360 г",
        price: "300.00",
        image_name: "острая.webp"
    },
    {
        id: 10,
        category_id: 2,
        title: "Сырная",
        description: "Нежная шаурма с курицей, расплавленным сыром и свежими овощами. Сливочный вкус в каждом кусочке.",
        weight: "340 г",
        price: "320.00",
        image_name: "сырная.webp"
    },
    {
        id: 11,
        category_id: 2,
        title: "Говяжья",
        description: "Сытная шаурма с сочной говядиной, свежими овощами и фирменным соусом. Насыщенный мясной вкус.",
        weight: "370 г",
        price: "340.00",
        image_name: "говядина.webp"
    },
    {
        id: 12,
        category_id: 2,
        title: "Овощная",
        description: "Лёгкая шаурма со свежими овощами и нежным соусом в мягком лаваше. Отличный выбор для вегетарианцев.",
        weight: "310 г",
        price: "240.00",
        image_name: "овощная.webp"
    },
    {
        id: 13,
        category_id: 3,
        title: "Чизбургер",
        description: "Сочная говяжья котлета с расплавленным чеддером, овощами и соусом в мягкой булочке. Классика, проверенная временем.",
        weight: "280 г",
        price: "250.00",
        image_name: "чизбургер.webp"
    },
    {
        id: 14,
        category_id: 3,
        title: "Двойной",
        description: "Бургер с двумя сочными котлетами, двойным сыром и свежими овощами. Для настоящего голода.",
        weight: "390 г",
        price: "390.00",
        image_name: "двойной.webp"
    },
    {
        id: 15,
        category_id: 3,
        title: "Столичный",
        description: "Бургер с куриной котлетой, свежими овощами и фирменным соусом. Сбалансированный и любимый вкус.",
        weight: "310 г",
        price: "310.00",
        image_name: "столичный.webp"
    },
    {
        id: 16,
        category_id: 3,
        title: "Вегги",
        description: "Бургер с овощной котлетой, свежими овощами и нежным соусом. Отличный выбор для вегетарианцев.",
        weight: "290 г",
        price: "270.00",
        image_name: "веган.webp"
    },
    {
        id: 17,
        category_id: 3,
        title: "С беконом",
        description: "Сочный бургер с говяжьей котлетой, хрустящим беконом и сыром. Насыщенный вкус для любителей мяса.",
        weight: "340 г",
        price: "350.00",
        image_name: "бекон.webp"
    },
    {
        id: 18,
        category_id: 3,
        title: "Рассвет",
        description: "Лёгкий бургер с куриной котлетой, яйцом и свежими овощами. Идеален для утреннего перекуса.",
        weight: "220 г",
        price: "180.00",
        image_name: "рассвет.webp"
    },
    {
        id: 19,
        category_id: 4,
        title: "Филадельфия",
        description: "Классические роллы с нежным лососем, сливочным сыром и огурцом. Любимый вкус ценителей японской кухни.",
        weight: "260 г",
        price: "460.00",
        image_name: "филадельфия.webp"
    },
    {
        id: 20,
        category_id: 4,
        title: "Калифорния",
        description: "Роллы с крабовым мясом, авокадо, огурцом и икрой тобико. Свежий и сбалансированный вкус.",
        weight: "250 г",
        price: "420.00",
        image_name: "калифорния.webp"
    },
    {
        id: 21,
        category_id: 4,
        title: "Темпура",
        description: "Хрустящие жареные роллы в кляре с начинкой из лосося и сыра. Подаются тёплыми и аппетитными.",
        weight: "270 г",
        price: "450.00",
        image_name: "темпура.webp"
    },
    {
        id: 22,
        category_id: 4,
        title: "Нью-Йорк",
        description: "Большой сет роллов с разнообразными начинками из рыбы и овощей. Идеален для компании.",
        weight: "520 г",
        price: "790.00",
        image_name: "нью_йорк.webp"
    },
    {
        id: 23,
        category_id: 4,
        title: "Осака",
        description: "Роллы с угрём, огурцом и фирменным соусом унаги. Насыщенный вкус с японским характером.",
        weight: "230 г",
        price: "390.00",
        image_name: "осака.webp"
    },
    {
        id: 24,
        category_id: 4,
        title: "Бонито",
        description: "Роллы с лососем, сливочным сыром и стружкой тунца бонито. Оригинальный вкус с лёгким копчёным ароматом.",
        weight: "240 г",
        price: "430.00",
        image_name: "бонито.webp"
    },
    {
        id: 25,
        category_id: 5,
        title: "Вода",
        description: "Чистая питьевая вода, чтобы утолить жажду. Освежает в любое время.",
        weight: "500 мл",
        price: "140.00",
        image_name: "вода.webp"
    },
    {
        id: 26,
        category_id: 5,
        title: "Черный чай",
        description: "Ароматный горячий чёрный чай классической крепости. Согревает и бодрит.",
        weight: "450 мл",
        price: "130.00",
        image_name: "черный_чай.webp"
    },
    {
        id: 27,
        category_id: 5,
        title: "Зеленый чай",
        description: "Освежающий зелёный чай с нежным травяным ароматом. Тонизирует и придаёт сил.",
        weight: "500 мл",
        price: "150.00",
        image_name: "зеленый_чай.webp"
    },
    {
        id: 28,
        category_id: 5,
        title: "Кофе",
        description: "Бодрящий свежесваренный кофе с насыщенным вкусом. Идеальное начало дня.",
        weight: "500 мл",
        price: "120.00",
        image_name: "кофе.webp"
    },
    {
        id: 29,
        category_id: 5,
        title: "Лимонад",
        description: "Освежающий домашний лимонад с яркими цитрусовыми нотками. Утоляет жажду в жаркий день.",
        weight: "300 мл",
        price: "170.00",
        image_name: "лимонад.webp"
    },
    {
        id: 30,
        category_id: 5,
        title: "Молочный коктейль",
        description: "Густой молочный коктейль с нежным сливочным вкусом. Любимое лакомство для сладкоежек.",
        weight: "500 мл",
        price: "90.00",
        image_name: "молочный_коктейль.webp"
    },
    {
        id: 31,
        category_id: 1,
        title: "Мясная",
        description: "Сытная пицца с ветчиной, беконом, колбасками и говядиной. Для тех, кто ценит по-настоящему мясное удовольствие.",
        weight: "560 г",
        price: "590.00",
        image_name: "мясная.webp"
    },
    {
        id: 32,
        category_id: 1,
        title: "Карбонара",
        description: "Пицца со сливочным соусом, беконом, яйцом и пармезаном. Вдохновлена классической итальянской пастой карбонара.",
        weight: "510 г",
        price: "540.00",
        image_name: "карбонара.webp"
    },
    {
        id: 33,
        category_id: 1,
        title: "Диабло",
        description: "Острая пицца с салями, перцем халапеньо и пикантным соусом. Жгучий вкус для любителей погорячее.",
        weight: "500 г",
        price: "520.00",
        image_name: "диабло.webp"
    },
    {
        id: 34,
        category_id: 1,
        title: "Ветчина и грибы",
        description: "Классическое сочетание сочной ветчины, шампиньонов и моцареллы. Гармоничный и проверенный временем вкус.",
        weight: "490 г",
        price: "510.00",
        image_name: "ветчина_грибы.webp"
    },
    {
        id: 35,
        category_id: 1,
        title: "Цезарь",
        description: "Пицца с курицей, листьями салата, томатами черри и соусом цезарь. Свежий и лёгкий вкус популярного салата.",
        weight: "530 г",
        price: "560.00",
        image_name: "цезарь.webp"
    },
    {
        id: 36,
        category_id: 1,
        title: "Охотничья",
        description: "Сытная пицца с охотничьими колбасками, луком и пикантным соусом. Насыщенный вкус с лёгкой остринкой.",
        weight: "550 г",
        price: "580.00",
        image_name: "охотничья.webp"
    },
    {
        id: 37,
        category_id: 2,
        title: "С бараниной",
        description: "Ароматная шаурма с сочной бараниной, овощами и восточными специями. Богатый и насыщенный вкус.",
        weight: "380 г",
        price: "360.00",
        image_name: "баранина.webp"
    },
    {
        id: 38,
        category_id: 2,
        title: "Двойная",
        description: "Большая шаурма с двойной порцией сочной курицы и свежих овощей. Для по-настоящему сильного голода.",
        weight: "430 г",
        price: "390.00",
        image_name: "двойная.webp"
    },
    {
        id: 39,
        category_id: 2,
        title: "Дачная",
        description: "Шаурма с курицей, картофелем и свежими овощами. Домашний и сытный вкус.",
        weight: "350 г",
        price: "290.00",
        image_name: "дачная.webp"
    },
    {
        id: 40,
        category_id: 2,
        title: "Деревенская",
        description: "Шаурма с курицей, картофелем по-деревенски и фирменным соусом. Сытный вкус с румяной картошкой.",
        weight: "370 г",
        price: "330.00",
        image_name: "деревенская.webp"
    },
    {
        id: 41,
        category_id: 2,
        title: "Легкая",
        description: "Нежная шаурма с курицей, свежими овощами и лёгким йогуртовым соусом. Сбалансированный вкус без лишних калорий.",
        weight: "250 г",
        price: "210.00",
        image_name: "легкая.webp"
    },
    {
        id: 42,
        category_id: 2,
        title: "Ассорти",
        description: "Шаурма с миксом мяса, свежими овощами и фирменным соусом. Богатый вкус для тех, кто не может выбрать.",
        weight: "400 г",
        price: "380.00",
        image_name: "ассорти.webp"
    },
    {
        id: 43,
        category_id: 3,
        title: "Фермерский",
        description: "Бургер с говяжьей котлетой, свежими овощами и фермерским соусом. Натуральный и сытный вкус.",
        weight: "300 г",
        price: "290.00",
        image_name: "фермерский.webp"
    },
    {
        id: 44,
        category_id: 3,
        title: "Викинг",
        description: "Большой бургер с двойной котлетой, беконом, сыром и луковыми кольцами. Брутальный вкус для настоящих воинов.",
        weight: "420 г",
        price: "430.00",
        image_name: "викинг.webp"
    },
    {
        id: 45,
        category_id: 3,
        title: "Фишбургер",
        description: "Бургер с нежным рыбным филе, свежими овощами и соусом тартар. Лёгкий вкус с морскими нотками.",
        weight: "330 г",
        price: "340.00",
        image_name: "фишбургер.webp"
    },
    {
        id: 46,
        category_id: 3,
        title: "Охотничий",
        description: "Сочный бургер с говядиной, охотничьими колбасками и пикантным соусом. Насыщенный вкус с дымком.",
        weight: "320 г",
        price: "330.00",
        image_name: "охотничий.webp"
    },
    {
        id: 47,
        category_id: 3,
        title: "Походный",
        description: "Сытный бургер с двойной котлетой, беконом, сыром и овощами. Заряд энергии для долгого дня.",
        weight: "410 г",
        price: "450.00",
        image_name: "походный.webp"
    },
    {
        id: 48,
        category_id: 3,
        title: "Императорский",
        description: "Небольшой бургер с сочной котлетой, сыром и свежими овощами. Идеальный размер для лёгкого перекуса.",
        weight: "190 г",
        price: "190.00",
        image_name: "императорский.webp"
    },
    {
        id: 49,
        category_id: 4,
        title: "Вулкан",
        description: "Запечённые роллы с морепродуктами под пикантным соусом. Тёплые и острые — настоящий взрыв вкуса.",
        weight: "280 г",
        price: "520.00",
        image_name: "вулкан.webp"
    },
    {
        id: 50,
        category_id: 4,
        title: "Аляска",
        description: "Роллы с лососем, авокадо и сливочным сыром. Нежный и сбалансированный вкус.",
        weight: "260 г",
        price: "440.00",
        image_name: "аляска.webp"
    },
    {
        id: 51,
        category_id: 4,
        title: "Чука",
        description: "Роллы с пикантным салатом чука и кунжутным соусом. Лёгкий вегетарианский вариант.",
        weight: "250 г",
        price: "410.00",
        image_name: "чука.webp"
    },
    {
        id: 52,
        category_id: 4,
        title: "Унаги",
        description: "Роллы с нежным копчёным угрём, огурцом и соусом унаги. Богатый и насыщенный вкус.",
        weight: "290 г",
        price: "480.00",
        image_name: "унаги.webp"
    },
    {
        id: 53,
        category_id: 4,
        title: "Сакура",
        description: "Нежные роллы с лососем и сливочным сыром в розовой соевой бумаге. Изящный вкус и красивая подача.",
        weight: "220 г",
        price: "320.00",
        image_name: "сакура.webp"
    },
    {
        id: 54,
        category_id: 4,
        title: "Самурай",
        description: "Огромный сет из разнообразных роллов для большой компании. Настоящее японское пиршество.",
        weight: "980 г",
        price: "1290.00",
        image_name: "самурай.webp"
    },
    {
        id: 55,
        category_id: 5,
        title: "Кола",
        description: "Классическая охлаждённая кола с бодрящими пузырьками. Освежает и придаёт энергии.",
        weight: "400 мл",
        price: "190.00",
        image_name: "кола.webp"
    },
    {
        id: 56,
        category_id: 5,
        title: "Апельсиновый фреш",
        description: "Свежевыжатый сок из спелых апельсинов. Заряд витаминов и яркого вкуса.",
        weight: "300 мл",
        price: "220.00",
        image_name: "апельсиновый_сок.webp"
    },
    {
        id: 57,
        category_id: 5,
        title: "Морс",
        description: "Освежающий ягодный морс с натуральным вкусом. Утоляет жажду и поднимает настроение.",
        weight: "500 мл",
        price: "150.00",
        image_name: "морс.webp"
    },
    {
        id: 58,
        category_id: 5,
        title: "Киви Фейхоа",
        description: "Освежающий напиток с яркими нотками киви и фейхоа. Необычный и тонизирующий вкус.",
        weight: "450 мл",
        price: "180.00",
        image_name: "киви_фейхоа.webp"
    },
    {
        id: 59,
        category_id: 5,
        title: "Энергетик",
        description: "Бодрящий энергетический напиток для заряда сил. Поможет оставаться на ходу весь день.",
        weight: "500 мл",
        price: "100.00",
        image_name: "энергетик.webp"
    },
    {
        id: 60,
        category_id: 5,
        title: "Мохито",
        description: "Освежающий безалкогольный мохито с мятой и лаймом. Идеален для жаркого дня.",
        weight: "300 мл",
        price: "200.00",
        image_name: "мохито.webp"
    }
];

export const mockPromotions: Promotion[] = [
    {
        id: 1,
        type: "hot",
        label: "Акция",
        title: "Скидка 30%",
        description: "При заказе полного комбо",
        image_name: "offer.webp"
    },
    {
        id: 2,
        type: "combo",
        label: "Выгодно",
        title: "2 за 1",
        description: "Вторая пицца в подарок",
        image_name: "2in1.webp"
    },
    {
        id: 3,
        type: "delivery",
        label: "Доставка",
        title: "0 ₽",
        description: "При заказе от 1000 ₽",
        image_name: "free_delivery.webp"
    }
];

export const mockUsers: User[] = [
    {
        id: 1,
        name: "Иван Петров",
        phone: "+7 (999) 123-45-67",
        avatar_file_name: "avatar.webp"
    }
];

export const mockOrders: OrderDto[] = [
    {
        id: 1038,
        status: 'delivered',
        total: '1120.00',
        createdAt: '2026-06-08T16:05:00.000Z',
        items: [{
            productId: 2,
            title: 'Пепперони',
            quantity: 2,
            price: '490.00'
        },
        {
            productId: 55,
            title: 'Кола',
            quantity: 2,
            price: '190.00'
        }
    ]
        
    },
    {
        id: 1027,
        status: 'cancelled',
        total: '780.00',
        createdAt: '2026-06-01T10:20:00.000Z',
        items: [{
            productId: 25,
            title: 'Вода',
            quantity: 2,
            price: '140.00'
        },
        {
            productId: 13,
            title: 'Чизбургер',
            quantity: 1,
            price: '250.00'
        }
    ]
        
    }
]
