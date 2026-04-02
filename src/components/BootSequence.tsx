"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSound } from "@/context/SoundContext";

const SESSION_KEY = "portfolio_boot_seen";

const LOADING_MESSAGES = [
  "Initializing Rodrigo OS",
  "Loading portfolio modules",
  "Mounting interface",
] as const;

const MESSAGE_INTERVAL_MS = 650;
const BOOT_DURATION_MS = 2100;
const TRANSITION_MS = 550;

/** Simple flow: idle → loading → transitioning → done (then unmount) */
type Phase = "idle" | "loading" | "transitioning" | "done";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const { notifyBootInteraction, playSound } = useSound();
  const [phase, setPhase] = useState<Phase>("idle");
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const finishBoot = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEY, "true");
      }
    } catch {
      // ignore
    }
    setPhase("done");
    onCompleteRef.current();
  }, []);

  // Skip boot if already completed this session
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "true") {
        finishBoot();
        return;
      }
    } catch {
      // ignore
    }
  }, [finishBoot]);

  const handleStart = useCallback(() => {
    if (phase !== "idle") return;
    notifyBootInteraction();
    setPhase("loading");
    setLoadingMessageIndex(0);
  }, [phase, notifyBootInteraction]);

  // Loading phase: cycle messages only; transition is scheduled separately
  useEffect(() => {
    if (phase !== "loading") return;

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((i) =>
        i >= LOADING_MESSAGES.length - 1 ? i : i + 1
      );
    }, MESSAGE_INTERVAL_MS);

    const transitionAt = setTimeout(() => {
      setPhase("transitioning");
    }, BOOT_DURATION_MS);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(transitionAt);
    };
  }, [phase]);

  // Transitioning phase: after flash, call finishBoot (must be in its own effect so cleanup doesn't cancel it)
  useEffect(() => {
    if (phase !== "transitioning") return;

    const doneAt = setTimeout(() => {
      finishBoot();
    }, TRANSITION_MS);

    return () => clearTimeout(doneAt);
  }, [phase, finishBoot]);

  // Keyboard: Press Start
  useEffect(() => {
    if (phase !== "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleStart]);

  // Fully unmount when done – no overlay left behind
  if (phase === "done") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-retro-boot overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-title"
    >
      <button
        type="button"
        onClick={() => {
          playSound("click");
          finishBoot();
        }}
        className="skip-link"
      >
        Skip intro
      </button>
      <div className="pointer-events-none absolute inset-0 retro-scanline opacity-30" aria-hidden />

      {phase === "idle" && (
        <div className="relative z-10 flex flex-col items-center gap-8 px-4 animate-fade-in">
          <h2
            id="boot-title"
            className="m-0 max-w-[min(100%,28rem)] text-center text-2xl leading-tight text-retro-boot-title sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Rodrigo OS
          </h2>
          <button
            type="button"
            onClick={handleStart}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleStart();
            }}
            className="cursor-pointer rounded border-2 border-transparent bg-transparent px-3 py-1.5 font-sans text-base font-semibold text-retro-boot-cta animate-blink focus:outline-none focus-visible:border-retro-highlight/50 focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-retro-boot md:text-lg"
            aria-label="Start system"
          >
            Press Start
          </button>
          <p className="mt-2 font-sans text-sm text-retro-boot-muted">
            or click to boot
          </p>
        </div>
      )}

      {phase === "loading" && (
        <>
          <h2 id="boot-title" className="sr-only">
            Rodrigo OS
          </h2>
          <div
            className="relative z-10 flex flex-col items-center gap-6 px-4 w-full max-w-sm"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <p
              key={loadingMessageIndex}
              className="m-0 flex min-h-[2rem] items-center justify-center animate-fade-in font-sans text-base font-medium text-retro-boot-title md:text-lg"
            >
              {LOADING_MESSAGES[loadingMessageIndex]}
            </p>
            <div className="w-full h-2 rounded-full bg-black/50 border-2 border-retro-border overflow-hidden">
              <div
                className="h-full w-full bg-retro-highlight rounded-full origin-left animate-loading-bar"
                style={{ animationDuration: `${BOOT_DURATION_MS}ms` }}
              />
            </div>
            <div className="flex gap-1.5" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-retro-highlight animate-boot-dot"
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {phase === "transitioning" && (
        <>
          <h2 id="boot-title" className="sr-only">
            Rodrigo OS
          </h2>
          <div
            className="absolute inset-0 bg-retro-boot animate-boot-flash"
            style={{ animationDuration: `${TRANSITION_MS}ms` }}
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
