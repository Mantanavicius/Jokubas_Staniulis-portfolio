/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f0f",
        light: "#f0f0f0",
        sage: "#cfcaaa",
        metal: "#223944",
        red: "#df0101",
      },
      fontFamily: {
        norman: ["norman-variable", "sans-serif"],
        unbounded: ["Unbounded", "sans-serif"],
        shoulders: ["Big Shoulders Text", "cursive"],
      },
    },
  },
  plugins: [],
};
