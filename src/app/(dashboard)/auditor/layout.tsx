'use client'

import { ReactNode } from 'react'
import BackgroundDecoration from '@/components/Background/BackgroundDecoration'

export default function AuditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex-1 flex flex-col overflow-hidden">
      
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  )
}
