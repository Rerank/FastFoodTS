import { test, expect } from '@playwright/test';

test('товар из меню попадает в корзину', async ({ page }) => {
  // 1. Открываем меню
  await page.goto('/');

  // 2. Добавляем товар — кнопка ищется по aria-label
  await page.getByRole('button', { name: 'Добавить Маргарита в корзину' }).click();

  // 3. Переходим в корзину через нижнюю навигацию
  await page.getByRole('link', { name: 'Корзина' }).click();

  // 4. Проверяем, что товар на месте
  await expect(page.getByText('Маргарита')).toBeVisible();

  // 5. Проверяем итоговую сумму
  await expect(page.getByRole('group', { name: 'Итого к оплате' })).toContainText('640 ₽');
});