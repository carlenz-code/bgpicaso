"use client";
import { ReactElement } from "react";
import { ChevronRightIcon, CubeTransparentIcon, BookmarkIcon, BookOpenIcon, CheckCircleIcon, QuestionMarkCircleIcon, InformationCircleIcon, MapIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

interface NavSectionProps {
  role: string;
  isCollapsed: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ role, isCollapsed }): ReactElement => {
  const plannerItems = [
    { name: "Nueva clase", icon: CubeTransparentIcon },
    { name: "Clases creadas", icon: BookmarkIcon },
  ];

  const auditorItems = [
    { name: "Entradas", icon: BookOpenIcon },
  ];

  const infoItems = [
    { name: "Rúbrica", icon: CheckBadgeIcon },
    { name: "Guía de uso", icon: MapIcon },
    { name: "Ayuda", icon: InformationCircleIcon },
  ];

  return (
    <nav className="flex-1 p-4 space-y-6 relative">
      {/* Sección Planificador */}
      <div>
        {isCollapsed ? (
          <h3 className="text-sm font-normal text-gray-500 mb-2 text-center">PL</h3>
        ) : (
          <h3 className="text-sm font-normal text-gray-500 mb-2">Planificador</h3>
        )}
        {plannerItems.map((item) => {
          const Icon = item.icon;
          return (
            <div className="relative group" key={item.name}>
              <button
                className={`text-base w-full text-left p-2 text-black hover:bg-gray-100 rounded-xl flex items-center ${isCollapsed ? "justify-center space-x-2" : "space-x-3"} h-10`}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector("svg")?.classList.add("text-blue-600");
                  !isCollapsed && e.currentTarget.querySelector("span")?.classList.add("text-blue-600");
                  if (isCollapsed) {
                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                    if (tooltip) {
                      tooltip.style.display = "block";
                      const buttonRect = e.currentTarget.getBoundingClientRect();
                      tooltip.style.left = "64px"; // Afuera del sidebar
                      tooltip.style.top = `${buttonRect.top + (buttonRect.height / 2) - 10}px`; // Centrar verticalmente
                      tooltip.style.position = "fixed";
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector("svg")?.classList.remove("text-blue-600");
                  !isCollapsed && e.currentTarget.querySelector("span")?.classList.remove("text-blue-600");
                  if (isCollapsed) {
                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                    if (tooltip) tooltip.style.display = "none";
                  }
                }}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">{item.name}</span>}
              </button>
              {isCollapsed && (
                <span
                  className="hidden bg-blue-900 text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap z-50"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    clipPath: "polygon(0 0, 10px 0, 0 10px, 100% 10px, 100% 100%, 0 100%)" // Forma con esquina recortada
                  }}
                >
                  {item.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Sección Auditor (si aplica) */}
      {role === "auditor" && (
        <div>
          {isCollapsed ? (
            <h3 className="text-sm font-normal text-gray-500 mb-2 text-center">AU</h3>
          ) : (
            <h3 className="text-sm font-normal text-gray-500 mb-2">Auditor</h3>
          )}
          {auditorItems.map((item) => {
            const Icon = item.icon;
            return (
              <div className="relative group" key={item.name}>
                <button
                  className={`text-base w-full text-left p-2 text-black hover:bg-gray-100 rounded-xl flex items-center ${isCollapsed ? "justify-center space-x-2" : "space-x-3"} h-10`}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector("svg")?.classList.add("text-blue-600");
                    !isCollapsed && e.currentTarget.querySelector("span")?.classList.add("text-blue-600");
                    if (isCollapsed) {
                      const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                      if (tooltip) {
                        tooltip.style.display = "block";
                        const buttonRect = e.currentTarget.getBoundingClientRect();
                        tooltip.style.left = "64px"; // Afuera del sidebar
                        tooltip.style.top = `${buttonRect.top + (buttonRect.height / 2) - 10}px`; // Centrar verticalmente
                        tooltip.style.position = "fixed";
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector("svg")?.classList.remove("text-blue-600");
                    !isCollapsed && e.currentTarget.querySelector("span")?.classList.remove("text-blue-600");
                    if (isCollapsed) {
                      const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                      if (tooltip) tooltip.style.display = "none";
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-2">{item.name}</span>}
                </button>
                {isCollapsed && (
                  <span
                    className="hidden bg-blue-900 text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap z-50"
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      clipPath: "polygon(0 0, 10px 0, 0 10px, 100% 10px, 100% 100%, 0 100%)" // Forma con esquina recortada
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Sección Información */}
      <div>
        {isCollapsed ? (
          <h3 className="text-sm font-normal text-gray-500 mb-2 text-center">IN</h3>
        ) : (
          <h3 className="text-sm font-normal text-gray-500 mb-2">Información</h3>
        )}
        {infoItems.map((item) => {
          const Icon = item.icon;
          return (
            <div className="relative group" key={item.name}>
              <button
                className={`text-base w-full text-left p-2 text-black hover:bg-gray-100 rounded-xl flex items-center ${isCollapsed ? "justify-center space-x-2" : "space-x-3"} h-10`}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector("svg")?.classList.add("text-blue-600");
                  !isCollapsed && e.currentTarget.querySelector("span")?.classList.add("text-blue-600");
                  if (isCollapsed) {
                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                    if (tooltip) {
                      tooltip.style.display = "block";
                      const buttonRect = e.currentTarget.getBoundingClientRect();
                      tooltip.style.left = "64px"; // Afuera del sidebar
                      tooltip.style.top = `${buttonRect.top + (buttonRect.height / 2) - 10}px`; // Centrar verticalmente
                      tooltip.style.position = "fixed";
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector("svg")?.classList.remove("text-blue-600");
                  !isCollapsed && e.currentTarget.querySelector("span")?.classList.remove("text-blue-600");
                  if (isCollapsed) {
                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                    if (tooltip) tooltip.style.display = "none";
                  }
                }}
              >
                <Icon className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">{item.name}</span>}
              </button>
              {isCollapsed && (
                <span
                  className="hidden bg-blue-900 text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-nowrap z-50"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    clipPath: "polygon(0 0, 10px 0, 0 10px, 100% 10px, 100% 100%, 0 100%)" // Forma con esquina recortada
                  }}
                >
                  {item.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default NavSection;