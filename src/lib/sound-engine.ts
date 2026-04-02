/**
 * Audio pool for files in /public (root URLs). Every play() runs in response to
 * user input (click / keydown) so autoplay policy is satisfied.
 */

export type SoundEffectId = "click" | "startup";

/**
 * Public **filename** only (no leading slash). If you rename on disk to `post-click.mp3`, change this string.
 * Spaces are OK — the request URL is built with encodeURI.
 */
const EXTERNAL_LAUNCH_FILE_NAME = "post click.mp3";

const URLS = {
  click: "/click.mp3",
  /** Encoded path so spaces in the filename work over HTTP */
  externalLaunch: encodeURI(`/${EXTERNAL_LAUNCH_FILE_NAME}`),
  startup: "/startup.wav",
  music: "/music.mp3",
} as const;

const LOG_PREFIX = "[RodrigoOS audio]";

const CLICK_VOLUME = 0.32;
const EXTERNAL_LAUNCH_VOLUME = 0.3;
const STARTUP_VOLUME = 0.36;
export const MUSIC_VOLUME = 0.15;

const CLICK_MIN_INTERVAL_MS = 55;
const EXTERNAL_MIN_INTERVAL_MS = 55;

type Pool = {
  click: HTMLAudioElement;
  externalLaunch: HTMLAudioElement;
  startup: HTMLAudioElement;
  music: HTMLAudioElement;
};

let pool: Pool | null = null;
let lastClickTime = 0;
let lastExternalLaunchTime = 0;
let startupHasPlayed = false;

function attachAudioDiagnostics(url: string, el: HTMLAudioElement, label: string) {
  el.addEventListener("error", () => {
    const err = el.error;
    console.warn(`${LOG_PREFIX} failed to load ${label}: ${url}`, {
      code: err?.code,
      message: err?.message ?? "unknown",
    });
  });
  el.addEventListener("canplaythrough", () => {
    if (process.env.NODE_ENV === "development") {
      console.info(`${LOG_PREFIX} ready: ${label} ← ${url}`);
    }
  });
}

function logPlayRejection(label: string, err: unknown) {
  console.warn(`${LOG_PREFIX} play() blocked or failed: ${label}`, err);
}

export function initSoundEngine(): void {
  if (typeof window === "undefined" || pool) return;

  const click = new Audio(URLS.click);
  click.preload = "auto";
  click.volume = CLICK_VOLUME;
  attachAudioDiagnostics(URLS.click, click, "click");

  const externalLaunch = new Audio(URLS.externalLaunch);
  externalLaunch.preload = "auto";
  externalLaunch.volume = EXTERNAL_LAUNCH_VOLUME;
  attachAudioDiagnostics(URLS.externalLaunch, externalLaunch, "externalLaunch");

  const startup = new Audio(URLS.startup);
  startup.preload = "auto";
  startup.volume = STARTUP_VOLUME;
  attachAudioDiagnostics(URLS.startup, startup, "startup");

  const music = new Audio(URLS.music);
  music.preload = "auto";
  music.loop = true;
  music.volume = MUSIC_VOLUME;
  attachAudioDiagnostics(URLS.music, music, "music");

  pool = { click, externalLaunch, startup, music };

  if (process.env.NODE_ENV === "development") {
    console.info(`${LOG_PREFIX} pool created`, { ...URLS });
  }

  void click.load();
  void externalLaunch.load();
  void startup.load();
  void music.load();
}

function ensurePool(): Pool | null {
  initSoundEngine();
  return pool;
}

export function playClickSound(): void {
  const p = ensurePool();
  if (!p) return;
  const now = performance.now();
  if (now - lastClickTime < CLICK_MIN_INTERVAL_MS) return;
  lastClickTime = now;
  const a = p.click;
  a.pause();
  a.currentTime = 0;
  void a.play().catch((e) => logPlayRejection("click", e));
}

let suppressExternalLaunchClickUntil = 0;
const EXTERNAL_SUPPRESS_CLICK_AFTER_POINTER_MS = 450;

function triggerExternalLaunchClip(): void {
  const p = ensurePool();
  if (!p) return;
  const now = performance.now();
  if (now - lastExternalLaunchTime < EXTERNAL_MIN_INTERVAL_MS) return;
  lastExternalLaunchTime = now;
  const a = p.externalLaunch;
  a.pause();
  a.currentTime = 0;
  void a.play().catch((e) => logPlayRejection("externalLaunch", e));
}

/**
 * Primary-button pointer down on an outbound `<a>` — starts audio before navigation when possible.
 * Pair with {@link externalLaunchSoundOnClick} on the same element.
 */
export function externalLaunchSoundOnPointerDown(): void {
  suppressExternalLaunchClickUntil = performance.now() + EXTERNAL_SUPPRESS_CLICK_AFTER_POINTER_MS;
  triggerExternalLaunchClip();
}

/**
 * Click / keyboard activation on an outbound `<a>`. Skips if pointer path already played recently.
 */
export function externalLaunchSoundOnClick(): void {
  const now = performance.now();
  if (now < suppressExternalLaunchClickUntil) {
    suppressExternalLaunchClickUntil = 0;
    return;
  }
  triggerExternalLaunchClip();
}

/** Call only from Start (user gesture). Once per page load. */
export function playStartupSound(): void {
  const p = ensurePool();
  if (!p) return;
  if (startupHasPlayed) return;
  startupHasPlayed = true;
  const a = p.startup;
  a.pause();
  a.currentTime = 0;
  void a.play().catch((e) => logPlayRejection("startup", e));
}

export function pauseBackgroundMusic(): void {
  pool?.music.pause();
}

/** Call only from a click / key handler. */
export function playBackgroundMusicFromUserGesture(): void {
  const p = ensurePool();
  if (!p) return;
  void p.music.play().catch((e) => logPlayRejection("music", e));
}
