import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Keep tests hermetic: no real GitHub calls.
  await page.route('https://api.github.com/**', (r) => r.fulfill({ json: [] }));
});

const trackErrors = (page: Page) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
};

test('home renders every stop with no errors or sideways scroll', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Muhammad Usman — Software Engineer/);
  await expect(page.getByRole('heading', { level: 1, name: 'Muhammad Usman' })).toBeVisible();
  for (const name of ['AI Teammates', 'ClarityHero', 'Dialpad → Quickbase', 'Roofing ops platform', 'Hirrd', 'BS Computer Science, FAST NUCES'])
    await expect(page.getByRole('heading', { level: 3, name })).toBeAttached();
  await expect(page.getByText('No public pushes lately')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  expect(errors).toEqual([]);
});

test('theme follows the system, live; the toggle lasts one visit', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(html).not.toHaveClass(/dark/);
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  await expect(html).toHaveClass(/dark/);
  await page.reload();
  await expect(html).not.toHaveClass(/dark/);
});

test('timeline card opens the case study; Esc closes it', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Illustration of Dialpad/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Dialpad → Quickbase' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('Field mapping between the two data models.')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('bio link opens its case study and Buddy comments', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'AI briefing pipelines' }).click();
  await expect(page.getByRole('dialog', { name: 'ClarityHero' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  await page.getByRole('button', { name: 'Say hi' }).click();
  await expect(page.locator('.hero-buddy .bubble')).toHaveText('hi! hire usman?');
});
