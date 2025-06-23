// src/components/BreadcrumbHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  CubeTransparentIcon,
  BookmarkIcon,
  BookOpenIcon,
  CheckBadgeIcon,
  MapIcon,
  InformationCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";


export function BreadcrumbHeader({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter((segment) => segment && segment !== '(dashboard)');

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    return { href, label, segment };
  });

const pathToIcon: { [key: string]: React.ElementType } = {
  "nueva-clase": CubeTransparentIcon,
  "clases-creadas": BookmarkIcon,
  entradas: BookOpenIcon,
  rubrica: CheckBadgeIcon,
  "guia-de-uso": MapIcon,
  ayuda: InformationCircleIcon,
};



  return (
    <nav className={`bg-white p-4 border-b border-border-subtle flex justify-between items-center h-20 ${className}`}>


      <ol className="p-2 flex space-x-4 items-center">
        <li className="flex items-center">
          <HomeIcon className="h-5 w-5 text-blue-600" />
          <Link href="/(dashboard)" className="text-blue-600 hover:underline">
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => {
          const Icon = pathToIcon[crumb.segment];
          return (
            <li key={crumb.href} className="flex items-center space-x-1">
              <span className="mx-2">/</span>
              {Icon && <Icon className="h-5 w-5 text-blue-600" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-blue-600 font-normal">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-blue-600 hover:underline">
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {pathname.includes('bandeja') && <span className="text-sm text-gray-500">3 nuevos</span>}
    </nav>
  );
}
