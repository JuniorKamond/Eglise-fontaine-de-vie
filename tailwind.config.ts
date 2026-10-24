import type { Config } from "tailwindcss";

// Les couleurs sont définies en variables CSS dans src/app/globals.css
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        nuit: { DEFAULT: v("nuit"), profond: v("nuit-profond"), clair: v("nuit-clair") },
        source: v("source"),
        eau: v("eau"),
        or: { DEFAULT: v("or"), fonce: v("or-fonce"), pale: v("or-pale") },
        calcaire: v("calcaire"),
        encre: v("encre"),
        brume: v("brume"),
        trait: v("trait"),
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Échelle typographique (ratio ≈ 1.25, fluide)
        "display": ["clamp(3.5rem, 16vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "h1": ["clamp(2.6rem, 6.5vw, 5.25rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "h2": ["clamp(2.1rem, 4.6vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        "h3": ["clamp(1.45rem, 2.2vw, 1.9rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "editorial": ["clamp(1.6rem, 3.3vw, 2.65rem)", { lineHeight: "1.22", letterSpacing: "-0.012em" }],
        "lead": ["clamp(1.125rem, 1.6vw, 1.3rem)", { lineHeight: "1.6" }],
        "body": ["1.0625rem", { lineHeight: "1.7" }],
        "meta": ["0.875rem", { lineHeight: "1.5" }],
      },
      maxWidth: { site: "82rem", texte: "38rem" },
      spacing: { section: "clamp(5rem, 11vw, 9.5rem)" },
      transitionTimingFunction: { douce: "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        respire: { "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.045)" } },
        "page-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: { respire: "respire 24s ease-in-out infinite alternate", "page-in": "page-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both" },
    },
  },
  plugins: [],
};

export default config;
