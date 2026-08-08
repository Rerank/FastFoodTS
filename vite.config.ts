import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig(({ command }) => ({
  // build (деплой) → подпапка репозитория; dev → корень
  base: command === 'build' ? '/FastFoodTS/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',       // вместо 'node' на бэке
    clearMocks: true,
    include: ['src/**/*.test.{ts,tsx}'],   // tsx понадобится для компонентов
    env: { TZ: 'Europe/Moscow' },
    setupFiles: ['./src/test/setup.ts'],
  }
}))