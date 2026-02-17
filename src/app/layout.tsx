import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Design System Foundation",
  description: "Foundations for a Next.js design system."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${dmSans.variable} antialiased bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  );
}

