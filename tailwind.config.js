/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iron: {
          900: '#0a0a0a', // Solid Black
          800: '#171717', // Dark Gray
          700: '#262626', // Steel
          500: '#737373', // Light Steel
        },
        blood: {
          600: '#dc2626', // Blood Red
          700: '#b91c1c', // Deep Crimson
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
