/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#FBF9F4',
        ivory: '#F4EFE6',
        terracotta: '#A44231',
        indigo: '#1C2A39',
        golden: '#C89B3C',
      },
      fontFamily: {
        sans: ['Inter', 'Onest', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
