'use client'
import { ReactNode } from 'react'
import { ReactQueryProvider } from './query-client-provider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
  )
}