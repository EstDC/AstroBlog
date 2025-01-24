/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {fontFamily: {
      simplicity: ['Simplicity', 'sans-serif'], 
      mallows: ['Mallows', 'sans-serif'], 
    },},
  },
  plugins: [],
};
