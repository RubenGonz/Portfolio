import localFont from "next/font/local";

export const inputMono = localFont({
  src: [
    { path: "./InputMono/InputMono Regular.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-input-mono",
  display: "swap",
});

export const n27 = localFont({
  src: [
    { path: "./N27/N27-Bolditalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-n27",
  display: "swap",
});
