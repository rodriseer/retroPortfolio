"use client";

import { useSound } from "@/context/SoundContext";
import { RODRIGO_OS_VERSION } from "@/lib/os-meta";

type OSStatusBarProps = {
  activeModuleLabel: string;
};

/**
 * Bottom task strip — complements {@link OSTopBar} (clock & primary status live there).
 */
export default function OSStatusBar({ activeModuleLabel }: OSStatusBarProps) {
  const {
    soundEnabled,
    toggleSoundEnabled,
    musicUserPaused,
    toggleMusicPaused,
  } = useSound();
  return (
    <footer
      className="safe-bottom w-full shrink-0 border-t-2 border-retro-border/75 bg-retro-panel-solid/98 shadow-[0_-3px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm"
      role="contentinfo"
      aria-label="Task strip"
    >
      <div className="content-container flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 px-4 py-1.5 font-mono text-[10px] text-retro-muted sm:gap-x-4 sm:gap-y-2 sm:py-2 md:px-6 md:py-2.5 md:text-[11px]">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
          <span className="shrink-0 retro-font text-[10px] leading-snug tracking-[0.08em] text-retro-highlight/90 sm:text-[11px]">
            {RODRIGO_OS_VERSION}
          </span>
          <span className="hidden text-retro-border-light sm:inline" aria-hidden>
            │
          </span>
          <span className="truncate font-sans text-[10px] font-medium text-retro-text/85 md:text-[11px]">
            <span className="font-mono text-retro-muted">Task</span>{" "}
            <span className="retro-font text-[10px] leading-snug text-retro-highlight/90 sm:text-[11px]">
              {activeModuleLabel}
            </span>
          </span>
          <span className="hidden text-retro-border-light md:inline" aria-hidden>
            │
          </span>
          <span className="hidden text-retro-text/55 md:inline">Ship-ready builds</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 md:gap-x-4">
          <button
            type="button"
            onClick={toggleSoundEnabled}
            className={`
              rounded border px-2.5 py-1.5 uppercase tracking-wider transition-colors duration-200 sm:px-2 sm:py-0.5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg-dark
              ${soundEnabled
                ? "border-retro-highlight/60 bg-retro-highlight/15 text-retro-highlight"
                : "border-retro-border/60 bg-black/20 text-retro-muted hover:border-retro-border-light hover:text-retro-text"
              }
            `}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? "Mute sound (UI, boot, and music)" : "Enable sound"}
            title={soundEnabled ? "Sound on — click, boot tone, background music" : "Sound off (default)"}
          >
            {soundEnabled ? "SND · ON" : "SND · OFF"}
          </button>

          <button
            type="button"
            onClick={toggleMusicPaused}
            disabled={!soundEnabled}
            className={`
              hidden rounded border px-2.5 py-1.5 uppercase tracking-wider transition-colors duration-200 sm:inline-block sm:px-2 sm:py-0.5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-retro-bg-dark
              disabled:cursor-not-allowed disabled:opacity-40
              ${soundEnabled && !musicUserPaused
                ? "border-emerald-500/45 bg-emerald-500/10 text-emerald-400/95"
                : "border-retro-border/60 bg-black/20 text-retro-muted hover:border-retro-border-light hover:text-retro-text"
              }
            `}
            aria-pressed={soundEnabled && !musicUserPaused}
            aria-label={
              !soundEnabled
                ? "Enable sound to control music"
                : musicUserPaused
                  ? "Resume background music"
                  : "Pause background music"
            }
            title={
              !soundEnabled
                ? "Turn on SND first"
                : musicUserPaused
                  ? "Resume BGM (does not restart from beginning)"
                  : "Pause BGM (keeps position)"
            }
          >
            {soundEnabled ? (musicUserPaused ? "BGM · PAUSE" : "BGM · ON") : "BGM · —"}
          </button>

          <span className="hidden items-center gap-2 text-retro-text/75 sm:flex">
            <span className="text-retro-muted">MEM</span> OK
          </span>
          <span className="hidden items-center gap-1.5 text-emerald-400/90 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-35 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.65)]" />
            </span>
            <span className="uppercase tracking-wider">Sync</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
