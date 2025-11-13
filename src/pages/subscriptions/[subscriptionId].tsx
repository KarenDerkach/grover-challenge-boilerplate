//import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { formatDate, formatPrice, getStatusText } from '@/utils'
import Head from 'next/head'
import { useSubscriptions } from '@/hooks/useSubscriptions'
import  { useEffect } from 'react'


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f7fafc;
  min-height: 100vh;
`

const Header = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`

const BackButton = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.groverPrimary};
  border: 1px solid ${props => props.theme.colors.groverPrimary};
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.875rem;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f56565;
    color: #ffffff;
  }
`

const HeaderTitle = styled.h1`
  color: #1a202c;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
`

const ReferenceId = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
  font-family: 'Courier New', monospace;
`

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 16px;
  
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
          background-color: #f3e5f5;
          color: #7b1fa2;
        `
      default:
        return `
          background-color: #f5f5f5;
          color: #666666;
        `
    }
  }}
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Card = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.h2`
  color: #1a202c;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 16px 0;
`

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f7fafc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`

const ProductDetails = styled.div`
  flex: 1;
`

const ProductTitle = styled.h3`
  color: #1a202c;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 4px 0;
`

const ProductAttribute = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoLabel = styled.span`
  color: #718096;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`

const InfoValue = styled.span`
  color: #1a202c;
  font-size: 1rem;
  font-weight: 500;
`

const PriceValue = styled(InfoValue)`
  color: ${props => props.theme.colors.groverPrimary};
  font-size: 1.125rem;
  font-weight: 700;
`

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
  margin-bottom: 8px;

  ${({ variant = 'secondary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #4CAF50;
          color: #ffffff;
          border-color: #4CAF50;
          
          &:hover:not(:disabled) {
            background-color: #45a049;
          }
        `
      case 'danger':
        return `
          background-color: transparent;
          color: #f56565;
          border-color: #f56565;
          
          &:hover:not(:disabled) {
            background-color: #f56565;
            color: #ffffff;
          }
        `
      default:
        return `
          background-color: transparent;
          color: #4a5568;
          border-color: #cbd5e0;
          
          &:hover:not(:disabled) {
            background-color: #f7fafc;
          }
        `
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`


const Timeline = styled.div`
  position: relative;
  padding-left: 24px;
`

const TimelineItem = styled.div<{ active?: boolean }>`
  position: relative;
  padding-bottom: 16px;
  
  &:before {
    content: '';
    position: absolute;
    left: -12px;
    top: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ active }) => active ? '#f56565' : '#e2e8f0'};
  }
  
  &:after {
    content: '';
    position: absolute;
    left: -8px;
    top: 14px;
    width: 1px;
    height: calc(100% - 8px);
    background-color: #e2e8f0;
  }
  
  &:last-child:after {
    display: none;
  }
`

const TimelineContent = styled.div`
  font-size: 0.875rem;
`

const TimelineDate = styled.div`
  color: #718096;
  font-size: 0.75rem;
  margin-top: 2px;
`



export default function SubscriptionDetailPage() {
  const router = useRouter()
  const { subscriptionId } = router.query
  const { subscriptions, loading: subscriptionsLoading, fetchSubscriptions, cancelSubscription, extendSubscription } = useSubscriptions()

  const subscription = subscriptions.find(sub => sub.id === subscriptionId)

 useEffect(() => {
    if (!subscriptionsLoading && subscriptions.length === 0) {
      fetchSubscriptions()
    }
  }, [subscriptions.length, subscriptionsLoading, fetchSubscriptions])

  // Estado de loading
  if (subscriptionsLoading) {
    return (
      <Container>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Loading subscription details...
          </div>
        </Card>
      </Container>
    )
  }


  // Estado de error - suscripción no encontrada
  if (!subscription) {
    return (
      <Container>
        <Card>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Error</h2>
            <p>Subscription not found</p>
            <ActionButton onClick={() => router.push('/')}>
              Back to Subscriptions
            </ActionButton>
          </div>
        </Card>
      </Container>
    )
  }


  const getAvailableExtensions = () => {
    const currentPeriod = subscription.rentalPeriod
    

    const extensionOptions = [3, 6, 9, 12]
    
    return extensionOptions
      .filter(period => period > currentPeriod)
      .map(period => ({
        period,
        price: subscription.monthlyPrice, 
        totalPrice: subscription.monthlyPrice * period,
        additionalMonths: period - currentPeriod,
        additionalCost: subscription.monthlyPrice * (period - currentPeriod)
      }))
  }

  const handleExtendSubscription = async (newPeriod: number) => {
    console.log(`Attempting to extend subscription to ${newPeriod} months...`)
    const success = await extendSubscription(subscription.id, newPeriod)
    if (success) {
      console.log(`Subscription extended to ${newPeriod} months successfully!`)
      alert(`✅ Subscription successfully extended to ${newPeriod} months!`)
    } else {
      console.log('Failed to extend subscription')
      alert('❌ Failed to extend subscription. Please try again.')
    }
  }

  const handleCancelSubscription = async () => {
    // Confirmación antes de cancelar
    const confirmCancel = window.confirm(
      '⚠️ Are you sure you want to cancel this subscription? This action cannot be undone.'
    )
    
    if (!confirmCancel) {
      return
    }

    console.log('Attempting to cancel subscription...')
    const success = await cancelSubscription(subscription.id)
    if (success) {
      console.log('Subscription cancelled successfully!')
      alert('✅ Subscription cancelled successfully!')
      // router.push('/')
    } else {
      console.log('Failed to cancel subscription')
      alert('❌ Failed to cancel subscription. Please try again.')
    }
  }  

  return(
    <>
    <Head>
      <title>Subscription Detail - {subscription.product.title}</title>
    </Head>
    <Container>
      <Header>
        <BackButton onClick={() => router.push('/')}>
          ← Back to Subscriptions
        </BackButton>
        
        <HeaderTitle>{subscription.product.title}</HeaderTitle>
        <ReferenceId>Ref: {subscription.referenceId}</ReferenceId>
        
        <StatusBadge status={subscription.state}>
          {getStatusText(subscription.state)}
        </StatusBadge>
      </Header>

      <ContentGrid>
        <MainContent>
          <Card>
            <CardTitle>Product Information</CardTitle>
            <ProductInfo>
              {/* <ProductImage><Image src={subscription.product.image} alt={subscription.product.title} width={40} height={40}></Image></ProductImage> */}
              <ProductImage>📱</ProductImage>
              <ProductDetails>
                <ProductTitle>{subscription.product.title}</ProductTitle>
                <ProductAttribute>{subscription.product.coreAttribute}</ProductAttribute>
              </ProductDetails>
            </ProductInfo>
            
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Monthly Price</InfoLabel>
                <PriceValue>{formatPrice(subscription.monthlyPrice)}</PriceValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>Total Period</InfoLabel>
                <InfoValue>{subscription.rentalPeriod} months</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>Total Subscription</InfoLabel>
                <InfoValue>{formatPrice(subscription.monthlyPrice * subscription.rentalPeriod)}</InfoValue>
              </InfoItem>
              
              {subscription.activatedAt && (
                <InfoItem>
                  <InfoLabel>Activated on</InfoLabel>
                  <InfoValue>{formatDate(subscription.activatedAt)}</InfoValue>
                </InfoItem>
              )}
              
              {subscription.activeUntil && (
                <InfoItem>
                  <InfoLabel>Active until</InfoLabel>
                  <InfoValue>{formatDate(subscription.activeUntil)}</InfoValue>
                </InfoItem>
              )}
              
              {/* Días restantes no disponible en Subscription básico */}
            </InfoGrid>
          </Card>

          {/* Sección de progreso simplificada o removida ya que no tenemos billing */}
          {subscription.state === 'ACTIVE' && (
            <Card>
              <CardTitle>Subscription Status</CardTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Rental Period</InfoLabel>
                  <InfoValue>{subscription.rentalPeriod} months</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Monthly Price</InfoLabel>
                  <InfoValue>{formatPrice(subscription.monthlyPrice)}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </Card>
          )}

          <Card>
            <CardTitle>Chronology</CardTitle>
            <Timeline>
              <TimelineItem active>
                <TimelineContent>Subscription created</TimelineContent>
                <TimelineDate>{formatDate(subscription.createdAt)}</TimelineDate>
              </TimelineItem>
              
              {subscription.state !== 'DRAFT' && (
                <TimelineItem active>
                  <TimelineContent>Order in preparation</TimelineContent>
                  <TimelineDate>In the warehouse </TimelineDate>
                </TimelineItem>
              )}
              
              {subscription.activatedAt && (
                <TimelineItem active>
                  <TimelineContent>Subscription activated</TimelineContent>
                  <TimelineDate>{formatDate(subscription.activatedAt)}</TimelineDate>
                </TimelineItem>
              )}
              
              {subscription.terminatedAt && (
                <TimelineItem active>
                  <TimelineContent>Subscription ended</TimelineContent>
                  <TimelineDate>{formatDate(subscription.terminatedAt)}</TimelineDate>
                </TimelineItem>
              )}
            </Timeline>
          </Card>
        </MainContent>

        <Sidebar>
          <Card>
            <CardTitle>Actions</CardTitle>
            
            {subscription.state === 'ACTIVE' && (
              <>
                {/* Sección de extensiones mejorada */}
                {getAvailableExtensions().length > 0 && (
                  <>
                    <InfoLabel style={{ marginBottom: '12px', display: 'block', fontSize: '0.875rem', fontWeight: '600' }}>
                      📅 Extend Your Subscription
                    </InfoLabel>
                    <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f7fafc', borderRadius: '6px' }}>
                      <InfoLabel style={{ fontSize: '0.75rem', color: '#718096' }}>
                        Current: {subscription.rentalPeriod} months
                      </InfoLabel>
                    </div>
                    
                    {getAvailableExtensions().slice(0, 3).map((extension) => (
                      <ActionButton 
                        key={extension.period} 
                        variant="primary"
                        style={{ marginBottom: '8px', position: 'relative' }}
                        onClick={() => handleExtendSubscription(extension.period)}
                      >
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                            Extend to {extension.period} months
                          </div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                            +{extension.additionalMonths} months • {formatPrice(extension.additionalCost)} extra
                          </div>
                        </div>
                      </ActionButton>
                    ))}
                  </>
                )}
                
                {/* No extensions availables*/}
                {getAvailableExtensions().length === 0 && (
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#f0f9ff', 
                    borderRadius: '8px', 
                    border: '1px solid #0ea5e9',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    <InfoLabel style={{ 
                      fontSize: '0.875rem', 
                      color: '#0369a1',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      🎉 Maximum Period Reached
                    </InfoLabel>
                    <InfoLabel style={{ fontSize: '0.75rem', color: '#0284c7' }}>
                      You already have the longest available subscription period ({subscription.rentalPeriod} months)
                    </InfoLabel>
                  </div>
                )}
                
                {/* Cancell subscription */}
                <ActionButton 
                  variant="danger" 
                  onClick={handleCancelSubscription}
                  style={{ marginTop: '16px' }}
                >
                  ❌ Cancel Subscription
                </ActionButton>
              </>
            )}
            
            {subscription.state === 'DRAFT' && (
              <ActionButton variant="primary">
                Activate Subscription
              </ActionButton>
            )}
            
            {(subscription.state === 'TERMINATED' || subscription.state === 'CANCELLED') && (
              <InfoValue style={{ textAlign: 'center', color: '#718096' }}>
                No actions available
              </InfoValue>
            )}
          </Card>

          {/* Información de suscripción con detalles de extensión */}
          {/* <Card>
            <CardTitle>Subscription Details</CardTitle>
            <InfoItem>
              <InfoLabel>Current Status</InfoLabel>
              <InfoValue>{getStatusText(subscription.state)}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Current Period</InfoLabel>
              <InfoValue>{subscription.rentalPeriod} months</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Monthly Rate</InfoLabel>
              <InfoValue>{formatPrice(subscription.monthlyPrice)}</InfoValue>
            </InfoItem>
            
            {subscription.state === 'ACTIVE' && getAvailableExtensions().length > 0 && (
              <>
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '6px',
                  border: '1px solid #22c55e'
                }}>
                  <InfoLabel style={{ 
                    fontSize: '0.75rem', 
                    color: '#15803d', 
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    💡 Extension Benefits
                  </InfoLabel>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '16px', 
                    fontSize: '0.75rem', 
                    color: '#166534',
                    lineHeight: '1.4'
                  }}>
                    <li>Keep your favorite device longer</li>
                    <li>Same monthly rate guaranteed</li>
                    <li>No setup fees or interruptions</li>
                    <li>Cancel anytime during extension</li>
                  </ul>
                </div>
              </>
            )}
          </Card> */}
        </Sidebar>
      </ContentGrid>
    </Container>
       </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { subscriptionId } = context.params!

//   try {
//     const baseUrl = process.env.VERCEL_URL 
//       ? `https://${process.env.VERCEL_URL}` 
//       : 'http://localhost:3000'
    
//     const response = await fetch(`${baseUrl}/api/subscriptions/${subscriptionId}`)
    
//     if (!response.ok) {
//       return {
//         notFound: true
//       }
//     }
    
//     const subscription = await response.json()
    
//     return {
//       props: {
//         subscription
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching subscription:', error)
//     return {
//       notFound: true
//     }
//   }
// }

