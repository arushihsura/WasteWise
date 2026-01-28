/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#2d5f4f',
        'light-green': '#4a8b7d',
        'accent-green': '#6db99e',
        'beige': '#f5ede4',
        'light-beige': '#faf7f2',
        'accent-gold': '#d4a574',
      },
    },
  },
  plugins: [],
}
