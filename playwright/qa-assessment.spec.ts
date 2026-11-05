import { test, expect } from '@playwright/test';

test('login to QA Interview', async ({ page }) => {
  
  //Open Page
  await page.goto('https://qainterview.netlify.app/');
  
  //Fill in User and Password
  await page.locator('#loginForm').getByPlaceholder('Email Address').fill('Steven1337')
  await page.locator('#loginForm').getByPlaceholder('Password').fill('Abcd1234!')

  //Click Login
  await page.locator('#loginForm').getByRole('button', { name: 'Login' }).click();

  // Success checking
  await expect(page).toHaveURL(/dashboard/, {timeout: 15_000});
  await expect(page.locator('#greeting')).toHaveText('Hi Steven1337!');
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Stock Market Dashboard'})).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Watchlist' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Stock Details' })).toBeVisible();
  await expect(page.getByPlaceholder('Search for stocks...')).toBeVisible();

  const table = page.locator('#stock-table');
  await expect(table.getByRole('columnheader', { name: 'Stock Name' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Price' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Change' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Actions' })).toBeVisible();
  await expect(table.getByRole('row', { name: /Apple Inc\./ })).toBeVisible();
});