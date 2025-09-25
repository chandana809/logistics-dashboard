/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b6b',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.05)'
      }
    },
  },
  plugins: [],
}


