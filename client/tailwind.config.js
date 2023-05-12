/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FF55550d",
          500: "#FF5555",
        },
        secondary:"#FDE598",
        formBlue: "#F1F4FA",
        lightRed: "#FFB7C5",
        lightGrey: "#828282",
      },
    },
  },
  plugins: [],
};

