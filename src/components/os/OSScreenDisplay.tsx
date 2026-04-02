"use client";

import { ReactNode } from "react";
import { OS_NAV, type OSScreenId } from "@/lib/os-types";

type OSScreenDisplayProps = {
  screen: OSScreenId;
  children: ReactNode;
};

export default function OSScreenDisplay({ screen, children }: OSScreenDisplayProps) {
  const meta = OS_NAV.find((n) => n.id === screen)!;

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-2 sm:p-3 md:p-4">
      <div className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[var(--os-radius)] border-2 border-retro-border/80 bg-[rgba(20,18,40,0.98)] shadow-[var(--panel-glow)]">
        <span
          className="pointer-events-none absolute inset-0 z-0 rounded-[var(--os-radius)] ring-1 ring-inset ring-retro-highlight/10"
          aria-hidden
        />

        <header className="relative z-[1] shrink-0 border-b-2 border-retro-border/60 bg-gradient-to-r from-retro-panel-solid via-retro-panel-solid/98 to-retro-panel-solid px-4 py-3 shadow-[inset_0_1px_0_rgba(167,139,250,0.1)] sm:px-5 sm:py-3.5 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-retro-muted sm:text-[10px]">
                  {meta.systemSection}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-retro-border-light/80" aria-hidden>
                  /
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-retro-muted/85">Viewport</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="m-0 font-retro text-xl tracking-wide text-retro-highlight-bright retro-title-readable sm:text-2xl">
                  {meta.label}
                </h2>
                <span
                  className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400/90"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 motion-reduce:animate-none" />
                  Active
                </span>
              </div>
            </div>
            <div className="shrink-0 font-mono text-[10px] text-retro-muted/80 sm:text-right">
              <span className="block tabular-nums text-retro-text/85">/sys/ui/{meta.id}</span>
              <span className="mt-0.5 block text-[9px] uppercase tracking-wider text-retro-muted/75">Foreground</span>
            </div>
          </div>
        </header>

        <div className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--panel-inner-bg)]">
          <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.035] retro-scanline" aria-hidden />
          <div className="relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}
