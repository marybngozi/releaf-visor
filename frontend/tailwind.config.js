/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
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
    // screens: {
    //   sm: "576px",
    //   // => @media (min-width: 576px) { ... }

    //   md: "960px",
    //   // => @media (min-width: 960px) { ... }

    //   lg: "1440px",
    //   // => @media (min-width: 1440px) { ... }
    // },
  },
  plugins: [],
};
