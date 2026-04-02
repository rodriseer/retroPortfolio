"use client";

import { useState, useCallback, useEffect } from "react";
import { SoundProvider } from "@/context/SoundContext";
import BootSequence from "./BootSequence";
import RetroBackground from "./RetroBackground";
import RodrigoOS from "./RodrigoOS";

const FALLBACK_BOOT_MS = 8000;

export default function PortfolioShell() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
    setShowContent(true);
  }, []);

  useEffect(() => {
    if (bootComplete) return;
    const t = setTimeout(() => {
      setBootComplete(true);
      setShowContent(true);
    }, FALLBACK_BOOT_MS);
    return () => clearTimeout(t);
  }, [bootComplete]);

  return (
    <SoundProvider>
      <BootSequence onComplete={handleBootComplete} />

      {bootComplete && <RetroBackground />}

      {bootComplete && (
        <>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <main
            id="main-content"
            tabIndex={-1}
            className="relative z-0 flex flex-col h-dvh min-h-0 overflow-hidden transition-opacity duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-retro-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ opacity: showContent ? 1 : 0 }}
          >
            <RodrigoOS />
          </main>
        </>
      )}
    </SoundProvider>
  );
}
