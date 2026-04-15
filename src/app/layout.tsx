import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Primary retro UI / display face (headings, chrome, short labels). Body copy uses `font-sans` / Inter only. */
const pressStart2P = localFont({
  src: "../../public/fonts/PressStart2P-Regular.ttf",
  variable: "--font-press-start",
  weight: "400",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Rodrigo OS | Rodrigo Seer",
  description:
    "Software engineer portfolio — data-driven apps, APIs, and tools people use. Interactive Rodrigo OS experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pressStart2P.variable} h-full overflow-hidden`}
    >
      <body className="h-dvh min-h-0 overflow-hidden font-sans antialiased">{children}</body>
    </html>
  );
}
