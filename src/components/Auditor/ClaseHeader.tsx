'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface ClaseHeaderProps {
  title: string
  className?: string
}

export default function ClaseHeader({ title, className }: ClaseHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/dashboard/auditor/entradas') // Asegúrate de que esta ruta es la correcta en tu estructura
  }

  return (
    <header className={`bg-white p-4 border-b border-border-subtle flex items-center h-20 rounded-t-xl ${className || ''}`}>
      <button
        onClick={handleBack}
        className="flex items-center text-gray-800 hover:text-blue-600 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        <span className="text-lg font-medium">{title}</span>
      </button>
    </header>
  )
}
