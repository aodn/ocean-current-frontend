/** @type {import('tailwindcss').Config} */
import { color } from './src/styles/colors';

export default {
  important: '#root',
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      xl: '1280px',
    },
    extend: {
      colors: {
        'imos-deep-blue': color.primary1,
        'imos-deeper-blue': color.primary2,
        'imos-sea-blue': color.seaBlue,
        'imos-light-blue': color.primary5,
        'imos-accent-orange': color.accentOrange,
        'imos-sand': color.sand,
        'imos-light-grey': color.lightGrey,
        'imos-mid-grey': color.grey2,
        'imos-title-blue': color.blue2,
        'imos-grey': color.grey,
        'imos-dark-grey': color.grey3,
        'imos-text-grey': color.textGrey,
        'imos-subheading-grey': color.subheadingGrey,
      },
      backgroundImage: {
        'background-gradient': 'linear-gradient(180deg, #DCDCDC 0%, rgba(217, 217, 217, 0.34) 100%)',
        'background-argo-gradient':
          'linear-gradient(to right, rgba(82, 77, 171, 1), rgba(94, 216, 233, 1), rgba(125, 232, 149, 1), rgba(253, 215, 104, 1), rgba(202, 112, 92, 1))',
      },
      fontSize: {
        body: ['10pt', { lineHeight: '12pt' }],
        h3: ['13pt', { lineHeight: '15.6pt' }],
        h2: ['18pt', { lineHeight: '21.6pt' }],
        h1: ['24pt', { lineHeight: '28.8pt' }],
        h0: ['8rem', { lineHeight: '1.75rem' }],
      },
      fontFamily: {
        noto: ['NotoSans', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '90rem',
      },
      dropShadow: {
        xy4: '4px 4px 10px rgba(0, 0, 0, 0.25)',
        x0y4: '0px 4px 6px rgba(0, 0, 0, 0.25)',
      },
      boxShadow: {
        'layout-shadow': '4px 4px 10px 0 rgba(0,0,0,0.20)',
        'inset-custom': 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
      },
      height: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
