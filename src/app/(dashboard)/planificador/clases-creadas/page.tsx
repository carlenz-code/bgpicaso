"use client";

import { useAuth } from "@/context/AuthContext";
import InfoBanner from "@/components/Common/InfoBanner";
import { CubeTransparentIcon, XMarkIcon, PencilIcon, TrashIcon, PlayIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatedClassesPage() {
  const { role } = useAuth();
  const [createdClasses, setCreatedClasses] = useState<
    { id: number; title: string; institution: string; teacher: string; level: string; status: string; createdAt: string; videos: string[] }[]
  >([]);
  const [selectedClass, setSelectedClass] = useState<
    { id: number; title: string; institution: string; teacher: string; level: string; status: string; createdAt: string; videos: string[] } | null
  >(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showEditPanel, setShowEditPanel] = useState(false);

  // Cargar clases simuladas desde localStorage al montar el componente
  useEffect(() => {
    const savedClasses = localStorage.getItem("createdClasses");
    if (savedClasses) {
      const parsedClasses = JSON.parse(savedClasses);
      // Asegurar que todas las clases tengan la propiedad videos como arreglo
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
      institution: "Colegio San Juan",
      teacher: "Juan Pérez",
      level: "Primaria",
      status: "En revisión",
      createdAt: new Date().toISOString(),
      videos: [`video_${Date.now()}.mp4`], // Simulación de videos
    };
    const updatedClasses = [...createdClasses, newClass];
    setCreatedClasses(updatedClasses);
    localStorage.setItem("createdClasses", JSON.stringify(updatedClasses));
    toast.success("Clase simulada creada con éxito!", {
      position: "bottom-right",
      autoClose: 3000,
      style: {
        backgroundColor: "#BBF7D0",
        border: "1px solid #22C55E",
        color: "black",
        borderRadius: "8px",
        padding: "12px 20px",
        fontSize: "14px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins, sans-serif",
        marginRight: "20px",
        minWidth: "250px",
      },
      icon: <CheckCircleIcon className="h-6 w-6 text-black mr-2" />,
    });
  };

  // Abrir panel de edición
  const handleOpenEdit = (cls: { id: number; title: string; institution: string; teacher: string; level: string; status: string; createdAt: string; videos: string[] }) => {
    setSelectedClass(cls);
    setEditedTitle(cls.title);
    setShowEditPanel(true);
  };

  // Guardar cambios en el título
  const handleSaveEdit = () => {
    if (selectedClass && editedTitle) {
      const updatedClasses = createdClasses.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, title: editedTitle } : cls
      );
      setCreatedClasses(updatedClasses);
      localStorage.setItem("createdClasses", JSON.stringify(updatedClasses));
      setShowEditPanel(false);
      toast.success("Título actualizado con éxito!", {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          backgroundColor: "#BBF7D0",
          border: "1px solid #22C55E",
          color: "black",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "Poppins, sans-serif",
          marginRight: "20px",
          minWidth: "250px",
        },
        icon: <CheckCircleIcon className="h-6 w-6 text-black mr-2" />,
      });
    }
  };

  // Eliminar video
  const handleDeleteVideo = (videoIndex: number) => {
    if (selectedClass) {
      const updatedVideos = selectedClass.videos.filter((_, index: number) => index !== videoIndex);
      const updatedClasses = createdClasses.map((cls) =>
        cls.id === selectedClass.id ? { ...cls, videos: updatedVideos } : cls
      );
      setCreatedClasses(updatedClasses);
      localStorage.setItem("createdClasses", JSON.stringify(updatedClasses));
      toast.success("Video eliminado con éxito!", {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          backgroundColor: "#BBF7D0",
          border: "1px solid #22C55E",
          color: "black",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "Poppins, sans-serif",
          marginRight: "20px",
          minWidth: "250px",
        },
        icon: <CheckCircleIcon className="h-6 w-6 text-black mr-2" />,
      });
    }
  };

  console.log("Rol en CreatedClassesPage:", role);

  return (
    <div className="flex flex-col">
      <ToastContainer />
      {/* InfoBanner casi pegado al top con ancho ampliado */}
      <div className="max-w-5xl ml-0">
        <InfoBanner
          text="Aquí puedes ver todas las clases que has creado y su estado actual. ¡Revisa y gestiona tus clases!"
        />
      </div>
      {/* Contenedor externo del formulario con borde gris y encabezado */}
      <div className="w-full flex-1 bg-white rounded-lg p-6 pb-12 mt-6 border border-border-light">
        {/* Encabezado con minicontenedor corregido */}
        <div className="border border-border-light rounded-lg p-1 flex items-center w-72">
          <div className="w-10 h-10 bg-banner-bg rounded-md flex items-center justify-center mr-2 ml-2 border-border-light">
            <CubeTransparentIcon className="h-6 w-6 text-banner-text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-md text-gray-900">Clases Creadas</h3>
            <p className="text-sm pb-1 text-gray-500">Opciones / Clases Creadas</p>
          </div>
        </div>
        {/* Línea divisoria debajo del encabezado */}
        <div className="border-b border-border-light my-4"></div>
        {/* Botón simulado para agregar clase (para testing) */}
        <button
          className="mb-4 px-4 py-2 bg-banner-bg text-banner-text-primary rounded-md hover:bg-indigo-200"
          onClick={simulateClassCreation}
        >
          Simular Creación de Clase
        </button>
        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-white border border-border-light rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleOpenEdit(cls)}
            >
              <h3 className="text-lg font-semibold text-gray-900">{cls.title}</h3>
              <p className="text-sm text-gray-600">Institución: {cls.institution}</p>
              <p className="text-sm text-gray-600">Docente: {cls.teacher}</p>
              <p className="text-sm text-gray-600">Nivel: {cls.level}</p>
              <p className="text-sm text-gray-600">Estado: {cls.status}</p>
              <p className="text-sm text-gray-600">Fecha: {new Date(cls.createdAt).toLocaleDateString()}</p>
              <div className="mt-2 flex space-x-2">
                <span className="text-sm text-blue-500">Videos: {cls.videos.length}</span>
              </div>
            </div>
          ))}
          {createdClasses.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No hay clases creadas aún.</p>
          )}
        </div>
      </div>

      {/* Panel de edición */}
      {showEditPanel && selectedClass && (
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
              {selectedClass.videos.map((video: string, index: number) => (
                <div key={index} className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <PlayIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-700">{video}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteVideo(index)}
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
                onClick={() => setShowEditPanel(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-banner-bg text-banner-text-primary rounded-md hover:bg-indigo-200"
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