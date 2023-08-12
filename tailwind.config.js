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
        'gradient-body': `linear-gradient(
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
        'gradient-accent': `linear-gradient(
          135deg,
          hsl(260deg 39% 50%) 0%,
          hsl(290deg 40% 48%) 21%,
          hsl(315deg 49% 52%) 30%,
          hsl(330deg 70% 58%) 39%,
          hsl(342deg 90% 64%) 46%,
          hsl(355deg 100% 69%) 54%,
          hsl(10deg 100% 68%) 61%,
          hsl(23deg 100% 64%) 69%,
          hsl(34deg 100% 61%) 79%,
          hsl(43deg 95% 58%) 100%
        );`
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
        'accent-gold': '#FAC02C'
      },
      animation: {
        'gradient-text': 'gradient-text 3s ease infinite'
      },
      keyframes: {
        'gradient-text': {
          '0%, 100%': {backgroundPosition: '0% 50%'},
          '50%': {backgroundPosition: '100% 50%'}
        }
      },
    },
  },
  plugins: [],
}
