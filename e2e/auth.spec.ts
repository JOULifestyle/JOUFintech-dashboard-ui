import { test, expect } from './setup'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure clean state for each test
    await page.context().addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate directly to signin page to bypass auto-login
    await page.goto('/auth/signin')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })

    // Check if we're on the login page
    await expect(page).toHaveTitle(/JOU Finance/)

    // Verify the demo account info is visible
    await expect(page.getByText('Demo Account')).toBeVisible()

    // Fill in login credentials
    await page.fill('input#email', 'john.doe@example.com')
    await page.fill('input#password', 'password123')

    // Click login button
    await page.click('button:has-text("Sign In")')

    // Should redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 15000 })
    await expect(page).toHaveURL(/.*dashboard/)

    // Check for welcome message
    await expect(page.getByText(/Hi.*John/)).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    // Mock alert to capture error messages
    let alertMessage = ''
    page.on('dialog', async dialog => {
      alertMessage = dialog.message()
      await dialog.accept()
    })

    // Navigate directly to signin page
    await page.goto('/auth/signin')

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle')
    await page.waitForSelector('input#email', { timeout: 15000 })

    // Fill in invalid credentials
    await page.fill('input#email', 'invalid@example.com')
    await page.fill('input#password', 'wrongpassword')

    // Click login button
    await page.click('button:has-text("Sign In")')

    // Wait for alert
    await page.waitForTimeout(2000)

    // Should show error message in alert
    expect(alertMessage).toContain('Invalid credentials')
  })
})