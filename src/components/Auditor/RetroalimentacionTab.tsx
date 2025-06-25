// src/components/Auditor/RetroalimentacionTab.tsx
'use client';

import { useState } from 'react';
import { BookOpenIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface RetroalimentacionTabProps {
  feedback: string;
}

export default function RetroalimentacionTab({ feedback }: RetroalimentacionTabProps) {
  const [show, setShow] = useState(false);

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-blue-600">Retroalimentación</h2>

      <div className="relative ml-5">
        {/* Línea vertical */}
        <div className="absolute top-6 left-3 w-0.5 h-full bg-blue-200" />

        <div className="relative z-10">
          <div className="flex items-start gap-3">
            {/* Icono circular */}
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpenIcon className="h-4 w-4 text-blue-600" />
            </div>
            {/* Botón para expandir */}
            <button
              onClick={() => setShow((prev) => !prev)}
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100"
            >
              Indicaciones
              <ClipboardIcon className="h-4 w-4 text-blue-600" />
            </button>
          </div>

          {/* Contenido expandible */}
          {show && (
            <div className="mt-3 ml-9 p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-sm text-gray-700">
              {feedback}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
