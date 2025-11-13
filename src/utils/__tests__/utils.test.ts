import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { 
  formatDate, 
  formatPrice, 
  calculateDaysRemaining, 
  calculateMonthsActive 
} from '../index'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly in English', () => {
      expect(formatDate('2024-01-01')).toBe('01 Jan 2024')
      expect(formatDate('2024-12-25')).toBe('25 Dec 2024')
      expect(formatDate('2024-06-15')).toBe('15 Jun 2024')
    })

    it('handles different date formats', () => {
      expect(formatDate('2024-01-01T00:00:00Z')).toBe('01 Jan 2024')
      expect(formatDate('2024-01-01T12:30:00.000Z')).toBe('01 Jan 2024')
    })
  })

  describe('formatPrice', () => {
    it('formats price in dollars correctly', () => {
      expect(formatPrice(19999)).toMatch(/\$199\.99/)
      expect(formatPrice(50000)).toMatch(/\$500\.00/)
      expect(formatPrice(999)).toMatch(/\$9\.99/)
      expect(formatPrice(0)).toMatch(/\$0\.00/)
    })

    it('handles decimal prices correctly', () => {
      expect(formatPrice(12345)).toMatch(/\$123\.45/)
      expect(formatPrice(1)).toMatch(/\$0\.01/)
    })
  })

  describe('calculateDaysRemaining', () => {
    beforeEach(() => {
      // Mock the current date to 2024-01-01
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-01'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('calculates days remaining correctly', () => {
      expect(calculateDaysRemaining('2024-01-31')).toBe(30)
      expect(calculateDaysRemaining('2024-01-02')).toBe(1)
      expect(calculateDaysRemaining('2024-01-01')).toBe(0)
    })

    it('handles past dates', () => {
      expect(calculateDaysRemaining('2023-12-31')).toBe(-1)
      expect(calculateDaysRemaining('2023-12-01')).toBe(-31)
    })

    it('handles future dates', () => {
      expect(calculateDaysRemaining('2024-12-31')).toBe(365)
      expect(calculateDaysRemaining('2025-01-01')).toBe(366) // 2024 is a leap year
    })
  })

  describe('calculateMonthsActive', () => {
    beforeEach(() => {
      // Mock the current date to 2024-07-01
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-07-01'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('calculates months active correctly', () => {
      expect(calculateMonthsActive('2024-01-01')).toBe(7) // January to July (7 months difference)
      expect(calculateMonthsActive('2024-06-01')).toBe(1) // June to July (1 month difference)
      expect(calculateMonthsActive('2024-07-01')).toBe(0) // Same day = 0 months
    })

    it('handles partial months', () => {
      expect(calculateMonthsActive('2024-06-15')).toBe(1)
      expect(calculateMonthsActive('2024-05-15')).toBe(2)
    })

    it('handles future start dates', () => {
      expect(calculateMonthsActive('2024-08-01')).toBe(-1)
      expect(calculateMonthsActive('2024-12-01')).toBe(-5)
    })
  })
})