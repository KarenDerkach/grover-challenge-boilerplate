import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  animation: ${fadeIn} 0.3s ease-out;
`

const SpinnerContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

const spin = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`

const SpinnerDot = styled.div<{ delay?: number }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #4CAF50;
  animation: ${spin} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay = 0 }) => delay}ms;
`

const LoadingText = styled.p`
  color: #adb5bd;
  font-size: 16px;
  margin: 0;
  text-align: center;
`

const LoadingSubtext = styled.p`
  color: #ced4da;
  font-size: 14px;
  margin: 8px 0 0 0;
  text-align: center;
`

interface SubscriptionLoadingProps {
  message?: string
  subMessage?: string
}

export default function SubscriptionLoading({ 
  message = "Loading subscriptions...",
  subMessage = "This will only take a moment"
}: SubscriptionLoadingProps) {
  return (
    <LoadingContainer>
      <SpinnerContainer>
        <SpinnerDot delay={0} />
        <SpinnerDot delay={200} />
        <SpinnerDot delay={400} />
      </SpinnerContainer>
      <LoadingText>{message}</LoadingText>
      {subMessage && <LoadingSubtext>{subMessage}</LoadingSubtext>}
    </LoadingContainer>
  )
}