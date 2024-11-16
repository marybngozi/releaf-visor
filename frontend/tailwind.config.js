/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        primary: "#05627c",
        secondary: "#399375",
      },
    },
    fontFamily: {
      mulish: ["Mulish", "sans-serif"],
    },
  },
  plugins: [],
};
