import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const gamekid = localFont({
  src: "../../public/GameKidAdventure.ttf",
  variable: "--font-gamekid",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rodrigo OS | Rodrigo Seer",
  description:
    "Interactive retro portfolio system. Information Science student — software, AI tools, and web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${gamekid.variable} h-full overflow-hidden`}>
      <body className="h-dvh min-h-0 overflow-hidden font-sans antialiased">{children}</body>
    </html>
  );
}
