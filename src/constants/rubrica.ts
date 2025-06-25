// src/constants/rubrica.ts
export const RUBRICA = [
  {
    id: 'planificacion',
    label: 'Planificación de Aprendizajes Esperados',
    descripcion: 'Define objetivos claros de aprendizaje vinculados al contenido y los resultados esperados de la sesión.',
  },
  {
    id: 'participacion',
    label: 'Participación Estudiantil',
    descripcion: 'Mide el grado de involucramiento activo de los estudiantes durante la clase.',
  },
  // Agrega aquí más ítems de la rúbrica según tu diseño
] as const;

export type RubricaItem = typeof RUBRICA[number];
