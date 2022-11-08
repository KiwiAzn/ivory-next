const theme = 'business';

/** @type {import('tailwindcss').Config} */
module.exports = {
  relative: true,
  content: ['./app/**/*.{js,ts,jsx,tsx}', './ui/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    fontFamily: {
      hero: ['Permanent Marker', 'cursive'],
    },
  },
  daisyui: {
    themes: [theme],
    darkTheme: theme,
  },
};
