import { test, expect } from '@playwright/test';

test('главная страница загружается и показывает товары', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Маргарита')).toBeVisible();
});