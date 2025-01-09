/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          light: 'hsl(var(--primary-light))',
        },
        darker: {
          100: 'hsl(var(--darker-100))',
          200: 'hsl(var(--darker-200))',
          300: 'hsl(var(--darker-300))',
          400: 'hsl(var(--darker-400))',
          500: 'hsl(var(--darker-500))',
          600: 'hsl(var(--darker-600))',
          700: 'hsl(var(--darker-700))',
          800: 'hsl(var(--darker-800))',
          900: 'hsl(var(--darker-900))',
        },
      },
      keyframes: {
        contentShow: {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        contentHide: {
          from: {
            opacity: 1,
            transform: 'translateY(0)',
          },
          to: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        loadingBar: {
          '0%, 100%': {
            transform: 'scaleY(0.5)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'scaleY(1)',
            opacity: '1',
          },
        },
      },
      animation: {
        contentShow: 'contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        bounce: 'bounce 1s infinite',
        loadingBar: 'loadingBar 1s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
