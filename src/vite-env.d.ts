/// <reference types="vite/client" />

// Расширяем (declaration merging) встроенный тип import.meta.env своими переменными. Благодаря этому import.meta.env.VITE_API_BASE_URL имеет тип string, а не any.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
