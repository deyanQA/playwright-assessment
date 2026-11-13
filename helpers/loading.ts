import { expect, type Page } from '@playwright/test';

/* The app can take longer than the default 5s to load data, so allow up to 30s */
export async function waitForLoading(page: Page) {
  await expect(page.locator('app-loading-spinner .overlay'))
    .toBeHidden({ timeout: 30_000 });
}
