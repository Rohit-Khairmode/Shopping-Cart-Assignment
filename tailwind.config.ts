import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#bcbfc3",
          100: "#a5a9af",
          200: "#797f87",
          300: "#4c545f",
          400: "#1f2937",
          500: "#1f2937",
          600: "#1c2532",
          700: "#131921",
          800: "#10151c",
          900: "#0c1016",
          950: "#06080b",
        },
        accent: {
          20: "#fefbfb",
          50: "#f8d4d4",
          100: "#f1a8a8",
          200: "#ea7d7d",
          300: "#e35151",
          400: "#e03c3c",
          500: "#dc2626",
          600: "#c62222",
          700: "#b01e1e",
          800: "#9a1b1b",
          900: "#580f0f",
          950: "#160404",
        },
      },
      screens: {
        sm: "500px",

        md: "720px",

        lp: "840px", //laptop screens

        lg: "1024px",

        xl: "1280px",

        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
export default config;
