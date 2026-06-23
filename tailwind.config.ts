import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        // LUMA design system
        base: {
          950: "#070709",
          900: "#0D0D12",
          800: "#13131A",
          700: "#1A1A24",
          600: "#22222F",
          500: "#2C2C3E",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          strong: "rgba(255,255,255,0.12)",
          accent: "rgba(139,92,246,0.4)",
        },
        text: {
          primary: "#F4F4F6",
          secondary: "#9898A6",
          tertiary: "#5A5A6E",
        },
        accent: {
          violet: "#8B5CF6",
          "violet-dim": "#6D28D9",
          cyan: "#06B6D4",
          "cyan-dim": "#0891B2",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle, rgba(139,92,246,0.06) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#9898A6",
            "h1,h2,h3,h4": { color: "#F4F4F6" },
            strong: { color: "#F4F4F6" },
            code: {
              color: "#8B5CF6",
              background: "#1A1A24",
              padding: "0.15em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            a: { color: "#8B5CF6" },
            hr: { borderColor: "rgba(255,255,255,0.07)" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
