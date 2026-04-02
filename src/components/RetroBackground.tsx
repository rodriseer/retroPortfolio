"use client";

/**
 * Calm retro backdrop — static gradient, very light grid, minimal depth.
 */
export default function RetroBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(145deg, #0c0b14 0%, #141228 40%, #181432 70%, #0e0d18 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          background: `
            radial-gradient(ellipse 85% 45% at 50% 0%, rgba(99, 102, 241, 0.1) 0%, transparent 55%),
            radial-gradient(ellipse 55% 35% at 85% 90%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.28) 2px,
            rgba(0, 0, 0, 0.28) 4px
          )`,
        }}
      />
    </div>
  );
}
