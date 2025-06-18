"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Class {
  id: string;
  title: string;
  institution: string;
  teacher: string;
  level: string;
  description: string;
  video: string | File;
  status: string;
  createdAt: string;
}

export default function EntriesPage() {
  const { role } = useAuth();
  const router = useRouter();
  const [classes, setClasses] = useState<Class[]>([]);

  if (role !== "auditor") {
    router.push("/");
    return null;
  }

  useEffect(() => {
    const storedClasses = JSON.parse(localStorage.getItem("classes") || "[]");
    setClasses(storedClasses);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Bandeja de Entradas</h1>
      {classes.length === 0 ? (
        <p className="text-gray-500">No hay clases pendientes.</p>
      ) : (
        <ul className="space-y-4">
          {classes.map((cls) => (
            <li key={cls.id} className="p-4 border rounded-md">
              <h2 className="text-lg font-medium">{cls.title}</h2>
              <p>Institución: {cls.institution}</p>
              <p>Docente: {cls.teacher}</p>
              <p>Nivel: {cls.level}</p>
              <p>Descripción: {cls.description || "Sin descripción"}</p>
              <p>Video: {typeof cls.video === "string" ? cls.video : "Archivo subido"}</p>
              <button
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={() => alert("Iniciar proceso de auditoría (próxima funcionalidad)")}
              >
                Iniciar proceso de auditoría
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}