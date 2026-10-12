import { expect, test } from '@playwright/test';

const SECTIONS = ['home', 'about', 'experience', 'projects', 'skills', 'ship', 'now', 'contact'];

test.beforeEach(async ({ page }) => {
  // Keep tests hermetic: no real GitHub calls, and fail loudly if anything tries to email.
  await page.route('https://api.github.com/**', (r) => r.fulfill({ json: [] }));
  await page.route('https://api.emailjs.com/**', (r) => r.abort());
});

test('loads with day-mode NYC defaults, every station and no errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/');
  await expect(page).toHaveTitle(/Muhammad Usman — Software Engineer/);
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'nyc');
  for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached();
  expect(errors).toEqual([]);
});

test('theme picker switches line and remembers it', async ({ page }) => {
  await page.goto('/');
  await page.getByTitle('Choose your line').click();
  await page.getByRole('radio', { name: /London Underground/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'london');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'london');
});

test('night switch toggles and persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('switch', { name: 'Night service' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('ticket machine opens with Ctrl+K and jumps to a station', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard shortcut is a desktop feature');
  await page.goto('/');
  const menu = page.getByRole('dialog', { name: 'Ticket machine' });
  // The shortcut listener attaches after React mounts; retry until the menu opens.
  await expect(async () => {
    if (!(await menu.isVisible())) await page.keyboard.press('Control+k');
    await expect(menu).toBeVisible({ timeout: 1500 });
  }).toPass({ timeout: 10_000 });
  await page.getByRole('combobox', { name: 'Search actions' }).fill('terminus');
  await page.keyboard.press('Enter');
  await expect(menu).toBeHidden();
  await expect.poll(async () => (await page.locator('#contact').boundingBox())?.y ?? 9999).toBeLessThan(200);
});

test('line map stop links to where the skill was used', async ({ page }) => {
  await page.goto('/');
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await page.locator('#skills').getByRole('button', { name: 'Inngest' }).click();
  await expect(page.locator('#skills').getByRole('button', { name: /ClarityHero/ })).toBeVisible();
});

test('build notes open and close with Escape', async ({ page }) => {
  await page.goto('/');
  await page.locator('#ticket-clarityhero').getByRole('button', { name: /build notes/i }).click();
  const notes = page.getByRole('dialog', { name: 'ClarityHero build notes' });
  await expect(notes).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(notes).toBeHidden();
});

test('contact form: required fields block empty submit; honeypot never emails', async ({ page }) => {
  let emailed = false;
  page.on('request', (r) => r.url().includes('emailjs.com') && (emailed = true));
  await page.goto('/');
  const form = page.locator('#contact form');
  await form.scrollIntoViewIfNeeded();

  await form.getByRole('button', { name: /send message/i }).click();
  await expect(form.locator('input[name="name"]:invalid')).toHaveCount(1);
  await expect(form.getByRole('status')).toHaveCount(0);

  await form.locator('input[name="name"]').fill('Spam Bot');
  await form.locator('input[name="email"]').fill('bot@example.com');
  await form.locator('textarea[name="message"]').fill('Buy cheap followers now!!!');
  await form.locator('input[name="website"]').fill('http://spam.example', { force: true });
  await form.getByRole('button', { name: /send message/i }).click();
  await expect(form.getByRole('status')).toContainText('Delivered');
  expect(emailed).toBe(false);
});

test('unknown pages get the Wrong platform 404', async ({ page }) => {
  // vite preview falls back to index.html for unknown routes, so load the file Vercel serves.
  await page.goto('/404.html');
  await expect(page.getByRole('heading', { name: /Wrong\s*platform/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Back to Departure/ })).toHaveAttribute('href', '/');
});
