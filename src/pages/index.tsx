import Head from 'next/head'
import SubscriptionWrapper  from '@/components/subscription/SubscriptionWrapper'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Subscriptions - Grover Challenge</title>
        <meta name="description" content="Manage your Grover subscriptions" />
      </Head>
      
      <SubscriptionWrapper />
    </>
  )
}