"use client";

import { ReactElement, useState, useEffect, useRef } from "react";
import { SparklesIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/context/AuthContext";

interface User {
  image?: string;
  name: string;
  email: string;
}

interface ActionButtonsProps {
  role: string;
  className?: string;
  isCollapsed?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ role, className, isCollapsed }): ReactElement => {
  const [user, setUser] = useState<User>({
    image: undefined,
    name: "Usuario",
    email: "user@example.com",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { loginAs, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ⏬ Leer user_info desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user_info");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          image: parsed.foto_url || undefined, // si tienes una foto
          name: parsed.username || parsed.username || "Usuario",
          email: parsed.email || "user@example.com",
        });
      } catch (e) {
        console.error("Error al leer user_info:", e);
      }
    }
  }, []);

  // Cierra menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`p-4 border-t border-border-light ${className} relative`} ref={menuRef}>
      {!isCollapsed && (
        <button className="w-full bg-white text-interactive-hover p-3 rounded-lg border border-dashed border-border-light mb-4 flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-5 w-5 text-interactive-hover" />
            <span className="text-sm font-medium text-left">Prueba Picasso Pro</span>
          </div>
          <p className="text-xs text-text-muted text-left">Pásate a Pro, amplia tus límites y acceder a funciones premium.</p>
          <p className="text-xs text-interactive-hover text-left">+10 mejoras a tu cuenta</p>
        </button>
      )}

      <button
        className="w-full bg-white text-gray-700 p-3 rounded-lg border border-dashed border-border-light flex items-center justify-between"
        onClick={toggleMenu}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
            {user.image ? (
              <img src={user.image} alt="User profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-sm">
                {user.name ? user.name.trim().charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-left">{user.name}</span>
              <span className="text-xs text-text-muted text-left">{user.email}</span>
            </div>
          )}
        </div>
        <ChevronRightIcon className="h-5 w-5 text-text-muted" />
      </button>

      {isMenuOpen && (
        <div
          className="absolute bottom-4 left-full bg-white border border-border-light rounded-md shadow-lg p-2 w-48 z-50 transition-all duration-200 ease-in-out transform opacity-100 scale-100"
          style={{ transform: `translateX(${isCollapsed ? "4px" : "8px"})` }}
        >
          <ul className="space-y-1">
            <li>
              <button className="w-full text-left text-sm text-text-muted hover:text-interactive-hover p-2 rounded hover:bg-gray-100">
                Perfil
              </button>
            </li>
            <li>
              <button className="w-full text-left text-sm text-text-muted hover:text-interactive-hover p-2 rounded hover:bg-gray-100">
                Configuración
              </button>
            </li>
            <li>
              <button
                onClick={() => logout()}
                className="w-full text-left text-sm text-text-muted hover:text-interactive-hover p-2 rounded hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </li>
            <li>
              <button
                onClick={() => loginAs("planner")}
                className="w-full text-left text-sm text-text-muted hover:text-interactive-hover p-2 rounded hover:bg-gray-100"
              >
                Login como Planificador
              </button>
            </li>
            <li>
              <button
                onClick={() => loginAs("auditor")}
                className="w-full text-left text-sm text-text-muted hover:text-interactive-hover p-2 rounded hover:bg-gray-100"
              >
                Login como Auditor
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
