import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: false, 
  outdir: "styled-system",
  include: ["./src/**/*.{ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  globalCss: {
    html: {
      fontFamily: "system-ui, sans-serif",
      lineHeight: "1.6",
    },
    body: {
      margin: 0,
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          blue: {
            500: { value: "#3B82F6" },
            600: { value: "#2563EB" },
          },
          gray: {
            100: { value: "#F3F4F6" },
            200: { value: "#E5E7EB" },
            300: { value: "#D1D5DB" },
            800: { value: "#1F2A44" },
          },
        },
      },
    },
  },
});