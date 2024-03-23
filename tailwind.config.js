/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: '1rem'
    },
    extend: {
      backgroundImage: {
        'gradient-loading': `
          linear-gradient(270deg, #262626, #595b5a)
        `,
        'gradient-accent': `linear-gradient(270deg, #6f4eb0, #fac02c)`,
      },
      backgroundSize: {
        'size-loading': "400% 400%"
      },
      colors: {
        'text': 'hsl(var(--text))',
        'background': 'hsl(var(--background))',
        'background-light': 'hsl(var(--background-light))',
        'background-bright': 'hsl(var(--background-bright))',
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
  darkMode: 'class'
}
