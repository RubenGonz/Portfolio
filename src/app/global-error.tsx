"use client";

import { useEffect } from "react";

// Catches errors that break the root layout itself — must provide its own html/body.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b0d0d", color: "#e8e8e2", fontFamily: "monospace" }}>
        <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", textAlign: "center" }}>
          {/* Dot pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Ghost braces */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            <span
              style={{
                fontFamily: "serif",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(280px, 50vw, 520px)",
                lineHeight: 1,
                background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {"{ }"}
            </span>
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "clamp(5rem,18vw,10rem)", lineHeight: 1, fontWeight: 700, fontStyle: "italic", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              500
            </span>
            <h1 style={{ fontSize: "1.125rem", margin: "0.75rem 0 0.5rem", fontWeight: 400 }}>Something went wrong</h1>
            <p style={{ fontSize: "0.875rem", color: "#888", maxWidth: "24rem", marginBottom: "2rem" }}>
              An unexpected error occurred. Try refreshing the page.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={reset}
                style={{ fontSize: "0.875rem", color: "#888", background: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "0.625rem 1.25rem", cursor: "pointer" }}
              >
                Try again
              </button>
              {/* Full page reload is intentional here: global-error replaces a
                  broken root layout, so we want a hard navigation, not a client
                  transition. next/link would keep the corrupted tree mounted. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/en"
                style={{ fontSize: "0.875rem", color: "#888", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "0.625rem 1.25rem" }}
              >
                ← Back to home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
