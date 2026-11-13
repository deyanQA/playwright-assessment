import { test, expect } from '@playwright/test';
import { waitForLoading } from '../helpers/loading';

test.beforeEach(async ({ page }) => {
  await page.goto('/welcome');
  await waitForLoading(page);
});

test('Rename the "cat" pet type to "rabbit" and back', async ({ page }) => {
  const firstPetRow = page.getByRole('row')
    .filter({ has: page.getByRole('textbox') })
    .first();
  const nameInput = page.getByRole('textbox');
  const updateButton = page.getByRole('button', { name: 'Update', exact: true });
  const editHeading = page.getByRole('heading', { name: 'Edit Pet Type', exact: true });

  await page.getByRole('link', { name: 'Pet Types', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Pet Types', exact: true })).toBeVisible();

  await expect(firstPetRow.getByRole('textbox')).toHaveValue('cat');
  await firstPetRow.getByRole('button', { name: 'Edit', exact: true }).click();
  await expect(editHeading).toBeVisible();

  await expect(nameInput).toHaveValue('cat');
  await nameInput.fill('rabbit');
  await updateButton.click();
  await expect(firstPetRow.getByRole('textbox')).toHaveValue('rabbit');

  await firstPetRow.getByRole('button', { name: 'Edit', exact: true }).click();
  await expect(editHeading).toBeVisible();
  await expect(nameInput).toHaveValue('rabbit');
  await nameInput.fill('cat');
  await updateButton.click();
  await expect(firstPetRow.getByRole('textbox')).toHaveValue('cat');
});
