/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['border-blue-800'],
  theme: {
    container: {
      padding: '1rem',
    },
    extend: {
      backgroundImage: {
        'gradient-loading': `
          linear-gradient(to right, hsl(var(--loader-from)), hsl(var(--loader-to)))
        `,
        'hero-blob': `
          linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 20%, hsl(var(--background)) 60%), 
          url('../../public/hero-blob.svg')
        `,
        // the url() path is relative to 'src/app/globals.css' not this file (tailwind.config.js)
      },
      backgroundSize: {
        'size-loading': '400% 400%',
      },
      colors: {
        text: 'hsl(var(--text))',
        muted: 'hsl(var(--muted))',
        background: 'hsl(var(--background))',
        'background-light': 'hsl(var(--background-light))',
        'background-bright': 'hsl(var(--background-bright))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        correct: 'hsl(var(--correct))',
        incorrect: 'hsl(var(--incorrect))',
        unanswered: 'hsl(var(--unanswered))',
      },
      animation: {
        loading: 'gradient-moving 1s ease infinite',
      },
      keyframes: {
        'gradient-moving': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'card-inset': '0px 0px 10px 0px rgba(0, 0, 0, 0.25) inset',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-interdisplay)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class',
}
