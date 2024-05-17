/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class", '[data-theme="dim"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        secondary: "#166534",
        dead: "#ef4444",
        alive: "#0284c7",
      },
    },
    screens: {
      xs: "344px",
      xp: "414px",
      ...defaultTheme.screens,
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dim"],
  },
};
