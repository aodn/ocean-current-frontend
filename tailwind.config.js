/** @type {import('tailwindcss').Config} */
export default {
  important: '#root',
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'imos-deep-blue': '#3b6e8f',
        'imos-sea-blue': '#52BDEC',
        'imos-accent-orange': '#e36f1e',
        'imos-sand': '#d9d7bd',
        'imos-mid-grey': '#3c3c3c',
        'imos-title-blue': '#356183',
        'imos-grey': '#8C8C8C',
        'imos-black': '#555555',
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
      },
      maxWidth: {
        '8xl': '90rem',
      },
      dropShadow: {
        xy4: '4px 4px 10px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
