/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#1E3A8A", hover: "#1E40AF" },
        accent:  { DEFAULT: "#3B82F6", soft: "#DBEAFE" },
        surface: { DEFAULT: "#F8FAFC", muted: "#F1F5F9" },
        ink:     { DEFAULT: "#0F172A", soft: "#64748B" },
        line:    "#E2E8F0",
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
