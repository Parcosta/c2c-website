import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { DM_Sans, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { Analytics } from "@/components/Analytics";

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
  description: "Foundations for a Next.js design system.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Design System Foundation"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }]
  },
  other: {
    "mobile-web-app-capable": "yes"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = headers().get("x-locale") ?? "en";

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} ${dmSans.variable} antialiased bg-slate-950 text-slate-50`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

