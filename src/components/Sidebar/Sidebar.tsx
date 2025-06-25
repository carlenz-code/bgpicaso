"use client";
import { ReactElement, useState } from "react";
import Header from "./Subcomponents/Header";
import ActionButtons from "./Subcomponents/ActionButtons";
import NavSection from "./Subcomponents/NavSection";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  onCollapseToggle?: (isCollapsed: boolean) => void; // Nueva prop para notificar el colapso
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapseToggle }): ReactElement => {
  const { role } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseToggle) onCollapseToggle(newCollapsedState); // Notifica al padre
  };

  return (
    <div
      className={`h-screen bg-white border-r border-border-light flex flex-col fixed top-0 ${
        isCollapsed ? "w-20" : "w-56"
      } transition-all duration-300`}
    >
      <Header className="flex-shrink-0" isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <div className="flex-1 overflow-y-auto">
        <NavSection role={role} isCollapsed={isCollapsed} />
      </div>
      <ActionButtons role={role} className="flex-shrink-0"  isCollapsed={isCollapsed} />
    </div>
  );
};

export default Sidebar;