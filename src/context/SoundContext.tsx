"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  externalLaunchSoundOnClick,
  externalLaunchSoundOnPointerDown,
  initSoundEngine,
  pauseBackgroundMusic,
  playBackgroundMusicFromUserGesture,
  playClickSound,
  playStartupSound,
  type SoundEffectId,
} from "@/lib/sound-engine";

const STORAGE_KEY = "rodrigo_os_sound_enabled";

type SoundContextValue = {
  soundEnabled: boolean;
  setSoundEnabled: (on: boolean) => void;
  toggleSoundEnabled: () => void;
  musicUserPaused: boolean;
  toggleMusicPaused: () => void;
  playSound: (id: SoundEffectId) => void;
  /**
   * Spread onto outbound `<a>` elements: pointerdown plays early; click covers keyboard / skips duplicate after pointer.
   */
  externalLinkAudioProps: {
    onPointerDown: (e: PointerEvent<HTMLAnchorElement>) => void;
    onClick: () => void;
  };
  /** Keyboard-only / simple case — same as externalLinkAudioProps.onClick */
  playExternalLinkSound: () => void;
  /** User pressed Start — startup + optional BGM (only inside this gesture). */
  notifyBootInteraction: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabledState] = useState(false);
  const [musicUserPaused, setMusicUserPaused] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    initSoundEngine();
    try {
      setSoundEnabledState(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, soundEnabled ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [soundEnabled, storageReady]);

  /** Never call music.play() here — browsers block autoplay. Only pause when output should be silent. */
  useEffect(() => {
    initSoundEngine();
    if (!soundEnabled || musicUserPaused) {
      pauseBackgroundMusic();
    }
  }, [soundEnabled, musicUserPaused]);

  const playSound = useCallback((id: SoundEffectId) => {
    if (id === "click") playClickSound();
    else playStartupSound();
  }, []);

  const externalLinkAudioProps = useMemo(
    () => ({
      onPointerDown: (e: PointerEvent<HTMLAnchorElement>) => {
        if (e.button !== 0) return;
        externalLaunchSoundOnPointerDown();
      },
      onClick: () => externalLaunchSoundOnClick(),
    }),
    []
  );

  const playExternalLinkSound = useCallback(() => {
    externalLaunchSoundOnClick();
  }, []);

  const notifyBootInteraction = useCallback(() => {
    initSoundEngine();
    playStartupSound();
    if (soundEnabled && !musicUserPaused) {
      playBackgroundMusicFromUserGesture();
    }
  }, [soundEnabled, musicUserPaused]);

  const setSoundEnabled = useCallback((on: boolean) => {
    setSoundEnabledState(on);
  }, []);

  const toggleSoundEnabled = useCallback(() => {
    setSoundEnabledState((prev) => {
      const next = !prev;
      queueMicrotask(() => {
        initSoundEngine();
        playClickSound();
        if (next) {
          if (!musicUserPaused) playBackgroundMusicFromUserGesture();
        } else {
          pauseBackgroundMusic();
        }
      });
      return next;
    });
  }, [musicUserPaused]);

  const toggleMusicPaused = useCallback(() => {
    if (!soundEnabled) return;
    setMusicUserPaused((prev) => {
      const next = !prev;
      queueMicrotask(() => {
        initSoundEngine();
        playClickSound();
        if (next) {
          pauseBackgroundMusic();
        } else {
          playBackgroundMusicFromUserGesture();
        }
      });
      return next;
    });
  }, [soundEnabled]);

  const value = useMemo<SoundContextValue>(
    () => ({
      soundEnabled,
      setSoundEnabled,
      toggleSoundEnabled,
      musicUserPaused,
      toggleMusicPaused,
      playSound,
      externalLinkAudioProps,
      playExternalLinkSound,
      notifyBootInteraction,
    }),
    [
      soundEnabled,
      setSoundEnabled,
      toggleSoundEnabled,
      musicUserPaused,
      toggleMusicPaused,
      playSound,
      externalLinkAudioProps,
      playExternalLinkSound,
      notifyBootInteraction,
    ]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}
