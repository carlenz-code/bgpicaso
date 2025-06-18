"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { role } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = (newCollapsedState: boolean) => {
    setIsCollapsed(newCollapsedState);
  };

  return (
    <div className="flex h-full">
      <Sidebar onCollapseToggle={handleCollapseToggle} />
      <main className={`flex-1 p-4 overflow-y-auto ${isCollapsed ? "ml-20" : "ml-64"}`}>
        {children}
      </main>
    </div>
  );
}