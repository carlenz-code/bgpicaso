'use client';

import { useEffect, useState } from 'react';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface RubricaItem {
  id: number;
  criterios: string;
  factores: string;
  items: string;
}

interface ModeloResultado {
  id: number;
  estado: 'En inicio' | 'En Proceso' | 'Previsto' | 'Destacado';
  porcentaje: number;
  observaciones: string;
  recomendaciones: string;
}

interface ResultadoTabProps {
  resultados: ModeloResultado[];
}

export default function ResultadoTab({ resultados }: ResultadoTabProps) {
  const [rubricas, setRubricas] = useState<RubricaItem[]>([]);
  const [modalText, setModalText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const openModal = (text: string) => setModalText(text);
  const closeModal = () => setModalText(null);

  useEffect(() => {
    const fetchRubrica = async () => {
      try {
        const res = await fetch('https://back-sgce.onrender.com/rubrica');
        const data = await res.json();
        setRubricas(data.rubricas || []);
      } catch (err) {
        console.error('Error cargando rúbricas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRubrica();
  }, []);

  if (loading) {
    return <div className="p-4">Cargando rúbricas...</div>;
  }

  return (
    <div className="flex flex-col pl-1 pt-1">
      <div className="flex-1">
        <div className="bg-white shadow-lg rounded-[26px] p-2 bg-opacity-40">
          <div className="border border-[#E1E1E8] bg-white rounded-[20px]">
            <div className="px-6 py-5 border-b flex items-center justify-between">
              <h2 className="text-base font-normal text-blue-600 flex items-center gap-3">
                <CubeTransparentIcon className="h-5 w-5 text-blue-600" />
                Resultado de Evaluación de la clase
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full table-fixed text-sm text-left text-black">
                <thead className="bg-blue-50 text-sm font-medium text-black">
                  <tr>
                    <th className="pl-6 py-3 w-[200px] truncate font-medium">Criterio</th>
                    <th className="px-2 py-3 w-[120px] truncate font-medium">Descripción</th>
                    <th className="px-2 py-3 w-[120px] truncate font-medium">Resultado</th>
                    <th className="px-2 py-3 w-[200px] truncate font-medium">Observaciones</th>
                    <th className="px-2 py-3 w-[200px] truncate font-medium">Recomendaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rubricas.map((crit) => {
                    const res = resultados.find((r) => r.id === crit.id);
                    return (
                      <tr key={crit.id} className="border-b hover:bg-gray-50 align-top">
                        <td className="pl-6 py-3 align-top">{crit.criterios}</td>
                        <td className="px-2 py-3 align-top">
                          <button
                            onClick={() => openModal(crit.items)}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200"
                          >
                            Ver Detalle
                          </button>
                        </td>
                        <td className="px-2 py-3 align-top">
                          {res ? `${res.estado} ${res.porcentaje}%` : '—'}
                        </td>
                        <td className="px-2 py-3 align-top">
                          {res ? (
                            <div className="flex items-center justify-between">
                              <span className="truncate max-w-[150px] block">
                                {res.observaciones}
                              </span>
                              <button
                                onClick={() => openModal(res.observaciones)}
                                className="text-blue-600 text-xs hover:underline ml-2"
                              >
                                Ver más
                              </button>
                            </div>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="px-2 py-3 align-top">
                          {res ? (
                            <div className="flex items-center justify-between">
                              <span className="truncate max-w-[150px] block">
                                {res.recomendaciones}
                              </span>
                              <button
                                onClick={() => openModal(res.recomendaciones)}
                                className="text-blue-600 text-xs hover:underline ml-2"
                              >
                                Ver más
                              </button>
                            </div>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal con animación */}
      <AnimatePresence>
        {modalText && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-lg w-full mx-4 p-6 max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{modalText}</p>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
