/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070a",
          900: "#080b0f",
          800: "#0d1117",
          700: "#141a21",
          600: "#1c242d",
        },
        line: "rgba(255,255,255,0.08)",
        fg: "#e9eef1",
        muted: "#8b98a3",
        teal: {
          DEFAULT: "#00dddd",
          300: "#5ff2ec",
          400: "#22e6e0",
          500: "#00dddd",
          600: "#00b3b3",
          700: "#008080",
          900: "#003d3d",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      opacity: {
        15: "0.15",
      },
      screens: {
        xs: "450px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        ping2: {
          "75%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        ping2: "ping2 1.8s cubic-bezier(0,0,0.2,1) infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
