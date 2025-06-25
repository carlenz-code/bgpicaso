// src/app/planificador/clases-creadas/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import Loader from '@/components/Common/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CheckCircleIcon,
  CubeTransparentIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default function CreatedClassesPage() {
  const { role } = useAuth();
  const [loading, setLoading] = useState(true);
  const [createdClasses, setCreatedClasses] = useState<
    {
      id: number;
      title: string;
      institution: string;
      teacher: string;
      level: string;
      status: string;
      createdAt: string;
      videos: string[];
    }[]
  >([]);
  const [selectedClass, setSelectedClass] = useState<{
    id: number;
    title: string;
    institution: string;
    teacher: string;
    level: string;
    status: string;
    createdAt: string;
    videos: string[];
  } | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
    title: 200,
    institution: 150,
    teacher: 150,
    level: 100,
    status: 100,
    createdAt: 150,
    actions: 100,
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeColumnIndex, setResizeColumnIndex] = useState<number | null>(null);
  const headerRefs = useRef<(HTMLTableHeaderCellElement | null)[]>([]);

  // Cargar clases desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('createdClasses');
    if (saved) {
      const parsed = JSON.parse(saved);
      const normalized = parsed.map((cls: any) => ({
        ...cls,
        videos: Array.isArray(cls.videos) ? cls.videos : [],
      }));
      setCreatedClasses(normalized);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  // Simular creación
  const simulateClassCreation = () => {
    const newClass = {
      id: Date.now(),
      title: `Clase de Matemáticas - ${Date.now()}`,
      institution: 'Colegio San Juan',
      teacher: 'Juan Pérez',
      level: 'Primaria',
      status: 'En revisión',
      createdAt: new Date().toISOString(),
      videos: [`video_${Date.now()}.mp4`],
    };
    const updated = [...createdClasses, newClass];
    setCreatedClasses(updated);
    localStorage.setItem('createdClasses', JSON.stringify(updated));
    toast.success('Clase simulada creada con éxito!', {
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
  };

  // Abrir edición
  const handleOpenEdit = (cls: any) => {
    setSelectedClass(cls);
    setEditedTitle(cls.title);
  };

  // Guardar edición
  const handleSaveEdit = () => {
    if (selectedClass && editedTitle) {
      const updated = createdClasses.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, title: editedTitle } : cls
      );
      setCreatedClasses(updated);
      localStorage.setItem('createdClasses', JSON.stringify(updated));
      setSelectedClass(null);
      toast.success('Título actualizado con éxito!', {
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

  // Eliminar clase
  const handleDeleteClass = (id: number) => {
    const updated = createdClasses.filter((cls) => cls.id !== id);
    setCreatedClasses(updated);
    localStorage.setItem('createdClasses', JSON.stringify(updated));
    toast.success('Clase eliminada con éxito!', {
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
  };

  // Redimensión
  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    setIsResizing(true);
    setResizeStartX(e.pageX);
    setResizeColumnIndex(index);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isResizing && resizeColumnIndex !== null) {
      const diff = e.pageX - resizeStartX;
      const newW = { ...columnWidths };
      const hdrs = headerRefs.current;
      if (hdrs[resizeColumnIndex]) {
        const curr = hdrs[resizeColumnIndex]!.offsetWidth;
        newW[Object.keys(columnWidths)[resizeColumnIndex]] = Math.max(50, curr + diff);
        setColumnWidths(newW);
        setResizeStartX(e.pageX);
      }
    }
  };
  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeColumnIndex(null);
  };

  return (
    <div
      className="flex flex-col pl-6 pt-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <ToastContainer />
      <div className="flex-1">
        <div className="bg-white shadow-lg rounded-[26px] p-2 bg-opacity-40">
          <div className="border border-[#E1E1E8] bg-white rounded-[20px]">
            {/* Header */}
            <div className="px-6 py-5 border-b flex items-center justify-between">
              <h2 className="text-base font-normal text-blue-600 flex items-center gap-3">
                <CubeTransparentIcon className="h-5 w-5 text-blue-600" />
                Registro de clases creadas
              </h2>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="min-w-[800px] w-full table-fixed text-sm text-left text-black">
                <thead className="bg-blue-50 text-sm font-medium text-black">
                  <tr>
                    <th
                      ref={(el) => { headerRefs.current[0] = el; }}
                      onMouseDown={(e) => handleMouseDown(0, e)}
                      className="pl-6 pr-2 py-3 w-[150px] truncate font-medium"
                    >
                      Nombre de Clase
                    </th>
                    <th className="px-2 py-3 w-[120px] truncate font-medium">
                      Institución
                    </th>
                    <th className="px-2 py-3 w-[120px] truncate font-medium">
                      Docente
                    </th>
                    <th className="px-2 py-3 w-[90px] truncate font-medium">Fecha</th>
                    <th className="px-2 py-3 w-[100px] truncate font-medium">Nivel</th>
                    <th className="px-2 py-3 w-[90px] truncate font-medium">Videos</th>
                    <th className="px-2 py-3 w-[100px] truncate font-medium">Estado</th>
                    <th className="pr-4 py-3 w-[100px] text-center font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {createdClasses.length ? (
                    createdClasses.map((cls) => (
                      <tr key={cls.id} className="border-b hover:bg-gray-50 h-[60px]">
                        <td className="pl-6 pr-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[210px]">
                          {cls.title}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                          {cls.institution}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                          {cls.teacher}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                          {new Date(cls.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                          {cls.level}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                          {cls.videos.length} videos
                        </td>
                        <td className="px-2 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              cls.status === 'En revisión'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {cls.status === 'En revisión' ? 'En espera' : 'Revisado'}
                          </span>
                        </td>
                        <td className="pr-4 py-3 flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(cls)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClass(cls.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                        No hay clases creadas aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de edición */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Editar Clase
            </h3>
            {/* ... resto del modal … */}
          </div>
        </div>
      )}
    </div>
  );
}
