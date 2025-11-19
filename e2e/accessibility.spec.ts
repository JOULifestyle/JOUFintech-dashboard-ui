import { test, expect } from './setup'

test.describe('Accessibility', () => {
  test('login page should have proper form structure', async ({ page }) => {
    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })

    // Check for proper form structure
    const emailInput = page.locator('input#email')
    const passwordInput = page.locator('input#password')
    const submitButton = page.locator('button:has-text("Sign In")')

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()

    // Check labels
    await expect(page.locator('label[for="email"]')).toBeVisible()
    await expect(page.locator('label[for="password"]')).toBeVisible()
  })

  test('dashboard should have proper heading structure', async ({ page }) => {
    // Login first
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    await page.click('button:has-text("Sign In")')
    await page.waitForURL('**/dashboard', { timeout: 15000 })

    // Check for proper heading hierarchy
    const h1 = page.locator('h1').first()
    const h3 = page.locator('h3').first()

    await expect(h1).toBeVisible()
    await expect(h3).toBeVisible()
  })

  test('keyboard navigation should work on dashboard', async ({ page }) => {
    // Login first
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    await page.click('button:has-text("Sign In")')
    await page.waitForURL('**/dashboard', { timeout: 15000 })

    // Test tab navigation
    await page.keyboard.press('Tab')
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('buttons should have accessible names', async ({ page }) => {
    // Login first
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    await page.click('button:has-text("Sign In")')
    await page.waitForURL('**/dashboard', { timeout: 15000 })

    // Force close any open dropdowns that might interfere
    const backdrop = page.locator('.fixed.inset-0.z-40')
    if (await backdrop.count() > 0) {
      await backdrop.click()
      await page.waitForTimeout(500)
    }

    // Check that buttons have accessible names
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < Math.min(buttonCount, 10); i++) { // Check first 10 buttons
      const button = buttons.nth(i)
      const accessibleName = await button.getAttribute('aria-label') ||
                            await button.textContent() ||
                            await button.getAttribute('title')
      expect(accessibleName?.trim()).toBeTruthy()
    }
  })

  test('images should have alt text', async ({ page }) => {
    // Login first
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    await page.click('button:has-text("Sign In")')
    await page.waitForURL('**/dashboard', { timeout: 15000 })

    // Check images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('dashboard should pass axe-core accessibility checks', async ({ page }) => {
    // Login first
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    await page.click('button:has-text("Sign In")')
    await page.waitForURL('**/dashboard', { timeout: 15000 })

    // Inject axe-core
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js' })

    // Run axe-core accessibility checks
    const results = await page.evaluate(async () => {
      const axeResults = await (window as any).axe.run()
      return axeResults
    })

    // Check for violations
    expect(results.violations).toHaveLength(0)
  })

  test('wallets page should pass axe-core accessibility checks', async ({ page }) => {
    // Login first
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    await page.click('button:has-text("Sign In")')
    await page.waitForURL('**/dashboard', { timeout: 15000 })

    // Navigate to wallets page
    await page.click('text=Wallets')
    await page.waitForSelector('h1:has-text("Wallets")', { timeout: 10000 })

    // Inject axe-core
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js' })

    // Run axe-core accessibility checks
    const results = await page.evaluate(async () => {
      const axeResults = await (window as any).axe.run()
      return axeResults
    })

    // Check for violations
    expect(results.violations).toHaveLength(0)
  })

  test('transactions page should pass axe-core accessibility checks', async ({ page }) => {
    // Login first
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/auth/signin')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    await page.click('button:has-text("Sign In")')
    await page.waitForURL('**/dashboard', { timeout: 15000 })

    // Navigate to transactions page
    await page.click('text=Transactions')
    await page.waitForSelector('h1:has-text("Transactions")', { timeout: 10000 })

    // Inject axe-core
    await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.2/axe.min.js' })

    // Run axe-core accessibility checks
    const results = await page.evaluate(async () => {
      const axeResults = await (window as any).axe.run()
      return axeResults
    })

    // Check for violations
    expect(results.violations).toHaveLength(0)
  })
})