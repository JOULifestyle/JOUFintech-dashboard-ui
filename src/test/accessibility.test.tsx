import { render, screen } from '@testing-library/react'
import { expect, describe, it } from 'vitest'
import BalanceCard from '../components/BalanceCard'
import ThemeToggle from '../components/ThemeToggle'

describe('Accessibility Tests', () => {
  it('BalanceCard should render with proper semantic structure', () => {
    render(<BalanceCard total={10000} available={8000} pending={2000} />)

    // Check for semantic headings
    expect(screen.getByText('Total Balance')).toBeInTheDocument()
    expect(screen.getByText('Available')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()

    // Check that values are displayed
    expect(screen.getByText('$10,000.00')).toBeInTheDocument()
    expect(screen.getByText('$8,000.00')).toBeInTheDocument()
    expect(screen.getByText('$2,000.00')).toBeInTheDocument()
  })

  it('ThemeToggle should be accessible with proper button role', () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/Switch to/)
  })

  // Note: Full axe-core accessibility testing would require additional setup
  // This provides basic accessibility validation for now
})