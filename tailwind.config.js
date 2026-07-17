/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#FBF5F0",
        blush: "#E8B4A0",
        terracotta: "#C1654B",
        bordeaux: "#5E2129",
        "bordeaux-deep": "#471820",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        arch: "999px 999px 0 0",
      },
      maxWidth: {
        page: "72rem",
      },
    },
  },
  plugins: [],
};
