"use client";

import { ReactElement } from "react";
import {
  CubeTransparentIcon,
  BookmarkIcon,
  BookOpenIcon,
  CheckBadgeIcon,
  MapIcon,
  InformationCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link"; // Importar Link de Next.js

interface NavSectionProps {
  role: string;
  isCollapsed: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ role, isCollapsed }): ReactElement => {
  const sections = [
    {
      title: { collapsed: "PL", expanded: "Planificador" },
      items: [
        { name: "Nueva clase", icon: CubeTransparentIcon, path: "/planificador/nueva-clase" },
        { name: "Clases creadas", icon: BookmarkIcon, path: "/planificador/clases-creadas" },
      ],
      roles: ["planner", "auditor"], // Visible para planificador y auditor
    },
    ...(role === "auditor"
      ? [
          {
            title: { collapsed: "AU", expanded: "Auditor" },
            items: [{ name: "Entradas", icon: BookOpenIcon, path: "/auditor/entradas" }],
            roles: ["auditor"], // Solo para auditor
          },
        ]
      : []),
    {
      title: { collapsed: "IN", expanded: "Información" },
      items: [
        { name: "Rúbrica", icon: CheckBadgeIcon, path: "/informacion/rubrica" },
        { name: "Guía de uso", icon: MapIcon, path: "/informacion/guia-de-uso" },
        { name: "Ayuda", icon: InformationCircleIcon, path: "/informacion/ayuda" },
      ],
      roles: ["default", "planner", "auditor"], // Visible para todos
    },
  ];

  const positionTooltip = (e: React.MouseEvent<HTMLAnchorElement>, tooltip: HTMLElement) => {
    if (tooltip) {
      tooltip.style.display = "block";
      const buttonRect = e.currentTarget.getBoundingClientRect();
      tooltip.style.left = "64px";
      tooltip.style.top = `${buttonRect.top + 5}px`;
      tooltip.style.position = "fixed";
    }
  };

  return (
    <nav className="flex-1 p-4 space-y-6 relative">
      {sections.map((section, index) => (
        <div key={index}>
          {isCollapsed ? (
            <h3 className="text-sm font-normal text-text-secondary mb-2 text-center">{section.title.collapsed}</h3>
          ) : (
            <h3 className="text-sm font-normal text-text-secondary mb-2">{section.title.expanded}</h3>
          )}
          {section.items.map((item) => {
            const Icon = item.icon;
            return (
              <div className="relative group" key={item.name}>
                <Link
                  href={item.path}
                  className={`text-base w-full text-left p-2 text-black hover:bg-gray-100 rounded-xl flex items-center ${
                    isCollapsed ? "justify-center space-x-2" : "space-x-3"
                  } h-10`}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector("svg")?.classList.add("text-interactive-hover");
                    !isCollapsed && e.currentTarget.querySelector("span")?.classList.add("text-interactive-hover");
                    if (isCollapsed) positionTooltip(e, e.currentTarget.nextElementSibling as HTMLElement);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector("svg")?.classList.remove("text-interactive-hover");
                    !isCollapsed && e.currentTarget.querySelector("span")?.classList.remove("text-interactive-hover");
                    if (isCollapsed) {
                      const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                      if (tooltip) tooltip.style.display = "none";
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-2">{item.name}</span>}
                </Link>
                {isCollapsed && (
                  <span
                    className="hidden bg-sidebar-tooltip-bg text-brand-text text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap z-50 before:content-[''] before:absolute before:border-8 before:border-t-transparent before:border-b-transparent before:border-l-0 before:border-r-sidebar-tooltip-bg before:-left-2 before:top-1/2 before:-translate-y-1/2"
                    style={{ position: "fixed", top: 0, left: 0 }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
};

export default NavSection;