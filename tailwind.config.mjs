/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        appColor: "#009688",
      },
      fontFamily: {
        appFont: "Montserrat",
      },
      keyframes: {
        featuresAnimation: {"0%": {
            boxShadow: "0 0 0 0 rgba(0, 150, 136, 0.7), 0 0 0 0 rgba(0, 150, 136, 0.7)",
          },
          "40%": {
            boxShadow: "0 0 0 15px rgba(0, 150, 136, 0), 0 0 0 0 rgba(0, 150, 136, 0.7)",
          },
          "80%": {
            boxShadow: "0 0 0 15px rgba(0, 150, 136, 0), 0 0 0 10px rgba(0, 150, 136, 0)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(0, 150, 136, 0), 0 0 0 10px rgba(0, 150, 136, 0)",
          },
        },
      },
      animation: {
        featuresAnimation: "featuresAnimation 2s infinite",
      },
    },
  },
  plugins: [],
};