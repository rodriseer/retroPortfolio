import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        retro: ["var(--font-gamekid)", "GameKid", "ui-monospace", "monospace"],
      },
      colors: {
        retro: {
          panel: "rgba(30, 25, 50, 0.85)",
          "panel-solid": "#1e1932",
          border: "#4c4a6a",
          "border-light": "#6b6890",
          "border-inner": "#3d3a55",
          highlight: "#a78bfa",
          "highlight-bright": "#c4b5fd",
          glow: "rgba(139, 92, 246, 0.25)",
          text: "#f2f0fa",
          muted: "#8f8ca8",
          "boot": "#0f0e1a",
          "boot-title": "#c4b5fd",
          "boot-cta": "#e0d5ff",
          "boot-muted": "#6b6890",
          "bg-dark": "#12101f",
          "bg-mid": "#1a1730",
          "bg-card": "rgba(26, 23, 48, 0.9)",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 16px rgba(139, 92, 246, 0.08)",
        "glow-md": "0 0 28px rgba(139, 92, 246, 0.1)",
        "panel-glow": "0 0 20px rgba(139, 92, 246, 0.06), 0 4px 28px rgba(0,0,0,0.45)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        loadingBar: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        bootDot: {
          "0%, 100%": { opacity: "0.4", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        bootFlash: {
          "0%": { opacity: "0", backgroundColor: "rgb(248 250 252)" },
          "30%": { opacity: "1" },
          "100%": { opacity: "0", backgroundColor: "transparent" },
        },
        gradientShift: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.92" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)" },
          "50%": { boxShadow: "0 0 35px rgba(139, 92, 246, 0.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-6px) translateX(3px)" },
          "66%": { transform: "translateY(-3px) translateX(-4px)" },
        },
        osScreenIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        osGlowOpacity: {
          "0%, 100%": { opacity: "0.14" },
          "50%": { opacity: "0.22" },
        },
        osBorderGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 8px rgba(167, 139, 250, 0.08), 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(196, 181, 253, 0.08)",
          },
          "50%": {
            boxShadow:
              "0 0 14px rgba(167, 139, 250, 0.14), 0 4px 18px rgba(0, 0, 0, 0.38), inset 0 0 0 1px rgba(196, 181, 253, 0.12)",
          },
        },
        osBorderGlowNav: {
          "0%, 100%": {
            boxShadow:
              "inset 3px 0 0 0 rgba(167, 139, 250, 0.55), 0 2px 12px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(196, 181, 253, 0.08)",
          },
          "50%": {
            boxShadow:
              "inset 3px 0 0 0 rgba(196, 181, 253, 0.7), 0 2px 14px rgba(0, 0, 0, 0.32), inset 0 0 0 1px rgba(196, 181, 253, 0.12)",
          },
        },
        osSelectorNudge: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(3px)" },
        },
        osScreenFlash: {
          "0%": { opacity: "0.08" },
          "100%": { opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-retro": "linear-gradient(135deg, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "slide-down": "slideDown 0.35s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "blink": "blink 1.2s step-end infinite",
        "loading-bar": "loadingBar 2.4s ease-in-out forwards",
        "boot-dot": "bootDot 0.6s ease-in-out infinite",
        "boot-flash": "bootFlash 0.6s ease-out forwards",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "os-screen-in": "osScreenIn 0.26s cubic-bezier(0.25, 0.8, 0.25, 1) forwards",
        "os-glow-opacity": "osGlowOpacity 2.4s ease-in-out infinite",
        "os-border-glow": "osBorderGlow 2.6s ease-in-out infinite",
        "os-border-glow-nav": "osBorderGlowNav 4s ease-in-out infinite",
        "os-selector-nudge": "osSelectorNudge 1.1s ease-in-out infinite",
        "os-screen-flash": "osScreenFlash 0.22s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
