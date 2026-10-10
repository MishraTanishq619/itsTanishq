import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content/profile";

// Link preview (WhatsApp, LinkedIn, X, Slack): the hero in miniature.
export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/font serves woff2, which the OG renderer can't read; use the TTFs from the geist package.
const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans");
const [regular, bold] = await Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "Geist-Bold.ttf")),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f5f5",
          color: "#171717",
          padding: "56px 64px",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#c6f432",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            TM
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700 }}>{profile.name}</span>
            <span style={{ fontSize: 24, color: "#6b6b6b" }}>Building at HealthyDay · Based in India</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700 }}>
            <span>A</span>
            <span>FULL-STACK</span>
            <span>PRODUCT</span>
          </div>
          <span style={{ fontSize: 212, fontWeight: 700, letterSpacing: -7, lineHeight: 0.9 }}>ENGINEER</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
