import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Home } from './components/Home'

import { PrimeReactProvider } from 'primereact/api';


const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <Home />
      </PrimeReactProvider>
    </QueryClientProvider>
  )
}