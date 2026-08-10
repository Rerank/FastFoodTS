import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  use: {
    baseURL: 'http://localhost:5173',   // относительные пути в page.goto('/')
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,          // не поднимать заново, если сервер уже запущен
    env: { VITE_DATA_SOURCE: 'mock' },  // не полагаемся на .env — он не в git
  },
});