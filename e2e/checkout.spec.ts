import { test, expect } from '@playwright/test';

test('оформление заказа приводит к появлению его в списке заказов', async ({ page }) => {
    // 1. Собираем корзину
    await page.goto('/');
    await page.getByRole('button', { name: 'Добавить Маргарита в корзину' }).click();
    await page.getByRole('link', { name: 'Корзина' }).click();

    // 2. Оформляем
    await page.getByRole('button', { name: 'Заказать' }).click();

    // 3. Ждём подтверждения
    await expect(page.getByText('Заказ создан')).toBeVisible();

    // 4. Переходим к заказам из модалки
    await page.getByRole('button', { name: 'Посмотреть заказы' }).click();

    // 5. Проверяем, что заказ на месте
    await expect(page).toHaveURL('/orders');
    await expect(page.getByRole('heading', { name: 'Заказ №1039' })).toBeVisible();
});