"use client";

import { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

interface ResumenTabProps {
  resumen: string;
  proposito: string;
}

export default function ResumenTab({ resumen, proposito }: ResumenTabProps) {
  const [showResumen, setShowResumen] = useState(false);
  const [showProposito, setShowProposito] = useState(false);

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-medium text-blue-600">Resumen del desarrollo del proceso</h2>

      {/* Línea vertical */}
      <div className="relative ml-5">
        <div className="absolute top-6 left-3 w-0.5 h-full bg-blue-200 z-0" />

        {/* Nodo 1 */}
        <div className="relative z-10">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpenIcon className="h-4 w-4 text-blue-600" />
            </div>
            <button
              onClick={() => setShowResumen((prev) => !prev)}
              className="text-sm font-normal text-blue-600 bg-blue-50 px-3 py-1 rounded-2xl hover:bg-blue-100"
            >
              Resumen General de la clase
            </button>
          </div>

          <div
            className={`ml-9 overflow-hidden transition-all duration-500 ease-in-out ${
              showResumen ? "max-h-screen opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="font-medium">Inicio</p>
              <p className="text-sm text-gray-700 mb-3">
                La clase comenzó con una breve dinámica de reflexión sobre las emociones que transmite la literatura. Se preguntó a los estudiantes: “¿Qué libro o historia te ha marcado y por qué?”. Esto sirvió como introducción al tema del día.
              </p>
              <p className="font-medium">Desarrollo</p>
              <p className="text-sm text-gray-700 mb-3">
                Se abordó el análisis del cuento “La casa de Asterión” de Jorge Luis Borges. Se explicó el contexto histórico y literario del autor, seguido de una lectura en voz alta del cuento. Luego, los estudiantes discutieron los elementos simbólicos del texto, especialmente la figura del Minotauro desde una perspectiva filosófica y existencial. Se promovió el debate mediante preguntas guiadas y trabajo en grupos pequeños.
              </p>
              <p className="font-medium">Cierre</p>
              <p className="text-sm text-gray-700">
                Se realizó una puesta en común de las ideas destacadas durante el análisis. La docente cerró la sesión con una breve reflexión sobre cómo Borges transforma mitos clásicos en relatos contemporáneos. Como tarea, se dejó un ensayo corto sobre el punto de vista del narrador en el cuento.
              </p>
            </div>
          </div>
        </div>

        {/* Nodo 2 */}
        <div className="relative z-10 mt-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpenIcon className="h-4 w-4 text-blue-600" />
            </div>
            <button
              onClick={() => setShowProposito((prev) => !prev)}
              className="text-sm font-normal text-blue-600 bg-blue-50 px-3 py-1 rounded-2xl hover:bg-blue-100"
            >
              Propósito de la Sesión
            </button>
          </div>

          <div
            className={`ml-9 overflow-hidden transition-all duration-500 ease-in-out ${
              showProposito ? "max-h-screen opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="text-sm text-gray-700">
                Analizar el cuento “La casa de Asterión” de Jorge Luis Borges, identificando sus elementos simbólicos y literarios, para desarrollar la capacidad crítica e interpretativa de los estudiantes a través de la lectura, el debate y la reflexión personal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
