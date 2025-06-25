'use client'

import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import ClassForm, { ClassData } from '@/components/Planificador/ClassForm'

export default function NewClassPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateClass = async (data: ClassData) => {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulación de request

      const savedClasses = JSON.parse(localStorage.getItem('createdClasses') || '[]')
      const updatedClasses = [...savedClasses, data]
      localStorage.setItem('createdClasses', JSON.stringify(updatedClasses))
    } catch (error) {
      console.error('Error al guardar clase:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col pl-2 pt-2">
      <ToastContainer />
      <div className="flex-1">
        <ClassForm mode="create" onSubmit={handleCreateClass} />
      </div>
    </div>
  )
}
