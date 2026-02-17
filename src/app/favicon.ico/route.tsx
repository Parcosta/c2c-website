import { ImageResponse } from "next/og";

export const runtime = "edge";

function wrapPngAsIco(pngBytes: Uint8Array, width: number, height: number): Uint8Array {
  const headerSize = 6;
  const entrySize = 16;
  const imageOffset = headerSize + entrySize;
  const buffer = new ArrayBuffer(imageOffset + pngBytes.byteLength);
  const view = new DataView(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);

  view.setUint8(6, width >= 256 ? 0 : width);
  view.setUint8(7, height >= 256 ? 0 : height);
  view.setUint8(8, 0);
  view.setUint8(9, 0);
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, pngBytes.byteLength, true);
  view.setUint32(18, imageOffset, true);

  new Uint8Array(buffer, imageOffset).set(pngBytes);
  return new Uint8Array(buffer);
}

export async function GET() {
  const pngResponse = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f8fafc",
        fontWeight: 900,
        fontSize: 20,
        lineHeight: 1
      }}
    >
      D
    </div>,
    { width: 32, height: 32 }
  );

  const pngBytes = new Uint8Array(await pngResponse.arrayBuffer());
  const icoBytes = wrapPngAsIco(pngBytes, 32, 32);

  return new Response(icoBytes as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
