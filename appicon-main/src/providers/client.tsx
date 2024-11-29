'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@/i18n/setup'

const queryClient = new QueryClient()

interface ClientProviderProps {
  children: React.ReactNode
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
