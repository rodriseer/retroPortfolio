"use client";

import Image from "next/image";
import { useSound } from "@/context/SoundContext";
import { OS_NAV, type OSScreenId } from "@/lib/os-types";

const PANEL_ID = "os-screen-panel";

type OSNavProps = {
  active: OSScreenId;
  onSelect: (id: OSScreenId) => void;
  activeSection: string;
};

export default function OSNav({ active, onSelect, activeSection }: OSNavProps) {
  const { playSound } = useSound();

  return (
    <aside className="flex min-h-0 shrink-0 flex-col border-b border-retro-border/55 bg-gradient-to-b from-black/35 to-black/20 lg:w-[15.5rem] lg:max-w-[15.5rem] lg:border-b-0 lg:border-r lg:border-retro-border/55">
      <div className="shrink-0 border-b border-retro-border/40 px-3 py-3 sm:px-4 sm:py-3.5">
        <p className="m-0 font-mono text-[9px] uppercase tracking-[0.28em] text-retro-muted/90">System menu</p>
        <p className="m-0 mt-1.5 font-retro text-lg tracking-wide text-retro-highlight-bright retro-title-readable sm:text-xl">
          Modules
        </p>
        <p className="m-0 mt-2 font-mono text-[10px] text-retro-text/75">
          <span className="text-retro-muted/90">Active</span>{" "}
          <span className="text-retro-highlight">{activeSection}</span>
        </p>
      </div>

      <nav
        className="flex min-h-0 flex-1 flex-row gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-2 py-2 sm:gap-2.5 sm:px-3 sm:py-3 lg:flex-col lg:overflow-hidden lg:overflow-x-hidden lg:px-3 lg:py-3"
        aria-label="Rodrigo OS modules"
      >
        {OS_NAV.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`os-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={PANEL_ID}
              tabIndex={0}
              data-active={isActive ? "true" : "false"}
              onClick={() => {
                playSound("click");
                onSelect(item.id);
              }}
              className={`
                group relative flex min-w-[8.25rem] shrink-0 flex-col gap-1 rounded-[var(--os-radius)] border-2 px-3 py-2.5 text-left transition-[transform,background-color,border-color,box-shadow,color,opacity] duration-200 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-[rgba(14,12,28,0.95)]
                lg:min-w-0 lg:w-full lg:px-3.5 lg:py-3
                ${isActive
                  ? `
                      z-[1] border-retro-highlight/90 bg-retro-highlight/[0.14] text-retro-highlight
                      shadow-[inset_3px_0_0_0_rgba(167,139,250,0.65),0_1px_0_rgba(255,255,255,0.04)_inset]
                      animate-os-border-glow-nav
                    `
                  : `
                      border-retro-border/55 bg-retro-panel-solid/55 text-retro-muted
                      hover:border-retro-highlight/45 hover:bg-retro-highlight/[0.08] hover:text-retro-text/95
                      active:scale-[0.99]
                    `
                }
              `}
            >
              {isActive && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-[inherit] bg-retro-highlight/[0.06] z-0"
                  aria-hidden
                />
              )}
              <span
                className={`relative z-[2] font-mono text-[8px] uppercase tracking-[0.22em] sm:text-[9px] ${
                  isActive ? "text-retro-highlight/80" : "text-retro-muted/90"
                }`}
              >
                {item.systemSection}
              </span>
              <div className="relative z-[2] flex flex-row items-center gap-2.5">
                {isActive && (
                  <span
                    className="flex w-4 shrink-0 justify-center font-mono text-xs text-retro-highlight animate-os-selector-nudge"
                    aria-hidden
                  >
                    ▶
                  </span>
                )}
                <Image
                  src={item.icon}
                  alt=""
                  width={28}
                  height={28}
                  className={`
                    retro-nav-icon h-7 w-7 shrink-0 object-contain transition-opacity duration-200
                    ${isActive ? "opacity-100" : "opacity-75 group-hover:opacity-100"}
                  `}
                  unoptimized
                />
                <span className="min-w-0 flex-1">
                  <span className="font-retro block text-sm leading-tight tracking-wide retro-title-readable md:text-[15px]">
                    {item.label}
                  </span>
                  <span
                    className={`mt-0.5 block truncate font-sans text-[10px] font-medium uppercase tracking-wider transition-colors duration-200 md:text-[11px] ${
                      isActive ? "text-retro-highlight/80" : "text-retro-muted/85 group-hover:text-retro-muted"
                    }`}
                  >
                    {item.subtitle}
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
