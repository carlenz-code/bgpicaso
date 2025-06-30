'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Clase = {
  id: number;
  titulo: string;
  institucion: string;
  nivel: string;
  fecha_creacion: string;
  duracion_video: string;
  user: {
    nombre_completo: string;
  };
};

export default function AuditorEntradas() {
  const [classes, setClasses] = useState<Clase[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://back-sgce.onrender.com/sesion')
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch((err) => {
        console.error('Error cargando clases:', err);
        toast.error('Error al cargar las clases');
      });
  }, []);

  const handleDelete = (id: number) => {
    const updated = classes.filter((cls) => cls.id !== id);
    setClasses(updated);
    toast.success('Clase eliminada con éxito (solo en frontend)');
  };

  const handleView = (id: number) => {
    router.push(`/auditor/previa/${id}`);
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate) return '—';
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col pl-2 pt-2">
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
                <thead className="bg-blue-50 text-sm font-normal text-black">
                  <tr>
                    <th className="pl-6 pr-2 py-3 font-medium">Nombre de Clase</th>
                    <th className="px-2 py-3 font-medium">Docente</th>
                    <th className="px-2 py-3 font-medium">Institución</th>
                    <th className="px-2 py-3 font-medium">Nivel</th>
                    <th className="px-2 py-3 font-medium">Videos cargados</th>
                    <th className="px-2 py-3 font-medium">Fecha de creación</th>
                    <th className="px-2 py-3 font-medium">Estado</th>
                    <th className="px-2 py-3 text-center font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.length > 0 ? (
                    classes.map((cls) => (
                      <tr key={cls.id} className="border-b hover:bg-gray-50">
                        <td className="pl-6 pr-2 py-3">{cls.titulo}</td>
                        <td className="px-2 py-3">{cls.user?.nombre_completo || '—'}</td>
                        <td className="px-2 py-3">{cls.institucion}</td>
                        <td className="px-2 py-3">{cls.nivel}</td>
                        <td className="px-2 py-3">
                          {cls.duracion_video ? '1 archivo' : '—'}
                        </td>
                        <td className="px-2 py-3">{formatDate(cls.fecha_creacion)}</td>
                        <td className="px-2 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            Revisado
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
