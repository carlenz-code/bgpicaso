'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ClaseHeader from '@/components/Auditor/ClaseHeader'
import ResumenTab from '@/components/Auditor/ResumenTab'
import ResultadoTab from '@/components/Auditor/ResultadoTab'
import RetroalimentacionTab from '@/components/Auditor/RetroalimentacionTab'

import {
  PencilIcon,
  ArchiveBoxIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'

const TABS = [
  { label: 'Resumen', icon: PencilIcon },
  { label: 'Resultado', icon: ArchiveBoxIcon },
  { label: 'Retroalimentación', icon: WrenchScrewdriverIcon },
] as const

type Tab = typeof TABS[number]['label']

export default function ClaseDetallePage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState<Tab>('Resumen')
  const [classData, setClassData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await fetch(`https://back-sgce.onrender.com/sesion/get-details/${id}`)
        const data = await res.json()

        // MOCKS TEMPORALES
        data.resumen = `Inicio
La clase comenzó con una dinámica de reflexión sobre las emociones de la literatura. Se preguntó: “¿Qué libro te ha marcado y por qué?”.

Desarrollo
Se analizó el cuento “La casa de Asterión” de Borges, discutiendo sus símbolos y promoviendo el debate en grupos.

Cierre
Se hizo puesta en común y se reflexionó sobre cómo Borges transforma mitos clásicos.`
        data.proposito = 'Analizar “La casa de Asterión” para fortalecer la interpretación crítica y el debate literario en los estudiantes.'
        data.resultados = [
          {
            id: 1,
            estado: 'En inicio',
            porcentaje: 8,
            observaciones: 'Faltó presentar claramente los objetivos al inicio de la sesión.',
            recomendaciones: 'Introducir objetivos antes de comenzar la clase.',
          },
          {
            id: 2,
            estado: 'En Proceso',
            porcentaje: 65,
            observaciones: 'Participación intermitente de algunos estudiantes.',
            recomendaciones: 'Formular preguntas abiertas para invitar a todos.',
          },
        ]
        data.retroalimentacion = `El profesor demuestra una planificación clara de los aprendizajes esperados, aunque algunos podrían ser más específicos y medibles. Se sugiere...`

        setClassData(data)
      } catch (err) {
        console.error('Error al obtener clase:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchClass()
  }, [id])

  if (loading) return <p className="p-4">Cargando clase...</p>

  return (
    <div className="flex flex-col bg-white rounded-xl">
      {classData && <ClaseHeader title={classData.titulo} />}

      {/* Tabs con íconos */}
      <div className="flex space-x-6 border-b border-gray-200 px-6 pt-6">
        {TABS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`pb-2 px-1 text-sm font-medium flex items-center gap-2 border-b-2 transition-all duration-150 ease-in-out ${
              activeTab === label
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-700 hover:text-blue-600'
            }`}
          >
            <Icon className={`h-5 w-5 ${activeTab === label ? 'text-blue-600' : 'text-black'}`} />
            {label}
          </button>
        ))}
      </div>

      {/* Contenido del tab */}
      <div className="p-6">
        {activeTab === 'Resumen' && classData && (
          <ResumenTab resumen={classData.resumen} proposito={classData.proposito} />
        )}
        {activeTab === 'Resultado' && classData && (
          <ResultadoTab resultados={classData.resultados} />
        )}
        {activeTab === 'Retroalimentación' && classData && (
          <RetroalimentacionTab feedback={classData.retroalimentacion} />
        )}
      </div>
    </div>
  )
}
