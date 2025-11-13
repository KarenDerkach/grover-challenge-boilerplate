import styled from 'styled-components'
import { formatDate, formatPrice, getStatusText } from '@/utils'
import { useRouter } from 'next/router'
import { SubscriptionCardProps, SubscriptionState } from '../../types/subscription'

const Card = styled.div<{variant?: 'active' | 'inactive'}>`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  margin-bottom: 16px;
  cursor: pointer;
  position: relative;

  ${({ variant }) => variant === 'active' && `
  

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  
  }
  `}
   ${({ variant }) => variant === 'inactive' && `
    opacity: 0.7;
    cursor: not-allowed;
    border-color: #a0aec0;
    
    &:hover {
      box-shadow: none;
      transform: none;
    }
  `}
`

const CardClickOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
  }
`

const ProductTitle = styled.h3`
  color: #1a202c;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`

const StatusBadge = styled.span<{ status: SubscriptionState }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ status }) => {
    switch (status) {
      case 'DRAFT':
        return `
          background-color: #fef5e7;
          color: #d69e2e;
        `
      case 'FULFILLING':
        return `
          background-color: #e3f2fd;
          color: #1976d2;
        `
      case 'ACTIVE':
        return `
          background-color: #e8f5e8;
          color: #2e7d32;
        `
      case 'TERMINATED':
        return `
          background-color: #939393ff;
          color: #e4e8edff;
        `
      case 'PAUSED':
        return `
          background-color: #ed8936;
          color: #1a202c;
        `
      case 'CANCELLED':
        return `
          background-color: #f56565;
          color: #ffffff;
        `
      case 'EXPIRED':
        return `
          background-color: #a0aec0;
          color: #ffffff;
        `
      default:
        return `
          background-color: #a0aec0;
          color: #ffffff;
        `
    }
  }}
`

const CardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const InfoValue = styled.span`
  font-size: 1rem;
  color: #1a202c;
  font-weight: 500;
`

const PriceValue = styled(InfoValue)`
  color: ${props => props.theme.colors.groverPrimary};
  font-size: 1.125rem;
  font-weight: 700;
`

const ReferenceId = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
  margin-top: 8px;
  font-family: 'Courier New', monospace;
`

export default function SubscriptionCard({ 
  subscription
}: SubscriptionCardProps) {
  const router = useRouter()
  


  const isActive = subscription.state === 'ACTIVE'
  const isExpired = subscription.state === 'EXPIRED'
  const isPaused = subscription.state === 'PAUSED'
  const isDraft = subscription.state === 'DRAFT'
  const isFulfilling = subscription.state === 'FULFILLING'
  const isTerminated = subscription.state === 'TERMINATED'

  const handleCardClick = () => {
    if (isTerminated) return 
    router.push(`/subscriptions/${subscription.id}`)
  }

  // const handleActionClick = (e: React.MouseEvent, action: () => void) => {
  //   e.stopPropagation() // Evitar que se active el click del card
  //   action()
  // }

  return (
    <Card variant={isTerminated? 'inactive' : 'active'}>
      <CardClickOverlay onClick={handleCardClick} />
      
      <CardHeader>
        <ProductTitle>{subscription.product.title}</ProductTitle>
        <StatusBadge status={subscription.state}>
          {getStatusText(subscription.state)}
        </StatusBadge>
      </CardHeader>

      <CardBody>
        <InfoGroup>
          <InfoLabel>Monthly Price</InfoLabel>
          <PriceValue>{formatPrice(subscription.monthlyPrice)}</PriceValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Rental Period</InfoLabel>
          <InfoValue>{subscription.rentalPeriod} months</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Activated</InfoLabel>
          <InfoValue>{subscription.activatedAt ? formatDate(subscription.activatedAt) : 'Not Activated'}</InfoValue>
        </InfoGroup>

        <InfoGroup>
          <InfoLabel>Active Until</InfoLabel>
          <InfoValue>{subscription.activeUntil ? formatDate(subscription.activeUntil) : 'N/A'}</InfoValue>
        </InfoGroup>
      </CardBody>

      <ReferenceId>
        Ref: {subscription.referenceId}
      </ReferenceId>
    </Card>
  )
}