'use client';

export default function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* Esquina inferior derecha - más grande, más opacidad */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-[#A1B0FF] via-[#A1B0FF] to-white opacity-60 blur-[180px] rounded-full bottom-[-250px] right-[-150px]" />
      
      {/* Esquina superior izquierda - más definido */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-[#A1B0FF] to-white opacity-60 blur-[160px] rounded-full top-[-150px] left-[-150px]" />
    </div>
  );
}
