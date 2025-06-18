"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  institution: string;
  teacher: string;
  level: string;
  description: string;
  video: string | File;
}

interface FormErrors {
  title?: string;
  institution?: string;
  teacher?: string;
  level?: string;
  description?: string;
  video?: string;
}

const FormContainer: React.FC = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    title: "",
    institution: "",
    teacher: "",
    level: "",
    description: "",
    video: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, video: file }));
      setErrors((prev) => ({ ...prev, video: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title) newErrors.title = "El título es requerido";
    if (!form.institution) newErrors.institution = "La institución es requerida";
    if (!form.teacher) newErrors.teacher = "El nombre del docente es requerido";
    if (!form.level) newErrors.level = "El nivel es requerido";
    if (!form.video) newErrors.video = "El video es requerido";
    else if (typeof form.video === "string" && !form.video.trim()) {
      newErrors.video = "El enlace del video no puede estar vacío";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newClass = {
      id: Date.now().toString(),
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const storedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    localStorage.setItem("classes", JSON.stringify([...storedClasses, newClass]));

    setSuccess("Clase creada y enviada para revisión.");
    setForm({
      title: "",
      institution: "",
      teacher: "",
      level: "",
      description: "",
      video: "",
    });
    setTimeout(() => router.push("/clases-creadas"), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título de la sesión</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Ej. Clase de Matemáticas - Fracciones"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Institución</label>
          <input
            type="text"
            name="institution"
            value={form.institution}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Ej. Colegio San Juan"
          />
          {errors.institution && <p className="text-red-500 text-sm">{errors.institution}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del docente</label>
          <input
            type="text"
            name="teacher"
            value={form.teacher}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Ej. Juan Pérez"
          />
          {errors.teacher && <p className="text-red-500 text-sm">{errors.teacher}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Selecciona un nivel</option>
            <option value="Inicial">Inicial</option>
            <option value="Primaria">Primaria</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Superior">Superior</option>
          </select>
          {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            placeholder="Detalles de la clase (opcional)"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Video</label>
          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            <p className="text-gray-500">Sube un video o grabación aquí</p>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-banner-text-primary file:text-white hover:file:bg-indigo-700"
            />
            <p className="text-sm text-gray-500 mt-2">O pega un enlace de Zoom/grabación:</p>
            <input
              type="url"
              name="video"
              value={typeof form.video === "string" ? form.video : ""}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Ej. https://zoom.us/rec/..."
            />
          </div>
          {errors.video && <p className="text-red-500 text-sm">{errors.video}</p>}
        </div>
        <div className="col-span-2 flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/clases-creadas")}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-banner-text-primary text-white rounded-md hover:bg-indigo-700"
          >
            Iniciar proceso de Revisión
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;