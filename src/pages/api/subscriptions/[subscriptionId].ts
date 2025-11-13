import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subscriptionId } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!subscriptionId || typeof subscriptionId !== 'string') {
    return res.status(400).json({ error: 'Invalid subscription ID' })
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: subscriptionId
      },
      include: {
        product: {
          include: {
            rentalPlans: true
          }
        }
      }
    })

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' })
    }

    // Calculate additional information based on status
    const now = new Date()
    let statusInfo = {}

    switch (subscription.state) {
      case 'DRAFT':
        statusInfo = {
          canEdit: true,
          canCancel: true,
          canExtend: false,
          daysRemaining: null,
          nextBillingDate: null
        }
        break

      case 'FULFILLING':
        statusInfo = {
          canEdit: false,
          canCancel: true,
          canExtend: false,
          daysRemaining: null,
          nextBillingDate: null,
          estimatedDelivery: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) // 3 days
        }
        break

      case 'ACTIVE':
        const daysRemaining = subscription.activeUntil 
          ? Math.ceil((new Date(subscription.activeUntil).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          : 0
        
        statusInfo = {
          canEdit: false,
          canCancel: true,
          canExtend: true,
          daysRemaining: Math.max(0, daysRemaining),
          nextBillingDate: subscription.activeUntil,
          // Can only extend if the desired period is greater than current
          availableExtensions: subscription.product.rentalPlans
            .filter(plan => plan.period > subscription.rentalPeriod)
            .sort((a, b) => a.period - b.period)
        }
        break

      case 'TERMINATED':
        statusInfo = {
          canEdit: false,
          canCancel: false,
          canExtend: false,
          daysRemaining: 0,
          nextBillingDate: null,
          terminatedAt: subscription.terminatedAt
        }
        break

      default:
        statusInfo = {
          canEdit: false,
          canCancel: false,
          canExtend: false,
          daysRemaining: null,
          nextBillingDate: null
        }
    }

    // Calculate total paid and remaining
    const monthsActive = subscription.activatedAt 
      ? Math.ceil((now.getTime() - new Date(subscription.activatedAt).getTime()) / (1000 * 60 * 60 * 24 * 30))
      : 0
    
    const totalPaid = Math.min(monthsActive, subscription.rentalPeriod) * subscription.monthlyPrice
    const totalRemaining = Math.max(0, subscription.rentalPeriod - monthsActive) * subscription.monthlyPrice

    const response = {
      ...subscription,
      statusInfo,
      billing: {
        totalPaid,
        totalRemaining,
        monthlyPrice: subscription.monthlyPrice,
        totalSubscriptionValue: subscription.rentalPeriod * subscription.monthlyPrice,
        monthsCompleted: Math.min(monthsActive, subscription.rentalPeriod),
        monthsRemaining: Math.max(0, subscription.rentalPeriod - monthsActive)
      }
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching subscription:', error)
    res.status(500).json({ error: 'Internal server error' })
  } finally {
    await prisma.$disconnect()
  }
}