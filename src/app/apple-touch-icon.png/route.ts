import { ImageResponse } from "next/og";

import { getPwaIconElement } from "@/lib/pwa/icon";

export const runtime = "edge";

export function GET() {
  const response = new ImageResponse(
    getPwaIconElement({ size: 180, label: "Foundation", mono: "DS" }),
    { width: 180, height: 180 }
  );
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return response;
}

