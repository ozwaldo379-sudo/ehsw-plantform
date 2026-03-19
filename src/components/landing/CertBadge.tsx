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
      className="group relative inline-flex cursor-help items-center justify-center rounded-full border border-cyan/40 bg-navy-card/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan outline-none transition-all duration-300 ease-out hover:border-cyan/70 hover:bg-cyan/10 focus:border-cyan/80"
    >
      {label}
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-50 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-cyan/40 bg-navy-deep px-3 py-2 text-center text-xs normal-case tracking-normal text-silver opacity-0 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out group-hover:opacity-100 group-focus:opacity-100"
      >
        {tooltip}
        <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-cyan/40" />
      </span>
    </span>
  );
}
