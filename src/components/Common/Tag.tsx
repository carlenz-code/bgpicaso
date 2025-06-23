'use client';

import { ReactNode } from 'react';

interface TagProps {
  icon: React.ElementType;
  children: ReactNode;
  color?: string; // por ejemplo: 'green', 'blue', etc.
}

export default function Tag({ icon: Icon, children, color = 'green' }: TagProps) {
  return (
    <div className={`inline-flex items-center gap-1 text-sm font-normal rounded-full px-2  bg-${color}-100 text-${color}-700`}>
      <Icon className="h-4 w-4" />
      {children}
    </div>
  );
}