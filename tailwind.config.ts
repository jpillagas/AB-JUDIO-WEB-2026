import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta del despacho
        ink: {
          DEFAULT: "#0a0a0a",
          900: "#0f0f0f",
          800: "#171717",
          700: "#262626",
          600: "#404040",
        },
        bone: {
          DEFAULT: "#f5f5f4",
          100: "#fafaf9",
          200: "#e7e5e4",
        },
        gold: {
          DEFAULT: "#c9a86a",
          light: "#e2c896",
          dark: "#9b7f4a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "gold-pulse": "goldPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        goldPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,106,0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(201,168,106,0.25)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
