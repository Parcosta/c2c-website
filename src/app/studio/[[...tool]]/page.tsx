"use client";

import dynamic from "next/dynamic";

import { studioConfig } from "@/sanity/studio";

const Studio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false,
  loading: () => <div className="p-6 text-sm text-slate-300">Loading Studio…</div>
});

export default function StudioPage() {
  return <Studio config={studioConfig} />;
}
