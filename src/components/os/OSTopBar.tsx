"use client";

import { useEffect, useState } from "react";
import { useSound } from "@/context/SoundContext";
import { RODRIGO_OS_VERSION } from "@/lib/os-meta";
import { OS_NAV, type OSScreenId } from "@/lib/os-types";

function formatTime(d: Date) {
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

type OSTopBarProps = {
  screen: OSScreenId;
};

export default function OSTopBar({ screen }: OSTopBarProps) {
  const [now, setNow] = useState(() => new Date());
  const { soundEnabled, toggleSoundEnabled } = useSound();
  const meta = OS_NAV.find((n) => n.id === screen)!;

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header
      className="shrink-0 w-full border-b-2 border-retro-border/90 bg-gradient-to-b from-retro-panel-solid to-[#18152c] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
      role="banner"
    >
      <div className="content-container flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 py-2.5 sm:py-3 md:px-6 md:py-3.5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <span className="shrink-0 font-retro text-sm tracking-[0.12em] text-retro-highlight-bright sm:text-base">
            {RODRIGO_OS_VERSION}
          </span>
          <span className="hidden text-retro-border-light sm:inline" aria-hidden>
            │
          </span>
          <span className="font-mono text-[10px] text-retro-muted md:text-[11px]">
            Host <span className="text-retro-text/85">localhost</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1.5 md:gap-x-5">
          <div
            className="flex items-center gap-2 rounded-md border border-retro-highlight/35 bg-retro-highlight/[0.08] px-2.5 py-1 font-mono text-[10px] md:text-[11px]"
            role="status"
            aria-live="polite"
            aria-label={`Active workspace ${meta.systemSection}`}
          >
            <span className="text-retro-muted uppercase tracking-wider">Screen</span>
            <span className="font-retro text-xs tracking-wide text-retro-highlight md:text-sm">{meta.systemSection}</span>
            <span className="hidden max-w-[9rem] truncate font-sans text-[10px] font-medium text-retro-text/88 sm:inline" title={meta.label}>
              {meta.label}
            </span>
            <span
              className="ml-0.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-emerald-400/95 motion-reduce:shadow-none"
              title="Foreground"
              aria-hidden
            />
          </div>

          <span className="flex items-center gap-1.5 font-mono tabular-nums text-[10px] text-retro-text/90 md:text-[11px]" aria-live="polite">
            <span className="text-retro-muted">CLK</span>
            {formatTime(now)}
          </span>

          <button
            type="button"
            onClick={toggleSoundEnabled}
            className={`
              shrink-0 rounded-md border px-2 py-1 font-mono text-[9px] uppercase tracking-wider transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-retro-panel-solid
              ${soundEnabled
                ? "border-retro-highlight/55 bg-retro-highlight/12 text-retro-highlight"
                : "border-retro-border/55 bg-black/25 text-retro-muted hover:border-retro-border-light hover:text-retro-text/85"
              }
            `}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
            title="Toggle sound (saved in this browser)"
          >
            {soundEnabled ? "SND+" : "SND−"}
          </button>

          <span className="flex items-center gap-1.5 shrink-0 font-mono text-[10px] text-emerald-400/85 md:text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-25 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/90" />
            </span>
            <span className="uppercase tracking-wider">Ready</span>
          </span>
        </div>
      </div>
    </header>
  );
}
