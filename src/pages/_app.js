import '@/styles/globals.css'
import { config } from '@/utils/wallectConfig'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { WagmiConfig } from 'wagmi'
import { store } from '@/redux/store';
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
          <Toaster
            position='bottom-right'
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: 'red',
                overflow:'hidden',
                width:'100%',
                // background: 'linear-gradient(270deg, #C660C7 0%, #4CC5C0 100%)'
              },
            }}
          />
        </Provider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}