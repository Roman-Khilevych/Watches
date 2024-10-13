import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'watch-primary': ['var(--font-notoSans)', 'sans-serif'],
        'watch-secondary': ['var(--font-josefin)', 'sans-serif'],
      },
      colors: {
        'watch-primary': '#1d1d1d',
        'watch-white': '#ffffff',
        'watch-gray1': '#2f2f2f',
        'watch-gray2': '#949494',
        'watch-gray3': '#363636',
        'watch-gray4': '#dddddd',
        'watch-red1': '#ef4444',
        'watch-red2': '#dc2626',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '1.5rem',
        },
      },
      boxShadow: {
        'watch-line-top': '0 1px #3f3f3f inset',
        'watch-line-bottom': '0 -1px #3f3f3f inset',
      },
      screens: {
        '2xl': '1440px',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }: PluginAPI) {
      addBase({
        ':root': {
          '--color-watch-primary': theme('colors.watch-primary'),
          '--color-watch-white': theme('colors.watch-white'),
          '--color-watch-gray1': theme('colors.watch-gray1'),
          '--color-watch-gray2': theme('colors.watch-gray2'),
          '--color-watch-gray3': theme('colors.watch-gray3'),
          '--color-watch-gray4': theme('colors.watch-gray4'),
          '--color-watch-red1': theme('colors.watch-red1'),
          '--color-watch-red2': theme('colors.watch-red2'),
        },
      });
    },
  ],
};
export default config;
