import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Home page is opened and Welcome message is displayed', async ({page}) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
});

test('Home page to have subtitle "Welcome" displayed', async ({page}) => {
  await expect(page.locator('.container.xd-container')).toHaveText('Welcome')
})

test('Home page to have the pets image visible', async ({page}) => {
  await expect(page.getByAltText('pets logo')).toBeVisible()
})