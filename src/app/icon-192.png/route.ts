import { ImageResponse } from "next/og";

import { getPwaIconElement } from "@/lib/pwa/icon";

export const runtime = "edge";

export function GET() {
  const response = new ImageResponse(
    getPwaIconElement({ size: 192, label: "Foundation", mono: "DS" }),
    { width: 192, height: 192 }
  );
  response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return response;
}
