"use client";

import { useAuth } from "@/context/AuthContext";
import InfoBanner from "@/components/Common/InfoBanner";
import { CubeTransparentIcon, XMarkIcon, SparklesIcon, InformationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewClassPage() {
  const { role } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    institution: "",
    teacher: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log("Rol en NewClassPage:", role);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success("Video cargado con éxito!", {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null); // Limpiar mensaje de error al editar
  };

  const handleSubmit = async () => {
    if (!selectedFile || !formData.title || !formData.institution || !formData.teacher) {
      toast.error("Por favor, completa todos los campos obligatorios (*) y sube un video.", {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "Poppins, sans-serif",
          marginRight: "20px",
          minWidth: "250px",
        },
        icon: <InformationCircleIcon className="h-6 w-6 text-white mr-2" />,
      });
      setErrorMessage("Por favor, completa todos los campos obligatorios (*) y sube un video.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("institution", formData.institution);
    formDataToSend.append("teacher", formData.teacher);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("video", selectedFile);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación

      // Simular creación y guardar en localStorage
      const newClass = {
        id: Date.now(),
        title: formData.title,
        institution: formData.institution,
        teacher: formData.teacher,
        status: "En revisión",
        createdAt: new Date().toISOString(),
        videos: selectedFile ? [selectedFile.name] : [], // Añadir nombre del video
      };
      const savedClasses = JSON.parse(localStorage.getItem("createdClasses") || "[]");
      const updatedClasses = [...savedClasses, newClass];
      localStorage.setItem("createdClasses", JSON.stringify(updatedClasses));

      toast.success("Clase enviada para revisión con éxito!", {
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
    } catch (error) {
      toast.error("Error al enviar la clase.", {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          backgroundColor: "#EF4444",
          color: "#FFFFFF",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontFamily: "Poppins, sans-serif",
          marginRight: "20px",
          minWidth: "250px",
        },
        icon: <InformationCircleIcon className="h-6 w-6 text-white mr-2" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <ToastContainer /> {/* Contenedor de toasts */}
      {/* InfoBanner casi pegado al top con ancho ampliado */}
      <div className="max-w-5xl ml-0">
        <InfoBanner
          text="En esta vista puedes crear una nueva clase, agregar detalles como fecha y tema, y guardarla para su evaluación posterior. ¡Explora y comparte tu feedback!"
        />
      </div>
      {/* Contenedor externo del formulario con borde gris y encabezado */}
      <div className="w-full flex-1 bg-white rounded-lg p-6 pb-12 mt-6 border border-border-light">
        {/* Encabezado con minicontenedor corregido */}
        <div className="border border-border-light rounded-lg p-1 flex items-center w-64">
          <div className="w-10 h-10 bg-banner-bg rounded-md flex items-center justify-center mr-2 ml-2 border-border-light">
            <CubeTransparentIcon className="h-6 w-6 text-banner-text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-md text-gray-900">Nueva clase</h2>
            <p className="text-sm pb-1 text-gray-500">Opciones / nueva clase</p>
          </div>
        </div>
        {/* Línea divisoria debajo del encabezado */}
        <div className="border-b border-border-light my-4"></div>
        {/* Contenedor del formulario dividido en dos mitades con línea vertical */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título de la sesión <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej. Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-2 p-3 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Detalles de la clase (opcional)"
              ></textarea>
            </div>
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
          <div className="h-full border-l border-border-light">
            <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 ml-4">
              <label htmlFor="video-upload" className="cursor-pointer text-center">
                {!selectedFile && (
                  <>
                    <SparklesIcon className="h-6 w-6 text-blue-500 mx-auto" />
                    <p className="text-gray-500 mt-2">Sube un video o grabación aquí</p>
                  </>
                )}
                {selectedFile && (
                  <p className="text-sm text-gray-700">{selectedFile.name}</p>
                )}
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-banner-bg text-banner-text-primary rounded-md hover:bg-indigo-200"
                onClick={() => document.getElementById("video-upload")?.click()}
              >
                Adjuntar
              </button>
            </div>
          </div>
        </div>
        {/* Línea divisoria superior antes de los botones */}
        <div className="border-t border-border-light my-6"></div>
        {/* Sección de botones y estado */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="flex items-center px-4 py-2 bg-banner-bg text-banner-text-primary rounded-md hover:bg-indigo-200"
            disabled={isSubmitting}
          >
            <XMarkIcon className="h-5 w-5 mr-2" /> Cancelar
          </button>
          <button
            className="px-4 py-2 bg-banner-bg text-banner-text-primary rounded-md hover:bg-indigo-200"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Iniciar proceso de Revisión
          </button>
        </div>
      </div>
    </div>
  );
}