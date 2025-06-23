// src/app/planificador/nueva-clase/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircleIcon, InformationCircleIcon, DocumentTextIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import Tag from '@/components/Common/Tag';

export default function NewClassPage() {
  const { role } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    teacher: '',
    level: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedFile || !formData.title || !formData.institution || !formData.teacher || !formData.level) {
      toast.error('Por favor, completa todos los campos obligatorios (*) y sube un video.', {
        position: 'bottom-right',
        autoClose: 3000,
        style: {
          backgroundColor: '#EF4444',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '14px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins, sans-serif',
          marginRight: '20px',
          minWidth: '250px',
        },
        icon: <InformationCircleIcon className="h-6 w-6 text-white mr-2" />,
      });
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('institution', formData.institution);
    formDataToSend.append('teacher', formData.teacher);
    formDataToSend.append('level', formData.level);
    formDataToSend.append('description', formData.description || '');
    formDataToSend.append('video', selectedFile);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación

      const newClass = {
        id: Date.now(),
        title: formData.title,
        institution: formData.institution,
        teacher: formData.teacher,
        level: formData.level,
        status: 'En revisión',
        createdAt: new Date().toISOString(),
        videos: selectedFile ? [selectedFile.name] : [],
      };
      const savedClasses = JSON.parse(localStorage.getItem('createdClasses') || '[]');
      const updatedClasses = [...savedClasses, newClass];
      localStorage.setItem('createdClasses', JSON.stringify(updatedClasses));

      toast.success('Clase enviada para revisión con éxito!', {
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
      });
    } catch (error) {
      toast.error('Error al enviar la clase.', {
        position: 'bottom-right',
        autoClose: 3000,
        style: {
          backgroundColor: '#EF4444',
          color: '#FFFFFF',
          borderRadius: '8px',
          padding: '12px 20px',
          fontSize: '14px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Poppins, sans-serif',
          marginRight: '20px',
          minWidth: '250px',
        },
        icon: <InformationCircleIcon className="h-6 w-6 text-white mr-2" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-2">
    <ToastContainer />
    <div className="flex-1">
      {/* Contenedor externo con opacidad y sombra */}
      <div className="bg-white shadow-lg rounded-[20px] p-2 bg-opacity-40">
        {/* Contenedor interno con solo borde */}
        <div className="border border-[#E1E1E8] rounded-[20px] p-6 bg-white">
          <h2 className="text-base font-normal text-blue-600 mb-6 flex items-center gap-3">
            <CubeTransparentIcon className="h-5 w-5 text-blue-600" />
            Nueva Clase
            <Tag  icon={DocumentTextIcon}  color="blue" >Formulario</Tag>
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sección izquierda: Campos del formulario */}
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
                  className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej. Colegio San Juan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del docente <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej. Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nivel <span className="text-red-500">*</span>
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un nivel</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Universitario">Universitario</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción (Opcional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Detalles de la clase (opcional)"
                />
              </div>
            </div>
            {/* Línea vertical de separación */}
            <div className="hidden md:block border-l border-[#E1E1E8] mx-6"></div>
            {/* Sección derecha: Área de subida de video */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="border-2 border-dashed border-gray-300 rounded-[20px] p-6 text-center w-full">
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
              </div>
            </div>
          </div>
          {/* Botón de envío */}
          <div className="mt-6 text-right">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Iniciar Proceso de Revisión
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}