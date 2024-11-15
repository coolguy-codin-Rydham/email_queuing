/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/**/*.{js, ts, tsx, jsx, mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
