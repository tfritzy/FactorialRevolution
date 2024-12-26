/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./frontend/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#251d3b",
        "blue": "#4d5e84",
        "blue/10": "#4d5e8411",
        "gold": "#ffe250",
        "gold/50": "#ffe25088",
        "gold/10": "#ffe25011"
      }
    },
  },
};
