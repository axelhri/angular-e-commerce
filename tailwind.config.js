/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        indigo: 'var(--color-indigo)',
        midnight: 'var(--color-midnight)',
        amber: 'var(--color-amber)',
        grey: 'var(--color-grey)',
        cream: 'var(--color-cream)',
        red: 'var(--color-red)',
        green: 'var(--color-green)',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        jakarta: ['var(--font-jakarta)'],
      },
    },
  },
  plugins: [],
};
