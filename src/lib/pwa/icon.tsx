import type { ReactElement } from "react";

type IconOptions = {
  size: number;
  label: string;
  mono: string;
};

export function getPwaIconElement({ size, label, mono }: IconOptions): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#020617",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: "86%",
          height: "86%",
          borderRadius: Math.round(size * 0.125),
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            color: "#f8fafc",
            fontWeight: 800,
            letterSpacing: Math.round(size * -0.004),
            lineHeight: 1,
            fontSize: Math.round(size * 0.31)
          }}
        >
          {mono}
        </div>
        <div
          style={{
            marginTop: Math.round(size * 0.02),
            color: "rgba(248,250,252,0.8)",
            fontWeight: 600,
            letterSpacing: 1,
            fontSize: Math.round(size * 0.055),
            textTransform: "uppercase"
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
