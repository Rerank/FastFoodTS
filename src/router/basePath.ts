// Базовый путь: '/' в dev, '/FastFoodTS/' в проде.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

// срезаем базовый префикс, а если ничего не осталось возвращаем '/'
export const toAppPath = (pathname: string): string =>
  (pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname) || '/';

// добавляем префикс перед pushState/href
export const toBrowserUrl = (appPath: string): string => BASE + appPath;