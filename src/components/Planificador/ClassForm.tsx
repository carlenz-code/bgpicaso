'use client'

import { useEffect, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CubeTransparentIcon, CloudArrowUpIcon, PlusIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'



export interface RubricLevel {
  [level: string]: string
}

export interface RubricItem {
  id: number
  criterion: string
  weight_percent: number
  levels: RubricLevel
}

export interface ClassData {
  id?: number
  title: string
  institution: string
  teacher: string | number  // porque ahora puede ser el ID

  level: string
  subject: string
  date: string
  duration: string
  objectives: string[]
  resources: string[]
  activities: {
    start_min: number
    end_min: number
    activity: string
  }[]
  videos: string[]
  rubric?: RubricItem[]
  createdAt?: string
  status?: string
}

interface Props {
  mode: 'create' | 'view'
  initialData?: ClassData
  onSubmit?: (data: ClassData) => void
}

export default function ClassForm({ mode, initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState<ClassData>({
    title: '',
    institution: '',
    teacher: '',
    level: '',
    subject: '',
    date: '',
    duration: '',
    objectives: [''],
    resources: [''],
    activities: [{ start_min: 0, end_min: 0, activity: '' }],
    videos: [],
    rubric: []
  })

  const [teachers, setTeachers] = useState<{ id: number; nombre_completo: string }[]>([])
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isRubricModalOpen, setIsRubricModalOpen] = useState(false)
  const [newRubric, setNewRubric] = useState<RubricItem>({ id: 1, criterion: '', weight_percent: 0, levels: { '1': '', '2': '', '3': '', '4': '' } })
  const isReadOnly = mode === 'view'

  const inputClass = 'mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
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



 const submitClassToAPI = async () => {
  if (!videoFile) {
    toast.error('Por favor, sube una grabación.')
    return
  }

  // 🟡 Aquí obtienes el nombre completo del docente usando su ID
  const selectedTeacherName =
    teachers.find((t) => t.id === Number(formData.teacher))?.nombre_completo || ''

  const form = new FormData()
  form.append('titulo', formData.title)
  form.append('institucion', formData.institution)
  form.append('nivel', formData.level)
  form.append('fecha_dictada', formData.date)
  form.append('duracion_video', formData.duration.toString())
  form.append('descripcion', `Clase de ${formData.subject} - Docente: ${selectedTeacherName}`)
  form.append('id_user', '6') // Puedes hacerlo dinámico si tienes auth
  form.append('grabacion', videoFile)

  try {
    const res = await fetch('https://back-sgce.onrender.com/sesion/create-firebase', {
      method: 'POST',
      body: form,
    })

    const data = await res.json()

    if (res.ok) {
      toast.success('Clase enviada con éxito ✅')

      const fullWrappedData = {
        evaluator_id: 1,
        teacher_id: Number(formData.teacher),
        video_url: data.url,
        rubric_session: {
          session_number: 1,
          date: formData.date,
          teacher: selectedTeacherName, // <- aquí lo usamos
          subject: formData.subject,
          duration_minutes: Number(formData.duration),
          objectives: formData.objectives.filter(o => o.trim() !== ''),
          activities: formData.activities.filter(act => act.activity.trim() !== ''),
          resources: formData.resources.filter(r => r.trim() !== ''),
          rubric: formData.rubric || [],
        }
      }

      console.log(JSON.stringify(fullWrappedData, null, 2))
    } else {
      toast.error(`Error: ${data.message || 'No se pudo guardar'}`)
    }
  } catch (err) {
    console.error(err)
    toast.error('Error al enviar la clase')
  }
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const parsedValue = e.target.type === 'number' ? Number(value) : value
    setFormData((prev) => ({ ...prev, [name]: parsedValue }))
  }

  const handleArrayChange = (field: 'objectives' | 'resources', index: number, value: string) => {
    const updated = [...formData[field]]
    updated[index] = value
    setFormData((prev) => ({ ...prev, [field]: updated }))
  }

  const addToArray = (field: 'objectives' | 'resources') => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  const handleActivityChange = (index: number, field: keyof ClassData['activities'][0], value: string) => {
    const updated = [...formData.activities]
    updated[index] = { ...updated[index], [field]: field.includes('min') ? Number(value) : value }
    setFormData((prev) => ({ ...prev, activities: updated }))
  }

  const addActivity = () => {
    setFormData((prev) => ({ ...prev, activities: [...prev.activities, { start_min: 0, end_min: 0, activity: '' }] }))
  }

  const handleRubricLevelChange = (level: string, value: string) => {
    setNewRubric((prev) => ({ ...prev, levels: { ...prev.levels, [level]: value } }))
  }

  const addRubricItem = () => {
    setFormData((prev) => ({
      ...prev,
      rubric: [...(prev.rubric || []), { ...newRubric, id: Date.now() }]
    }))
    setNewRubric({ id: 1, criterion: '', weight_percent: 0, levels: { '1': '', '2': '', '3': '', '4': '' } })
    setIsRubricModalOpen(false)
  }

  const [videoFile, setVideoFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, videos: [file.name] }))
      setVideoFile(file) // Guardamos el archivo real
      setIsVideoModalOpen(false)
    }
  }


  return (
    <div className="flex flex-col pl-6 pt-4">
      <div className="bg-white shadow-lg rounded-[26px] p-2 bg-opacity-40">
        <div className="border border-[#E1E1E8] rounded-[20px] p-6 bg-white">
          <h2 className="text-base font-normal text-blue-600 mb-6 flex items-center gap-3">
            <CubeTransparentIcon className="h-5 w-5 text-blue-600" />
            {mode === 'create' ? 'Nueva Clase' : 'Detalle de Clase'}
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 space-y-4">
              <input name="title" placeholder="Título de la sesión" value={formData.title} onChange={handleInputChange} className={inputClass} />
              <input name="institution" placeholder="Institución" value={formData.institution} onChange={handleInputChange} className={inputClass} />
              <select name="teacher" value={formData.teacher} onChange={handleInputChange} className={inputClass}>
  <option value="">Selecciona un docente</option>
  {teachers.map((docente) => (
    <option key={docente.id} value={docente.id}>{docente.nombre_completo}</option>
  ))}
</select>

              <select name="level" value={formData.level} onChange={handleInputChange} className={inputClass}>
                <option value="">Selecciona un nivel</option>
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Universidad">Universidad</option>
              </select>
              <input name="subject" placeholder="Asignatura" value={formData.subject} onChange={handleInputChange} className={inputClass} />
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={inputClass} />
              <input
                type="number"
                name="duration"
                placeholder="Duración en minutos"
                value={formData.duration}
                onChange={handleInputChange}
                className={inputClass}
              />


              <div>
                <label className="text-sm font-medium text-gray-700">Agregar video</label>
                <button onClick={() => setIsVideoModalOpen(true)} className="mt-2 w-full border border-dashed border-gray-300 rounded-lg py-4 px-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <CloudArrowUpIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Carga una grabación</span>
                    <span className="text-xs text-gray-400">(2GB MAX)</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              {(['objectives', 'resources'] as const).map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium text-gray-700">{field === 'objectives' ? 'Objetivos' : 'Recursos'}:</label>
                  {formData[field].map((val, idx) => (
                    <input
                      key={idx}
                      value={val}
                      onChange={(e) => handleArrayChange(field, idx, e.target.value)}
                      className={inputClass}
                      placeholder={`${field === 'objectives' ? 'Objetivo' : 'Recurso'} ${idx + 1}`}
                    />
                  ))}
                  <button type="button" onClick={() => addToArray(field)} className="text-blue-500 mt-2">+ Agregar</button>
                </div>
              ))}

              <div>
                <label className="text-sm font-medium text-gray-700">Actividades cronológicas:</label>
                {formData.activities.map((act, idx) => (
                  <div key={idx} className="flex gap-2 mt-2">
                    <input type="number" value={act.start_min} onChange={(e) => handleActivityChange(idx, 'start_min', e.target.value)} className={`w-1/6 ${inputClass}`} placeholder="Inicio" />
                    <input type="number" value={act.end_min} onChange={(e) => handleActivityChange(idx, 'end_min', e.target.value)} className={`w-1/6 ${inputClass}`} placeholder="Fin" />
                    <input type="text" value={act.activity} onChange={(e) => handleActivityChange(idx, 'activity', e.target.value)} className={`flex-1 ${inputClass}`} placeholder="Descripción de la actividad" />
                  </div>
                ))}
                <button type="button" onClick={addActivity} className="text-blue-500 mt-2">+ Agregar actividad</button>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Rúbrica:</label>
                <button type="button" onClick={() => setIsRubricModalOpen(true)} className="text-blue-500 flex items-center mt-2">
                  <PlusIcon className="h-5 w-5 mr-1" /> Agregar rúbrica
                </button>
                {formData.rubric && formData.rubric.map((r) => (
                  <div key={r.id} className="mt-2 p-2 border rounded">
                    <strong>{r.criterion} ({r.weight_percent}%)</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Modal video*/}

      <Transition appear show={isVideoModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsVideoModalOpen(false)}>
          <Transition.Child as={Fragment}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel as={motion.div}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}

                className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-8 text-left shadow-xl"
              >
                <Dialog.Title className="text-blue-600 text-base font-medium mb-1">
                  Sube una sesión <span className="text-red-500">*</span>
                </Dialog.Title>
                <p className="text-sm text-gray-400 mb-4">Carga tus sesiones de clases aquí</p>

                <label htmlFor="video-upload" className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-xl py-10 px-6 text-center hover:border-blue-400 transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <ArrowUpTrayIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">Carga una grabación</span>
                    <span className="text-xs text-gray-400">(2GB MAX)</span>
                  </div>
                </label>

                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>


      {/* Modal de Rúbrica */}
      <Transition appear show={isRubricModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsRubricModalOpen(false)}>
          <Transition.Child as={Fragment}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl">
                <Dialog.Title className="text-lg font-medium text-gray-900">Agregar Rúbrica</Dialog.Title>
                <div className="mt-4 space-y-3">
                  <input placeholder="Criterio" value={newRubric.criterion} onChange={(e) => setNewRubric((prev) => ({ ...prev, criterion: e.target.value }))} className={inputClass} />
                  <input type="number" placeholder="Porcentaje" value={newRubric.weight_percent} onChange={(e) => setNewRubric((prev) => ({ ...prev, weight_percent: Number(e.target.value) }))} className={inputClass} />
                  {[4, 3, 2, 1].map((lvl) => (
                    <input key={lvl} placeholder={`Nivel ${lvl}`} value={newRubric.levels[lvl]} onChange={(e) => handleRubricLevelChange(String(lvl), e.target.value)} className={inputClass} />
                  ))}
                </div>
                <div className="mt-6 text-right">
                  <button onClick={addRubricItem} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Guardar rúbrica</button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>

      {mode === 'create' && (
        <div className="fixed bottom-6 right-9">
          <button
            onClick={submitClassToAPI}

            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-200"
          >
            Iniciar Clase
          </button>
        </div>
      )}

    </div>
  )
}
