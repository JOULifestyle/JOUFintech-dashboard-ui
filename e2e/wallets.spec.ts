import { test, expect } from './setup'

test.describe('Wallets', () => {
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

    // Ensure we're on the wallets page for wallet tests
    if (!page.url().includes('/wallets')) {
      console.log('Navigating to wallets page...')
      await page.click('text=Wallets')
      await page.waitForSelector('h1:has-text("Wallets")', { timeout: 10000 })
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

  test('should transfer money between wallets', async ({ page }) => {
    console.log('Starting transfer test...')
    // Navigate to wallets page
    console.log('Clicking Wallets tab...')
    await page.click('text=Wallets')
    console.log('Waiting for Wallets page header...')
    await page.waitForSelector('h1:has-text("Wallets")', { timeout: 10000 })
    console.log('Wallets page loaded')

    // Close any open modals first
    const closeButtons = page.locator('button[aria-label="Close"], button:has(svg)').filter({ hasText: '' })
    if (await closeButtons.count() > 0) {
      console.log('Closing open modals...')
      await closeButtons.first().click()
      await page.waitForTimeout(500)
    }

    // Click transfer funds button (dispatch event to ensure onClick fires)
    console.log('Clicking Transfer Funds button...')
    const transferButton = page.locator('button:has-text("Transfer Funds")')
    await transferButton.dispatchEvent('click')

    // Wait for modal to appear
    console.log('Waiting for transfer modal...')
    await page.waitForSelector('select', { timeout: 10000 })
    console.log('Transfer modal appeared')

    // Fill transfer form - select Main Account as from and Savings as to
    const selects = page.locator('select')
    console.log('Selecting wallets...')
    await selects.nth(0).selectOption('main')
    await selects.nth(1).selectOption('savings')
    console.log('Filling amount...')
    await page.fill('input[type="number"]', '100')

    // Submit transfer (use the last Transfer Funds button - the modal one)
    console.log('Submitting transfer...')
    await page.locator('button:has-text("Transfer Funds")').last().click()

    // Wait for modal to close and check for success message
    console.log('Waiting for response...')
    await page.waitForTimeout(2000)

    // Should show success message (toast notification)
    console.log('Checking for success message...')
    await expect(page.getByText(/Transfer successful/i)).toBeVisible()
    console.log('Transfer test completed successfully')
  })

  test('should prevent transfer with insufficient funds', async ({ page }) => {
    console.log('Starting insufficient funds test...')
    // Navigate to wallets page
    console.log('Clicking Wallets tab...')
    await page.click('text=Wallets')
    await page.waitForSelector('h1:has-text("Wallets")', { timeout: 10000 })
    console.log('Wallets page loaded')

    // Close any open modals first
    const closeButtons = page.locator('button[aria-label="Close"], button:has(svg)').filter({ hasText: '' })
    if (await closeButtons.count() > 0) {
      console.log('Closing open modals...')
      await closeButtons.first().click()
      await page.waitForTimeout(500)
    }

    // Click transfer funds button
    console.log('Clicking Transfer Funds button...')
    const transferButton = page.locator('button:has-text("Transfer Funds")')
    await transferButton.dispatchEvent('click')

    // Wait for modal to appear
    console.log('Waiting for transfer modal...')
    await page.waitForSelector('select', { timeout: 10000 })
    console.log('Transfer modal appeared')

    // Try to transfer more than available balance
    const selects = page.locator('select')
    console.log('Selecting wallets...')
    await selects.nth(0).selectOption('savings')
    await selects.nth(1).selectOption('main')
    console.log('Filling large amount...')
    await page.fill('input[type="number"]', '10000') // More than savings balance

    // Submit transfer
    console.log('Submitting transfer...')
    await page.locator('button:has-text("Transfer Funds")').last().click()

    // Should show error message in modal
    console.log('Checking for error message...')
    await expect(page.getByText(/Insufficient balance/i)).toBeVisible()
    console.log('Insufficient funds test completed successfully')
  })

  test('should prevent transfer to same wallet', async ({ page }) => {
    console.log('Starting same wallet test...')
    // Navigate to wallets page
    console.log('Clicking Wallets tab...')
    await page.click('text=Wallets')
    await page.waitForSelector('h1:has-text("Wallets")', { timeout: 10000 })
    console.log('Wallets page loaded')

    // Close any open modals first
    const closeButtons = page.locator('button[aria-label="Close"], button:has(svg)').filter({ hasText: '' })
    if (await closeButtons.count() > 0) {
      console.log('Closing open modals...')
      await closeButtons.first().click()
      await page.waitForTimeout(500)
    }

    // Click transfer funds button
    console.log('Clicking Transfer Funds button...')
    const transferButton = page.locator('button:has-text("Transfer Funds")')
    await transferButton.dispatchEvent('click')

    // Wait for modal to appear
    console.log('Waiting for transfer modal...')
    await page.waitForSelector('select', { timeout: 10000 })
    console.log('Transfer modal appeared')

    // Try to transfer to same wallet
    const selects = page.locator('select')
    console.log('Selecting same wallet...')
    await selects.nth(0).selectOption('main')
    await selects.nth(1).selectOption('main')
    console.log('Filling amount...')
    await page.fill('input[type="number"]', '50')

    // Submit transfer
    console.log('Submitting transfer...')
    await page.locator('button:has-text("Transfer Funds")').last().click()

    // Should show error message in modal
    console.log('Checking for error message...')
    await expect(page.getByText(/must differ/i)).toBeVisible()
    console.log('Same wallet test completed successfully')
  })
})