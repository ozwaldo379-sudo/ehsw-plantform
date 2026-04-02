"use client";

import { useId } from "react";

type CertBadgeProps = {
  label: string;
  tooltip: string;
};

export default function CertBadge({ label, tooltip }: CertBadgeProps) {
  const tooltipId = useId();

  return (
    <span
      tabIndex={0}
      aria-describedby={tooltipId}
      className="group relative inline-flex cursor-help items-center justify-center rounded-full border border-[#A8B02D]/50 bg-[#A8B02D]/8 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#A8B02D] outline-none transition-all duration-300 ease-out hover:border-[#A8B02D]/80 hover:bg-[#A8B02D]/14 focus:border-[#A8B02D]/70"
    >
      {label}
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-50 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-[#28232A]/10 bg-white px-3 py-2 text-center text-xs normal-case tracking-normal text-[#28232A] opacity-0 shadow-[0_4px_20px_rgba(40,35,42,0.12)] transition-all duration-300 ease-out group-hover:opacity-100 group-focus:opacity-100"
      >
        {tooltip}
        <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-[#28232A]/10" />
      </span>
    </span>
  );
}
