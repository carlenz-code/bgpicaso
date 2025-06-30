'use client'

import { useEffect, useState } from 'react'
import { CubeTransparentIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'

export interface ClassData {
  id?: number
  title: string
  institution: string
  teacher: string
  level: string
  description?: string
  videos: string[]
  createdAt?: string
  status?: string
}

interface Props {
  mode: 'create' | 'view'
  initialData?: ClassData
  onSubmit?: (data: ClassData) => void
}

export default function ClassForm({ mode, initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    teacher: '',
    level: '',
    description: '',
  })
  const [teachers, setTeachers] = useState<{ id: number; nombre_completo: string }[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isReadOnly = mode === 'view'

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        institution: initialData.institution,
        teacher: initialData.teacher,
        level: initialData.level,
        description: initialData.description || '',
      })
    }
  }, [initialData])

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('https://back-sgce.onrender.com/user/docentes')
        const data = await res.json()
        setTeachers(data)
      } catch (error) {
        console.error('Error al cargar docentes:', error)
      }
    }

    fetchTeachers()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast.success('Video cargado con éxito!', {
        position: 'bottom-right',
        autoClose: 3000,
        style: {
          backgroundColor: '#BBF7D0',
          border: '1px solid #22C55E',
          color: 'black',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '14px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins, sans-serif',
          marginRight: '20px',
          minWidth: '250px',
        },
        icon: <CheckCircleIcon className="h-6 w-6 text-black mr-2" />,
      })
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile || !formData.title || !formData.institution || !formData.teacher || !formData.level) {
      toast.error('Por favor, completa todos los campos obligatorios (*) y sube un video.')
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('titulo', formData.title)
    formDataToSend.append('institucion', formData.institution)
    formDataToSend.append('nivel', formData.level)
    formDataToSend.append('fecha_dictada', new Date().toISOString().split('T')[0])
    formDataToSend.append('duracion_video', '2.30') // puedes reemplazar por duración real si la tienes
    formDataToSend.append('descripcion', formData.description || '')
    formDataToSend.append('grabacion', selectedFile)
    formDataToSend.append('id_user', '6') // cambiar si obtienes el ID dinámicamente

    try {
      setIsSubmitting(true)

      const res = await fetch('https://back-sgce.onrender.com/sesion/create-firebase', {
        method: 'POST',
        body: formDataToSend,
      })

      const result = await res.json()

      if (res.ok) {
        toast.success('Clase creada correctamente!')
        if (onSubmit) {
          const newClass: ClassData = {
            ...formData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'En revisión',
            videos: [selectedFile.name],
          }
          onSubmit(newClass)
        }
      } else {
        toast.error(result.message || 'Error al crear la clase')
      }
    } catch (error) {
      console.error('Error al enviar la clase:', error)
      toast.error('Error al enviar la clase')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col pl-6 pt-4">
      <div className="flex-1">
        <div className="bg-white shadow-lg rounded-[26px] p-2 bg-opacity-40">
          <div className="border border-[#E1E1E8] rounded-[20px] p-6 bg-white">
            <h2 className="text-base font-normal text-blue-600 mb-6 flex items-center gap-3">
              <CubeTransparentIcon className="h-5 w-5 text-blue-600" />
              {mode === 'create' ? 'Nueva Clase' : 'Detalle de Clase'}
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Formulario izquierdo */}
              <div className="w-full md:w-1/2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Título de la sesión <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                    className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej. Clase de Matemáticas - Fracciones"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institución <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                    className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej. Colegio San Juan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre del docente <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                    className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un docente</option>
                    {teachers.map((docente) => (
                      <option key={docente.id} value={docente.nombre_completo}>
                        {docente.nombre_completo}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nivel <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                    className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un nivel</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Secundaria">Secundaria</option>
                    <option value="Universidad">Universidad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción (Opcional)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={isReadOnly}
                    className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Detalles de la clase (opcional)"
                  />
                </div>
              </div>

              <div className="hidden md:block border-l border-[#E1E1E8] mx-6"></div>

              {/* Formulario derecho: videos */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="border-2 border-dashed border-gray-300 rounded-[20px] p-6 text-center w-full">
                  {isReadOnly ? (
                    <>
                      <p className="text-gray-500 mb-2">Sesión cargada</p>
                      <p className="text-sm text-gray-700">
                        {initialData?.videos?.[0] || 'No hay video registrado'}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-500 mb-2">Sube una sesión *</p>
                      <p className="text-sm text-gray-400 mb-4">Carga tus sesiones de clases aquí</p>
                      {!selectedFile && (
                        <label htmlFor="video-upload" className="cursor-pointer">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                              <span className="text-blue-500">☁️</span>
                            </div>
                            <p className="text-blue-500">Carga una grabación</p>
                            <p className="text-xs text-gray-400">(2GB MAX)</p>
                          </div>
                          <input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      )}
                      {selectedFile && <p className="text-sm text-gray-700">{selectedFile.name}</p>}
                      {!selectedFile && (
                        <button
                          type="button"
                          className="mt-4 px-4 py-2 bg-blue-100 text-blue-500 rounded-md hover:bg-blue-200"
                          onClick={() => document.getElementById('video-upload')?.click()}
                        >
                          Adjuntar
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {mode === 'create' && (
              <div className="mt-6 text-right">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Iniciar Proceso de Revisión'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
