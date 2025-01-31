'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React from 'react'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

interface Props {
  readonly children: React.ReactNode
}

export default function ReactQueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
