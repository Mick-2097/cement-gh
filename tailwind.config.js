/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {},
    screens: {
      xsm: '332px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xxl: '1536px'
    }
  },
  plugins: []
}
