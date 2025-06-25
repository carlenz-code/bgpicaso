'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClassForm from '@/components/Planificador/ClassForm';
import { ToastContainer } from 'react-toastify';

type Clase = {
  id: number;
  title: string;
  institution: string;
  teacher: string;
  level: string;
  description?: string;
  videos: string[];
  status: string;
  createdAt: string;
};

export default function PreviaClasePage() {
  const { id } = useParams();
  const router = useRouter();
  const [clase, setClase] = useState<Clase | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('createdClasses');
    if (stored) {
      const parsed = JSON.parse(stored) as Clase[];
      const found = parsed.find((c) => c.id === Number(id));
      if (found) setClase(found);
    }
  }, [id]);

  const handleIniciarAuditoria = () => {
    router.push(`/auditor/clase/${id}`);
  };

  if (!clase) {
    return <p className="p-4">Cargando clase...</p>;
  }

  return (
    <div className="flex flex-col pl-6 pt-4">
      <ToastContainer />
      <div className="flex-1">
        <div className="bg-white shadow-lg rounded-[26px] p-2 bg-opacity-40">
          <div className="border border-[#E1E1E8] rounded-[20px] p-6 bg-white">
            <h2 className="text-base font-normal text-blue-600 mb-6">
              Vista previa de clase
            </h2>
            <ClassForm mode="view" initialData={clase} />


            <div className="mt-6 text-right">
              <button
                onClick={handleIniciarAuditoria}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Iniciar proceso de auditoría
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
