'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Clase = {
  id: number;
  title: string;
  institution: string;
  teacher: string;
  level: string;
  status: string;
  createdAt: string;
  videos: string[];
};

export default function AuditorEntradas() {
  const [classes, setClasses] = useState<Clase[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('createdClasses');
    if (saved) {
      setClasses(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = classes.filter((cls) => cls.id !== id);
    setClasses(updated);
    localStorage.setItem('createdClasses', JSON.stringify(updated));
    toast.success('Clase eliminada con éxito');
  };

  const handleView = (id: number) => {
    router.push(`/auditor/previa/${id}`);
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col pl-6 pt-4">
      <ToastContainer />
      <div className="flex-1">
        <div className="bg-white shadow-lg rounded-[26px] p-2 bg-opacity-40">
          <div className="border border-[#E1E1E8] bg-white rounded-[20px]">
            <div className="px-6 py-5 border-b flex items-center justify-between">
              <h2 className="text-base font-normal text-blue-600 flex items-center gap-3">
                Bandeja de clases recibidas
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full table-fixed text-sm text-left text-black">
                <thead className="bg-blue-50 text-sm font-medium text-black">
                  <tr>
                    <th className="pl-6 pr-2 py-3">Nombre de Clase</th>
                    <th className="px-2 py-3">Docente</th>
                    <th className="px-2 py-3">Institución</th>
                    <th className="px-2 py-3">Nivel</th>
                    <th className="px-2 py-3">Videos cargados</th>
                    <th className="px-2 py-3">Fecha de creación</th>
                    <th className="px-2 py-3">Estado</th>
                    <th className="px-2 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.length > 0 ? (
                    classes.map((cls) => (
                      <tr key={cls.id} className="border-b hover:bg-gray-50">
                        <td className="pl-6 pr-2 py-3">{cls.title}</td>
                        <td className="px-2 py-3">{cls.teacher}</td>
                        <td className="px-2 py-3">{cls.institution}</td>
                        <td className="px-2 py-3">{cls.level}</td>
                        <td className="px-2 py-3">
                          {cls.videos && cls.videos.length > 0
                            ? `${cls.videos.length} archivo(s)`
                            : '—'}
                        </td>
                        <td className="px-2 py-3">{formatDate(cls.createdAt)}</td>
                        <td className="px-2 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              cls.status === 'En revisión' || cls.status === 'En espera'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {cls.status === 'En revisión' ? 'En espera' : 'Revisado'}
                          </span>
                        </td>
                        <td className="px-2 py-3 flex gap-3 justify-center">
                          <button
                            onClick={() => handleView(cls.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(cls.id)}
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
                        No hay clases recibidas aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
