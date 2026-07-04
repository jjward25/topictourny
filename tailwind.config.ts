import { type Config } from "tailwindcss"

export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
        marquee: ["var(--font-bungee)", "cursive"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fade-in 0.5s ease-out both",
        "pop": "pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "float": "float 6s ease-in-out infinite",
        "twinkle": "twinkle 1.4s ease-in-out infinite",
        "shine": "shine 1.8s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop": {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "shine": {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(250%) skewX(-20deg)" },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        muted: "hsl(var(--muted))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent1: "hsl(var(--accent-1))",
        accent2: "hsl(var(--accent-2))",
        accent3: "hsl(var(--accent-3))",
        gold: "hsl(var(--gold))",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(255, 45, 120, 0.45)",
        "glow-cyan": "0 0 40px -8px rgba(0, 194, 255, 0.45)",
        "glow-amber": "0 0 40px -8px rgba(255, 200, 51, 0.5)",
        card: "0 8px 30px -12px rgba(0, 0, 0, 0.6)",
        spotlight: "0 0 120px 40px hsl(var(--gold) / 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config

