// src/app/planificador/clases-creadas/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircleIcon, DocumentTextIcon, CubeTransparentIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Tag from '@/components/Common/Tag';

export default function CreatedClassesPage() {
  const { role } = useAuth();
  const [createdClasses, setCreatedClasses] = useState<
    { id: number; title: string; institution: string; teacher: string; level: string; status: string; createdAt: string; videos: string[] }[]
  >([]);
  const [selectedClass, setSelectedClass] = useState<
    { id: number; title: string; institution: string; teacher: string; level: string; status: string; createdAt: string; videos: string[] } | null
  >(null);
  const [editedTitle, setEditedTitle] = useState("");
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
  const headerRefs = useRef<(HTMLTableCellElement | null)[]>([]);

  // Cargar clases simuladas desde localStorage al montar el componente
  useEffect(() => {
    const savedClasses = localStorage.getItem('createdClasses');
    if (savedClasses) {
      const parsedClasses = JSON.parse(savedClasses);
      const normalizedClasses = parsedClasses.map((cls: any) => ({
        ...cls,
        videos: Array.isArray(cls.videos) ? cls.videos : [],
      }));
      setCreatedClasses(normalizedClasses);
    }
  }, []);

  // Simular creación de clase (para testing)
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
    const updatedClasses = [...createdClasses, newClass];
    setCreatedClasses(updatedClasses);
    localStorage.setItem('createdClasses', JSON.stringify(updatedClasses));
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
      icon: <CheckCircleIcon className='h-6 w-6 text-black mr-2' />,
    });
  };

  // Abrir panel de edición
  const handleOpenEdit = (cls: { id: number; title: string; institution: string; teacher: string; level: string; status: string; createdAt: string; videos: string[] }) => {
    setSelectedClass(cls);
    setEditedTitle(cls.title);
  };

  // Guardar cambios en el título
  const handleSaveEdit = () => {
    if (selectedClass && editedTitle) {
      const updatedClasses = createdClasses.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, title: editedTitle } : cls
      );
      setCreatedClasses(updatedClasses);
      localStorage.setItem('createdClasses', JSON.stringify(updatedClasses));
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
        icon: <CheckCircleIcon className='h-6 w-6 text-black mr-2' />,
      });
    }
  };

  // Eliminar clase
  const handleDeleteClass = (id: number) => {
    const updatedClasses = createdClasses.filter((cls) => cls.id !== id);
    setCreatedClasses(updatedClasses);
    localStorage.setItem('createdClasses', JSON.stringify(updatedClasses));
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
      icon: <CheckCircleIcon className='h-6 w-6 text-black mr-2' />,
    });
  };

  // Manejar inicio de redimensión
  const handleMouseDown = (index: number, e: React.MouseEvent) => {
    setIsResizing(true);
    setResizeStartX(e.pageX);
    setResizeColumnIndex(index);
  };

  // Manejar redimensión mientras se arrastra
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isResizing && resizeColumnIndex !== null) {
      const diff = e.pageX - resizeStartX;
      const newWidths = { ...columnWidths };
      const headers = headerRefs.current;
      if (headers[resizeColumnIndex]) {
        const currentWidth = headers[resizeColumnIndex]!.offsetWidth;
        const newWidth = Math.max(50, currentWidth + diff); // Mínimo 50px
        newWidths[Object.keys(columnWidths)[resizeColumnIndex]] = newWidth;
        setColumnWidths(newWidths);
        setResizeStartX(e.pageX);
      }
    }
  };

  // Manejar fin de redimensión
  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeColumnIndex(null);
  };

  return (
    <div className="flex flex-col p-2" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
    <ToastContainer />
    <div className="flex-1">
      {/* Contenedor externo con opacidad y sombra */}
      <div className="bg-white shadow-lg rounded-[20px] p-2 bg-opacity-40">
        {/* Contenedor interno con solo borde */}
        <div className="border border-[#E1E1E8] bg-white rounded-[20px]">
          {/* Fila superior con padding para textos */}
          <div className="p-6">
            <h2 className="text-xl font-normal text-blue-600 mb-6 flex items-center gap-3">
              <CubeTransparentIcon className="h-6 w-6 text-blue-600" />
              Clases Creadas
              <Tag icon={DocumentTextIcon} color="blue">Lista</Tag>
            </h2>
            {/* Botón simulado para agregar clase */}
            <button
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={simulateClassCreation}
            >
              Simular Creación de Clase
            </button>
          </div>
          {/* Fila inferior para la tabla sin padding lateral */}
          <div>
            <table className="w-full table-fixed text-sm text-left text-gray-700">
              <thead className="bg-gray-50">
                <tr>
                  {['title', 'institution', 'teacher', 'level', 'status', 'createdAt', 'actions'].map((key, index) => (
                    <th
                      key={key}
                      ref={(el) => {
                        if (el) headerRefs.current[index] = el; // Asignación segura
                      }}
                      className="px-2 py-2 relative"
                      style={{ width: `${columnWidths[key]}px` }}
                    >
                      {key === 'title' && 'Título'}
                      {key === 'institution' && 'Institución'}
                      {key === 'teacher' && 'Docente'}
                      {key === 'level' && 'Nivel'}
                      {key === 'status' && 'Estado'}
                      {key === 'createdAt' && 'Fecha'}
                      {key === 'actions' && 'Acciones'}
                      <div
                        className="absolute right-0 top-0 w-1 h-full bg-gray-300 cursor-col-resize"
                        onMouseDown={(e) => handleMouseDown(index, e)}
                        style={{ display: index === 6 ? 'none' : 'block' }} // Ocultar resizer en la última columna
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {createdClasses.length > 0 ? (
                  createdClasses.map((cls) => (
                    <tr key={cls.id} className="border-b hover:bg-gray-50">
                      <td className="px-2 py-2 overflow-hidden text-ellipsis whitespace-nowrap" style={{ width: `${columnWidths.title}px` }}>
                        {cls.title}
                      </td>
                      <td className="px-2 py-2 overflow-hidden text-ellipsis whitespace-nowrap" style={{ width: `${columnWidths.institution}px` }}>
                        {cls.institution}
                      </td>
                      <td className="px-2 py-2 overflow-hidden text-ellipsis whitespace-nowrap" style={{ width: `${columnWidths.teacher}px` }}>
                        {cls.teacher}
                      </td>
                      <td className="px-2 py-2 overflow-hidden text-ellipsis whitespace-nowrap" style={{ width: `${columnWidths.level}px` }}>
                        {cls.level}
                      </td>
                      <td className="px-2 py-2" style={{ width: `${columnWidths.status}px` }}>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            cls.status === 'En revisión' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {cls.status}
                        </span>
                      </td>
                      <td className="px-2 py-2 overflow-hidden text-ellipsis whitespace-nowrap" style={{ width: `${columnWidths.createdAt}px` }}>
                        {new Date(cls.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-2 flex space-x-2" style={{ width: `${columnWidths.actions}px` }}>
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
                    <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Clase</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Videos Cargados</label>
                {selectedClass.videos.map((video, index) => (
                  <div key={index} className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-700">{video}</span>
                    <button
                      onClick={() => {
                        const updatedVideos = selectedClass.videos.filter((_, i) => i !== index);
                        const updatedClasses = createdClasses.map((cls) =>
                          cls.id === selectedClass.id ? { ...cls, videos: updatedVideos } : cls
                        );
                        setCreatedClasses(updatedClasses);
                        localStorage.setItem('createdClasses', JSON.stringify(updatedClasses));
                        toast.success('Video eliminado con éxito!', {
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
                          icon: <CheckCircleIcon className='h-6 w-6 text-black mr-2' />,
                        });
                      }}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {selectedClass.videos.length === 0 && (
                  <p className="text-sm text-gray-500">No hay videos cargados.</p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  onClick={() => setSelectedClass(null)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleSaveEdit}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
}