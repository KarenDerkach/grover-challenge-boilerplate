import styled from 'styled-components'
import { useRouter } from 'next/router'

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  text-align: center;
`

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 2rem;
  color: #a0aec0;
`

const EmptyTitle = styled.h3`
  color: #1a202c;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 12px 0;
`

const EmptyDescription = styled.p`
  color: #718096;
  font-size: 1rem;
  margin: 0 0 24px 0;
  max-width: 400px;
  line-height: 1.6;
`

const EmptyAction = styled.button`
  background-color: #4CAF50;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #45a049;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

interface SubscriptionEmptyProps {
  title?: string
  description?: string
  actionText?: string
  icon?: string
}

export default function SubscriptionEmpty({
  title = "No subscriptions",
  description = "It looks like you don't have any active subscriptions yet. Explore our available products!",
  actionText = "Explore Products",
  icon = "📱"
}: SubscriptionEmptyProps) {
  const router = useRouter()

  const handleDefaultAction = () => {
    // Option 1: With Next.js Router (recommended)
    router.push('/products')
    
    // Option 2: With window.location
    // window.location.href = '/products'
  }


  return (
    <EmptyContainer>
      <EmptyIcon>
        {icon}
      </EmptyIcon>
      
      <EmptyTitle>{title}</EmptyTitle>
      
      <EmptyDescription>
        {description}
      </EmptyDescription>
      
      { actionText && (
        <EmptyAction onClick={handleDefaultAction}>
          {actionText}
        </EmptyAction>
      )}
      
      
    </EmptyContainer>
  )
}