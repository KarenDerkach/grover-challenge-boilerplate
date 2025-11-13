import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '@/styles/GlobalStyles'
import { theme } from '@/styles/theme'
import { SubscriptionsProvider } from '@/contexts/SubscriptionsContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SubscriptionsProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </SubscriptionsProvider>
    </ThemeProvider>
  )
}