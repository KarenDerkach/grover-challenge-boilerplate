import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createMocks } from 'node-mocks-http'
import handler from '../subscriptions/index'

// Mock Prisma
const mockPrisma = {
  subscription: {
    findMany: vi.fn(),
  },
}

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}))

describe('/api/subscriptions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns subscriptions for GET request', async () => {
    const mockSubscriptions = [
      {
        id: 'sub-1',
        referenceId: 'REF-001',
        state: 'ACTIVE',
        product: {
          id: 'prod-1',
          title: 'MacBook Pro',
          rentalPlans: [],
        },
      },
    ]

    mockPrisma.subscription.findMany.mockResolvedValue(mockSubscriptions)

    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(mockSubscriptions)
    expect(mockPrisma.subscription.findMany).toHaveBeenCalledWith({
      include: { product: { include: { rentalPlans: true } } }
    })
  })

  it('returns 405 for POST request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method not allowed',
    })
  })

  it('returns 405 for PUT request', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method not allowed',
    })
  })

  it('returns 405 for DELETE request', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method not allowed',
    })
  })

  it('handles database errors gracefully', async () => {
    mockPrisma.subscription.findMany.mockRejectedValue(new Error('Database error'))

    const { req, res } = createMocks({
      method: 'GET',
    })

    await expect(handler(req, res)).rejects.toThrow('Database error')
  })
})