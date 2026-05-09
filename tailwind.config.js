/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5ead8',
        amber: {
          warm: '#d4956a',
          deep: '#c17b45',
          light: '#e8b48a',
          pale: '#f0d5b8',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        glass: '16px',
      },
    },
  },
  plugins: [],
}
