export interface Product {
  id: string
  slug: string
  title: string
  coreAttribute: string
  image: string
  rentalPlans?: RentalPlan[]
}

export interface RentalPlan {
  id: string
  period: number
  price: number
  productId: string
}

export interface Subscription {
  id: string
  referenceId: string
  createdAt: string
  activatedAt?: string
  activeUntil?: string
  terminatedAt?: string
  rentalPeriod: number
  monthlyPrice: number
  state: SubscriptionState
  productId: string
  product: Product
}

export type SubscriptionState = 'DRAFT' | 'FULFILLING' | 'ACTIVE' | 'TERMINATED' | 'PAUSED' | 'CANCELLED' | 'EXPIRED'

// Información de estado específico para cada suscripción
export interface SubscriptionStatusInfo {
  canEdit: boolean
  canCancel: boolean
  canExtend: boolean
  daysRemaining: number | null
  nextBillingDate: string | null
  estimatedDelivery?: string
  terminatedAt?: string
  availableExtensions?: RentalPlan[]
}

export interface SubscriptionCardProps {
  subscription: Subscription
}