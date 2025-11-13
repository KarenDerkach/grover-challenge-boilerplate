import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '@/test/utils'
import SubscriptionCard from '../subscription/SubscriptionCard'
import { Subscription } from '@/types/subscription'

// Mock next/router
const mockPush = vi.fn()
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const mockSubscription: Subscription = {
  id: 'sub-123',
  referenceId: 'REF-123',
  state: 'ACTIVE',
  productId: 'prod-1',
  product: {
    id: 'prod-1',
    slug: 'macbook-pro-16',
    title: 'MacBook Pro 16"',
    image: '/images/macbook.jpg',
    coreAttribute: 'Apple M2 Pro',
  },
  monthlyPrice: 19999, // 199.99 EUR in cents
  rentalPeriod: 12,
  activatedAt: '2024-01-01T00:00:00Z',
  activeUntil: '2024-12-31T23:59:59Z',
  createdAt: '2023-12-01T00:00:00Z',
}

describe('SubscriptionCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders subscription information correctly', () => {
    render(<SubscriptionCard subscription={mockSubscription} />)

    expect(screen.getByText('MacBook Pro 16"')).toBeInTheDocument()
    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
    expect(screen.getByText('$199.99')).toBeInTheDocument()
    expect(screen.getByText('12 months')).toBeInTheDocument()
    expect(screen.getByText('REF-123')).toBeInTheDocument()
  })

  it('displays formatted dates correctly', () => {
    render(<SubscriptionCard subscription={mockSubscription} />)

    expect(screen.getByText('01 Jan 2024')).toBeInTheDocument()
    expect(screen.getByText('31 Dec 2024')).toBeInTheDocument()
  })

  it('shows different status badges with correct styling', () => {
    const expiredSubscription = { ...mockSubscription, state: 'EXPIRED' as const }
    const { rerender } = render(<SubscriptionCard subscription={expiredSubscription} />)

    expect(screen.getByText('EXPIRED')).toBeInTheDocument()

    const pausedSubscription = { ...mockSubscription, state: 'PAUSED' as const }
    rerender(<SubscriptionCard subscription={pausedSubscription} />)

    expect(screen.getByText('PAUSED')).toBeInTheDocument()

    const draftSubscription = { ...mockSubscription, state: 'DRAFT' as const }
    rerender(<SubscriptionCard subscription={draftSubscription} />)

    expect(screen.getByText('DRAFT')).toBeInTheDocument()
  })

  it('handles fulfilling status with special text', () => {
    const fulfillingSubscription = { ...mockSubscription, state: 'FULFILLING' as const }
    render(<SubscriptionCard subscription={fulfillingSubscription} />)

    expect(screen.getByText('In transit')).toBeInTheDocument()
  })

  it('navigates to subscription detail on card click', () => {
    render(<SubscriptionCard subscription={mockSubscription} />)

    const card = screen.getByText('MacBook Pro 16"').closest('div')
    fireEvent.click(card!)

    expect(mockPush).toHaveBeenCalledWith('/subscriptions/sub-123')
  })

  it('does not navigate when subscription is terminated', () => {
    const terminatedSubscription = { ...mockSubscription, state: 'TERMINATED' as const }
    render(<SubscriptionCard subscription={terminatedSubscription} />)

    const card = screen.getByText('MacBook Pro 16"').closest('div')
    fireEvent.click(card!)

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('handles subscription without activation date', () => {
    const unactivatedSubscription = { ...mockSubscription, activatedAt: undefined }
    render(<SubscriptionCard subscription={unactivatedSubscription} />)

    expect(screen.getByText('Not Activated')).toBeInTheDocument()
  })

  it('handles subscription without active until date', () => {
    const noEndDateSubscription = { ...mockSubscription, activeUntil: undefined }
    render(<SubscriptionCard subscription={noEndDateSubscription} />)

    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('applies correct variant styling for active subscriptions', () => {
    const { container } = render(<SubscriptionCard subscription={mockSubscription} />)
    
    // Check that the card has the active variant styling
    const card = container.firstChild as HTMLElement
    expect(card).toHaveStyle('opacity: 1')
  })

  it('applies correct variant styling for terminated subscriptions', () => {
    const terminatedSubscription = { ...mockSubscription, state: 'TERMINATED' as const }
    const { container } = render(<SubscriptionCard subscription={terminatedSubscription} />)
    
    // Check that the card has the inactive variant styling
    const card = container.firstChild as HTMLElement
    expect(card).toHaveStyle('opacity: 0.7')
  })

  it('formats price correctly for different amounts', () => {
    const expensiveSubscription = { ...mockSubscription, monthlyPrice: 50000 } // 500.00 USD
    render(<SubscriptionCard subscription={expensiveSubscription} />)

    expect(screen.getByText('$500.00')).toBeInTheDocument()
  })
})