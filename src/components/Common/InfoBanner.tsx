"use client";

import { HashtagIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface InfoBannerProps {
  text: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({ text }) => {
  const [line1, line2] = text.split("¡");
  const secondPart = `¡${line2 || ""}`.trim();

  return (
    <div className="bg-banner-bg p-2 rounded-md  flex items-center">
      <div className="flex-shrink-0 flex items-center justify-center w-12">
        <HashtagIcon className="h-6 w-6 text-banner-text-primary" />
      </div>
      <div className="flex-1 ml-2">
        <p className="text-sm text-banner-text-dark">{line1.trim()}</p>
        {secondPart && (
          <p className="text-sm text-banner-text-primary font-semibold">{secondPart}</p>
        )}
      </div>
    </div>
  );
};

export default InfoBanner;