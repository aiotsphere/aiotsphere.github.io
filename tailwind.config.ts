import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#081120",
        cyan: "#00D1FF",
        violet: "#8B5CF6",
        silver: "#C0C0C0"
      },
      boxShadow: {
        neon: "0 0 28px rgba(0, 209, 255, 0.32)",
        violet: "0 0 34px rgba(139, 92, 246, 0.35)"
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(0,209,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,209,255,.08) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
