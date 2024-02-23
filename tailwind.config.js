/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('~/assets/welcome.png')",
      }
    },
  },
  plugins: [],
}

