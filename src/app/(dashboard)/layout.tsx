// src/app/(dashboard)/layout.tsx
'use client';

import { ReactNode, useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import { BreadcrumbHeader } from '@/components/Breadcrumb/BreadcrumbHeader';
import BackgroundDecoration from '@/components/Background/BackgroundDecoration';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = (newCollapsedState: boolean) => {
    setIsCollapsed(newCollapsedState);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onCollapseToggle={handleCollapseToggle} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <BackgroundDecoration />
  <BreadcrumbHeader className={`px-4 py-3 ${isCollapsed ? 'ml-20' : 'ml-60'}`} />
  <main className={`flex-1 overflow-y-auto p-4 ${isCollapsed ? 'ml-20' : 'ml-60'}`}>
    {children}
  </main>
</div>


    </div>
  );
}