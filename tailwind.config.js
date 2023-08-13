/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-primary': `linear-gradient(
          180deg,
          hsl(0deg 0% 12%) 0%,
          hsl(344deg 0% 11%) 21%,
          hsl(344deg 0% 10%) 30%,
          hsl(344deg 0% 9%) 39%,
          hsl(344deg 0% 8%) 46%,
          hsl(344deg 0% 7%) 54%,
          hsl(344deg 0% 5%) 61%,
          hsl(344deg 0% 4%) 69%,
          hsl(344deg 0% 2%) 79%,
          hsl(0deg 0% 0%) 100%
        )`,
        'gradient-accent': `linear-gradient(270deg, #6f4eb0, #fac02c)`,
        'inf02-link': `
          linear-gradient(90deg, transparent, black 80%),
          url('../../public/inf02.webp') 
        `,
        'inf03-link': `
          linear-gradient(90deg, black 20%, transparent),
          url('../../public/inf03.webp') 
        `,
        'ltr-link-gradient': `linear-gradient(90deg, transparent 0%, black 50%)`,
      },
      colors: {
        'foreground': '#D6D6D6',
        'primary': '#1B1B1B',
        'secondary-300': '#353535',
        'secondary-400': '#2E2E2E',
        'secondary-500': '#232323',
        'positive-light': '#278F44',
        'positive-dark': '#125725',
        'danger-light': '#DB3939',
        'danger-dark': '#541A1A',
        'notify': '#1B6EBB',
        'accent-purple': '#6F4EB0',
        'accent-gold': '#FAC02C',
      },
      animation: {
        'moving-gradient': 'gradient-text 3s ease infinite',
      },
      keyframes: {
        'gradient-text': {
          '0%, 100%': {backgroundPosition: '0% 50%'},
          '50%': {backgroundPosition: '100% 50%'},
        }
      },
      boxShadow: {
        'card-inset': '0px 0px 10px 0px rgba(0, 0, 0, 0.25) inset',
      }
    },
  },
  plugins: [],
}
