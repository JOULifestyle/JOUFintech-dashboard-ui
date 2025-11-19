import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BalanceCard from './BalanceCard'

describe('BalanceCard', () => {
  it('renders balance information correctly', () => {
    render(<BalanceCard total={10000} available={8000} pending={2000} />)

    expect(screen.getByText('Total Balance')).toBeInTheDocument()
    expect(screen.getByText('Available')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('formats currency values correctly', () => {
    render(<BalanceCard total={5000} available={4000} pending={1000} />)

    // Check that currency formatting is applied (will show $5,000.00 format)
    expect(screen.getByText('$5,000.00')).toBeInTheDocument()
    expect(screen.getByText('$4,000.00')).toBeInTheDocument()
    expect(screen.getByText('$1,000.00')).toBeInTheDocument()
  })
})