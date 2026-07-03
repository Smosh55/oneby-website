import React from "react";

// Shared layout for dynamically generated Open Graph / Twitter images
// (1200x630). Used by the opengraph-image routes. Satori (next/og) supports
// inline styles only; every container with multiple children sets display:flex.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function OgShell({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow: string;
}) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#04034F",
        backgroundImage:
          "linear-gradient(135deg, #04034F 0%, #04034F 55%, #0a0985 100%)",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      {/* brand mark + wordmark */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", marginRight: "18px" }}>
          <div
            style={{
              width: "26px",
              height: "46px",
              background: "#1CDB96",
              borderRadius: "6px",
              transform: "skewX(-8deg)",
            }}
          />
          <div
            style={{
              width: "26px",
              height: "46px",
              background: "#008FE0",
              borderRadius: "6px",
              marginLeft: "8px",
              transform: "skewX(-8deg)",
            }}
          />
        </div>
        <span style={{ color: "#fff", fontSize: "40px", fontWeight: 700 }}>
          OneBy
        </span>
      </div>

      {/* headline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#1CDB96",
            fontSize: "26px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            color: "#ffffff",
            fontSize: "66px",
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: "18px",
            maxWidth: "1000px",
          }}
        >
          {title}
        </span>
      </div>

      {/* footer */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "44px",
            height: "5px",
            background: "#008FE0",
            borderRadius: "3px",
            marginRight: "16px",
          }}
        />
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "26px" }}>
          {new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://oneby.ai").host}
        </span>
      </div>
    </div>
  );
}
