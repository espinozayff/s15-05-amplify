/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        'keyframes-svg-filled': {
          '0%': { transform: 'scale(0)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1)', filter: 'brightness(1.5)' },
        },
        'keyframes-svg-celebrate': {
          '0%': { transform: 'scale(0)' },
          '50%': { opacity: 1, filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(1.4)', opacity: 0, display: 'none' },
        },
      },
      animation: {
        'svg-filled': 'keyframes-svg-filled 1s',
        'svg-celebrate': 'keyframes-svg-celebrate .5s forwards',
      },
      colors: {
        'heart-color': 'rgb(255, 91, 137)',
      },
    },
  },
  plugins: [],
};