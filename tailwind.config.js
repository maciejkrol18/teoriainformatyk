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
        'gradient-loading': `
          linear-gradient(270deg, #262626, #595b5a)
        `,
        'gradient-accent': `linear-gradient(270deg, #6f4eb0, #fac02c)`,
        'inf02-link': `
          linear-gradient(90deg, transparent, black 80%),
          url('../public/inf02.webp') 
        `,
        'inf03-link': `
          linear-gradient(90deg, black 20%, transparent),
          url('../public/inf03.webp') 
        `,
        'ltr-link-gradient': `linear-gradient(90deg, transparent 0%, black 50%)`,
      },
      backgroundSize: {
        'size-loading': "400% 400%"
      },
      colors: {
        'text': 'hsl(var(--text))',
        'background': 'hsl(var(--background))',
        'primary': 'hsl(var(--primary))',
        'secondary': 'hsl(var(--secondary))',
        'accent': 'hsl(var(--accent))',
      },
      animation: {
        'loading': 'gradient-moving 1s ease infinite',
      },
      keyframes: {
        'gradient-moving': {
          '0%, 100%': {backgroundPosition: '0% 50%'},
          '50%': {backgroundPosition: '100% 50%'},
        }
      },
      boxShadow: {
        'card-inset': '0px 0px 10px 0px rgba(0, 0, 0, 0.25) inset',
      },
      fontFamily: {
        "sans": ["var(--font-inter)"],
        "display": ["var(--font-interdisplay)"],
      }
    },
  },
  plugins: [],
}
