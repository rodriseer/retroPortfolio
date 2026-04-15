"use client";

import { useCallback, useState } from "react";
import { OS_NAV, type OSScreenId } from "@/lib/os-types";
import OSNav from "./os/OSNav";
import OSStatusBar from "./os/OSStatusBar";
import OSTopBar from "./os/OSTopBar";
import OSScreenDisplay from "./os/OSScreenDisplay";
import OSScreenContent from "./os/OSScreenContent";

const PANEL_ID = "os-screen-panel";

export default function RodrigoOS() {
  const [screen, setScreen] = useState<OSScreenId>("home");

  const handleSelect = useCallback((id: OSScreenId) => {
    setScreen(id);
  }, []);

  const activeLabel = OS_NAV.find((n) => n.id === screen)?.label ?? screen;
  const activeSection = OS_NAV.find((n) => n.id === screen)?.systemSection ?? "";

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <OSTopBar screen={screen} />

      <div className="content-container flex min-h-0 flex-1 flex-col overflow-hidden py-1 sm:py-3 md:py-4">
        <div
          className="os-display-chassis flex min-h-0 flex-1 flex-col overflow-hidden"
          role="application"
          aria-label="Rodrigo OS primary display"
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:flex-row">
            <OSNav active={screen} onSelect={handleSelect} activeSection={activeSection} />

            <div
              className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-t border-retro-border/55 bg-black/20 lg:border-l lg:border-t-0"
              role="tabpanel"
              id={PANEL_ID}
              aria-labelledby={`os-tab-${screen}`}
            >
              <div
                key={screen}
                className="pointer-events-none absolute inset-0 z-[30] bg-retro-highlight/10 animate-os-screen-flash motion-reduce:animate-none"
                aria-hidden
              />
              <div className="relative z-0 flex h-full min-h-0 min-w-0 flex-1 flex-col">
                <OSScreenDisplay screen={screen}>
                  <div
                    key={screen}
                    className="os-viewport-inner flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-4 py-4 motion-safe:animate-os-screen-in sm:px-5 sm:py-5 md:px-6 md:py-6"
                  >
                    <OSScreenContent screen={screen} onNavigate={handleSelect} />
                  </div>
                </OSScreenDisplay>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OSStatusBar activeModuleLabel={activeLabel} />
    </div>
  );
}
