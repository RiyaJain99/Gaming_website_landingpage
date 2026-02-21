/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        body: ["'Rajdhani'", "sans-serif"],
        accent: ["'Exo 2'", "sans-serif"],
      },
      colors: {
        neon: {
          purple: "#bf5fff",
          blue: "#00d4ff",
          pink: "#ff2d78",
          cyan: "#00ffe7",
          gold: "#ffd700",
        },
      },
      boxShadow: {
        "neon-purple": "0 0 20px #bf5fff, 0 0 40px #bf5fff44",
        "neon-blue": "0 0 20px #00d4ff, 0 0 40px #00d4ff44",
        "neon-pink": "0 0 20px #ff2d78, 0 0 40px #ff2d7844",
        "neon-cyan": "0 0 20px #00ffe7, 0 0 40px #00ffe744",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(ellipse at 50% 50%, #1a0533 0%, #050816 60%, #000000 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(191, 95, 255, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)",
        "glow-gradient": "linear-gradient(90deg, #bf5fff, #00d4ff, #ff2d78)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scanLine: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
