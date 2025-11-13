import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'dd MMM yyyy', { locale: enUS })
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price / 100) // Assuming price is in cents
}

export const calculateDaysRemaining = (endDate: string): number => {
  const now = new Date()
  const end = new Date(endDate)
  const diffTime = end.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const calculateMonthsActive = (startDate: string): number => {
  const now = new Date()
  const start = new Date(startDate)
  const diffTime = now.getTime() - start.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
}

export const getStatusText =(state: string)=>{
  switch (state) {
    case 'DRAFT':
        return 'Customizing'
      case 'FULFILLING':
        return 'In preparation'
      case 'ACTIVE':
        return 'Active'
      case 'TERMINATED':
        return 'Completed'
    default:
      return state;
  }
}