import { test, expect } from './setup'

test.describe('Transactions', () => {
  test.beforeEach(async ({ page }) => {
    // Listen to console messages
    page.on('console', msg => {
      console.log('PAGE CONSOLE:', msg.text())
    })

    page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message)
    })

    // Clear localStorage and login
    console.log('Clearing storage and starting login...')
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    console.log('Navigating to signin page...')
    await page.goto('/auth/signin')
    console.log('Waiting for network idle...')
    await page.waitForLoadState('networkidle')
    console.log('Waiting for email input...')
    await page.waitForSelector('input#email', { timeout: 15000 })
    console.log('Filling credentials...')
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')
    console.log('Clicking sign in button...')
    await page.click('button:has-text("Sign In")')
    console.log('Waiting for dashboard URL...')
    await page.waitForURL('**/dashboard', { timeout: 15000 })
    console.log('Login successful, on dashboard')

    // Ensure we're on the transactions page for transaction tests
    if (!page.url().includes('/transactions')) {
      console.log('Navigating to transactions page...')
      await page.click('text=Transactions')
      await page.waitForSelector('h1:has-text("Transactions")', { timeout: 10000 })
    }

    // Force close any open dropdowns by clicking the backdrop if it exists
    const backdrop = page.locator('.fixed.inset-0.z-40')
    if (await backdrop.count() > 0) {
      console.log('Found backdrop, clicking to close dropdown...')
      await backdrop.click()
      await page.waitForTimeout(500)
    }

    console.log('Dropdowns should be closed now')
  })

  test('should create a new transaction', async ({ page }) => {
    console.log('Starting create transaction test...')
    // Navigate to transactions page (tab navigation)
    console.log('Clicking Transactions tab...')
    await page.click('text=Transactions')
    console.log('Waiting for Transactions page header...')
    await page.waitForSelector('h1:has-text("Transactions")', { timeout: 10000 })
    console.log('Transactions page loaded')

    // Click add transaction button (force click to bypass backdrop)
    console.log('Clicking Add Transaction button...')
    await page.locator('button:has-text("Add Transaction")').click({ force: true })

    // Wait for modal to appear
    console.log('Waiting for transaction modal...')
    await page.waitForSelector('input[name="amount"]', { timeout: 10000 })
    console.log('Transaction modal appeared')

    // Fill transaction form
    console.log('Filling transaction form...')
    await page.selectOption('select[name="type"]', 'expense')
    await page.fill('input[name="amount"]', '50')
    await page.selectOption('select[name="category"]', '🍔 Food')
    await page.fill('textarea[name="description"]', 'Test transaction from E2E test')

    // Submit form
    console.log('Submitting transaction...')
    await page.locator('button:has-text("Add Transaction")').last().click()

    // Wait for modal to close and check if transaction appears
    console.log('Waiting for response...')
    await page.waitForTimeout(2000) // Wait for API call and re-render

    // Should see the new transaction in the list (check for the category since description isn't shown)
    console.log('Checking for new transaction...')
    await expect(page.getByText('Food')).toBeVisible()
    console.log('Create transaction test completed successfully')
  })

  test('should validate required fields', async ({ page }) => {
    console.log('Starting validate required fields test...')
    // Navigate to transactions page
    console.log('Navigating to transactions page...')
    await page.click('text=Transactions')
    await page.waitForSelector('h1:has-text("Transactions")', { timeout: 10000 })
    console.log('Transactions page loaded')

    // Force close any open dropdowns using page.evaluate
    console.log('Force closing any open dropdowns...')
    await page.evaluate(() => {
      // Find and click any backdrop elements
      const backdrops = document.querySelectorAll('.fixed.inset-0.z-40');
      backdrops.forEach(backdrop => {
        (backdrop as HTMLElement).click();
      });
    });
    await page.waitForTimeout(500);

    // Close any open modals first
    const closeButtons = page.locator('button[aria-label="Close"], button:has(svg)').filter({ hasText: '' })
    if (await closeButtons.count() > 0) {
      console.log('Closing open modals...')
      await closeButtons.first().click()
      await page.waitForTimeout(500)
    }

    // Click add transaction button (use dispatchEvent to ensure onClick fires)
    console.log('Clicking Add Transaction button...')
    const addButton = page.locator('button:has-text("Add Transaction")')
    await addButton.dispatchEvent('click')

    // Wait for modal to appear
    await page.waitForSelector('input[name="amount"]', { timeout: 10000 })

    // Check that submit button is disabled when required fields are not filled
    const submitButton = page.locator('button:has-text("Add Transaction")').last()
    await expect(submitButton).toBeDisabled()

    // Should still be on the modal
    await expect(page.locator('input[name="amount"]')).toBeVisible()
  })

  test('should export transactions', async ({ page }) => {
    // Navigate to transactions page
    await page.click('text=Transactions')
    await page.waitForSelector('h1:has-text("Transactions")', { timeout: 10000 })

    // Look for export button
    const exportButton = page.locator('button:has-text("Export CSV")')
    await expect(exportButton).toBeVisible()

    // Verify the button is enabled
    await expect(exportButton).toBeEnabled()
  })
})