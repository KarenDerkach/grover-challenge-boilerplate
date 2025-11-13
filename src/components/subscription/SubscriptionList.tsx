import styled from 'styled-components'
import { Subscription } from '../../types/subscription'
import SubscriptionCard from './SubscriptionCard'
import SubscriptionEmpty from './SubscriptionEmpty'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: auto-fit;
  gap: ${props => props.theme.spacing[6]};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: auto-fit;
  }
  
  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    gap: ${props => props.theme.spacing[8]};
  }
`

interface SubscriptionListProps {
  subscriptions: Subscription[]
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  emptyActionText?: string
}

export default function SubscriptionList({
  subscriptions,
  loading = false,
  emptyTitle,
  emptyDescription,
  emptyActionText
}: SubscriptionListProps) {
  
  if (!loading && subscriptions.length < 0) {
    return (
      <SubscriptionEmpty
        title={emptyTitle}
        description={emptyDescription}
        actionText={emptyActionText}
      />
    )
  }

  return (
    <ListContainer>
      <ListGrid>
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
          />
        ))}
      </ListGrid>
    </ListContainer>
  )
}