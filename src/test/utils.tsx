import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { SubscriptionsProvider } from '@/contexts/SubscriptionsContext'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <SubscriptionsProvider>
        {children}
      </SubscriptionsProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Common test data
export const mockSubscription = {
  id: 'test-subscription-1',
  productName: 'MacBook Pro 16"',
  productImageUrl: '/images/macbook-pro.jpg',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  status: 'ACTIVE' as const,
  monthlyPrice: 199.99,
  totalPaid: 2399.88,
  remainingPayments: 2,
  category: 'COMPUTERS' as const,
  canExtend: true,
  canCancel: true,
  extensionOptions: [
    { months: 3, price: 599.97 },
    { months: 6, price: 1199.94 },
    { months: 12, price: 2399.88 }
  ]
}

export const mockSubscriptions = [
  mockSubscription,
  {
    ...mockSubscription,
    id: 'test-subscription-2',
    productName: 'iPhone 15 Pro',
    status: 'PENDING' as const,
    monthlyPrice: 89.99,
    category: 'SMARTPHONES' as const,
  }
]

// Test helpers
export const mockApiResponse = <T,>(data: T, delay = 0): Promise<T> => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

export const mockApiError = (message = 'API Error', status = 500) => {
  const error = new Error(message) as any
  error.status = status
  return Promise.reject(error)
}