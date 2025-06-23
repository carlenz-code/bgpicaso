"use client";
import { ReactElement } from "react";
import { BellIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  className?: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, isCollapsed, onToggleCollapse }): ReactElement => {
  return (
    <div className={`p-4  bg-white ${className}`}>
      {isCollapsed ? (
        // Layout para estado colapsado


        <div className="flex flex-col items-center h-24">

          <div className="flex items-center space-x-3 cursor-pointer mb-4" onClick={onToggleCollapse}>
            <div className="w-10 h-10 bg-gradient-to-br from-brand-gradient-from to-brand-gradient-to rounded-xl flex items-center justify-center">
              <span className="text-sm text-white font-bold">p</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button className="text-black hover:text-text-muted relative flex items-center justify-center">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-notification-dot rounded-full"></span>
            </button>
          </div>
        </div>
      ) : (
        // Layout para estado expandido (normal)
        <div className="flex items-center justify-between h-12">

          <div className="flex items-center space-x-3">
            
            <div className="w-10 h-10 bg-gradient-to-br from-brand-gradient-from to-brand-gradient-to rounded-xl flex items-center justify-center">
              <span className="text-sm text-white font-bold">p</span>
            </div>


            <div className="flex flex-col space-y-2">
              <span className="text-base font-normal text-brand-text leading-none">picasso.ai</span>
              <span className="text-sm text-text-muted leading-none">company</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-black hover:text-text-muted" onClick={onToggleCollapse}>
              <ArrowsRightLeftIcon className="h-6 w-6" />
            </button>
            <button className="text-black hover:text-text-muted relative flex items-center justify-center">
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-notification-dot rounded-full"></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;