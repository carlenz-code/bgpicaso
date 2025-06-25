
// src/components/Common/ExpandableText.tsx
'use client';

import { useState } from 'react';

export default function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.length > 100 ? text.slice(0, 100) + '…' : text;

  return (
    <div>
      <p
        className={
          `text-sm text-gray-700 transition-all duration-300 ease-in-out overflow-hidden ` +
          (expanded ? 'max-h-screen' : 'max-h-12') +
          ' break-words whitespace-normal'
        }
      >
        {expanded ? text : preview}
      </p>
      {text.length > preview.length && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs text-blue-600 hover:underline"
        >
          {expanded ? 'Mostrar menos' : 'Leer más'}
        </button>
      )}
    </div>
  );
}