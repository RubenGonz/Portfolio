import localFont from "next/font/local";

export const inputMono = localFont({
  src: [
    // Thin 100
    { path: "./InputMono/InputMono Thin.otf", weight: "100", style: "normal" },
    { path: "./InputMono/InputMono Thin Italic.otf", weight: "100", style: "italic" },

    // ExtraLight 200
    { path: "./InputMono/InputMono ExtraLight.otf", weight: "200", style: "normal" },
    { path: "./InputMono/InputMono ExtraLight Italic.otf", weight: "200", style: "italic" },

    // Light 300
    { path: "./InputMono/InputMono Light.otf", weight: "300", style: "normal" },
    { path: "./InputMono/InputMono Light Italic.otf", weight: "300", style: "italic" },

    // Regular 400
    { path: "./InputMono/InputMono Regular.otf", weight: "400", style: "normal" },
    { path: "./InputMono/InputMono Regular Italic.otf", weight: "400", style: "italic" },

    // Medium 500
    { path: "./InputMono/InputMono Medium.otf", weight: "500", style: "normal" },
    { path: "./InputMono/InputMono Medium Italic.otf", weight: "500", style: "italic" },

    // Bold 700
    { path: "./InputMono/InputMono Bold.otf", weight: "700", style: "normal" },
    { path: "./InputMono/InputMono Bold Italic.otf", weight: "700", style: "italic" },

    // Black 900
    { path: "./InputMono/InputMono Black.otf", weight: "900", style: "normal" },
    { path: "./InputMono/InputMono Black Italic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-input-mono",
  display: "swap",
});

export const n27 = localFont({
  src: [
    // Thin 100
    { path: "./N27/N27-Thin.ttf", weight: "100", style: "normal" },
    { path: "./N27/N27-Thinitalic.ttf", weight: "100", style: "italic" },

    // ExtraLight 200
    { path: "./N27/N27-Extralight.ttf", weight: "200", style: "normal" },
    { path: "./N27/N27-Extralightitalic.ttf", weight: "200", style: "italic" },

    // Light 300
    { path: "./N27/N27-Light.ttf", weight: "300", style: "normal" },
    { path: "./N27/N27-Lightitalic.ttf", weight: "300", style: "italic" },

    // Regular 400
    { path: "./N27/N27-Regular.ttf", weight: "400", style: "normal" },
    { path: "./N27/N27-Regularitalic.ttf", weight: "400", style: "italic" },

    // Medium 500
    { path: "./N27/N27-Medium.ttf", weight: "500", style: "normal" },
    { path: "./N27/N27-Mediumitalic.ttf", weight: "500", style: "italic" },

    // Bold 700
    { path: "./N27/N27-Bold.ttf", weight: "700", style: "normal" },
    { path: "./N27/N27-Bolditalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-n27",
  display: "swap",
});
