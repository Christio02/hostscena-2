import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "450px",
        phone: "720px",
        tablet: "990px",
        laptop: "1150px",
        desktop: "1440px",
      },
      fontFamily: {
        sans: ["var(--font-source)"],
        heading: ["var(--font-wittgenstein)"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      fontSize: {
        // custom body font size utility
        body: "var(--body)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
