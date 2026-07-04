import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "RubenGonz — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PILLS = ["React", "TypeScript", "Next.js", "Node.js", "Angular"];

export default async function OGImage() {
  const n27 = readFileSync(join(process.cwd(), "src/config/fonts/N27/N27-Bolditalic.ttf"));
  const mono = readFileSync(join(process.cwd(), "src/config/fonts/InputMono/InputMono Regular.otf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0d0d",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 620,
            height: 620,
            backgroundImage: "radial-gradient(circle, rgba(201,101,234,0.09) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Ghost bracket — decorative */}
        <div
          style={{
            position: "absolute",
            right: -30,
            top: 60,
            fontFamily: "N27",
            fontWeight: 700,
            fontSize: 340,
            color: "rgba(183,153,255,0.028)",
            lineHeight: 1,
            display: "flex",
          }}
        >
          {"{ }"}
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 36, gap: 0 }}>
          <span style={{ fontFamily: "N27", fontWeight: 700, fontSize: 30, color: "#c965ea" }}>{"{"}</span>
          <span style={{ fontFamily: "N27", fontWeight: 700, fontSize: 30, color: "#e8e8e8", margin: "0 7px" }}>rubengonz</span>
          <span style={{ fontFamily: "N27", fontWeight: 700, fontSize: 30, color: "#b799ff" }}>{"}"}</span>
        </div>

        {/* Name — main headline */}
        <div
          style={{
            fontFamily: "N27",
            fontWeight: 700,
            fontSize: 76,
            lineHeight: 0.92,
            color: "#d4d4d4",
            letterSpacing: "-0.02em",
            marginBottom: 30,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Rubén González</span>
          <span>Rodríguez</span>
        </div>

        {/* Terminal path */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 26 }}>
          <span style={{ fontFamily: "InputMono", fontSize: 13, color: "#6b7280" }}>~/portfolio</span>
          <span style={{ fontFamily: "InputMono", fontSize: 13, color: "#6b7280" }}>$</span>
          <span style={{ fontFamily: "InputMono", fontSize: 13, color: "#9ca3af", fontStyle: "italic" }}>
            Frontend Developer · Elche, Spain
          </span>
          <span style={{ fontFamily: "InputMono", fontSize: 13, color: "#b799ff" }}>▌</span>
        </div>

        {/* Gradient divider + tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 18, height: 1, background: "#b799ff", display: "flex" }} />
          <span
            style={{
              fontFamily: "InputMono",
              fontSize: 11,
              color: "#9ca3af",
              letterSpacing: "0.14em",
            }}
          >
            BANKING SECTOR · ENTERPRISE SYSTEMS · GOING FULL-STACK
          </span>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {PILLS.map((tech) => (
            <div
              key={tech}
              style={{
                fontFamily: "InputMono",
                fontSize: 11,
                color: "#9a85b8",
                border: "1px solid rgba(183,153,255,0.3)",
                padding: "4px 13px",
                display: "flex",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* URL bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            fontFamily: "InputMono",
            fontSize: 12,
            color: "#332840",
            letterSpacing: "0.1em",
            display: "flex",
          }}
        >
          <span style={{ color: "#6b7280" }}>rubengonz.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "N27", data: n27, style: "italic", weight: 700 },
        { name: "InputMono", data: mono, style: "normal", weight: 400 },
      ],
    }
  );
}
