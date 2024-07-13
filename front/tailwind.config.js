/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'oiches-live':"url('/oiches/front/src/assets/oiches-Live.jpg')"
      }
    },
  },
  plugins: [],
}

