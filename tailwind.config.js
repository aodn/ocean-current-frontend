/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'imos-deep-blue': '#3b6e8f',
        'imos-sea-blue': '#54bceb',
        'imos-accent-orange': '#e36f1e',
        'imos-sand': '#d9d7bd',
        'imos-mid-grey': '#3c3c3c',
      },
      fontSize: {
        body: ['10pt', { lineHeight: '12pt' }],
        h3: ['13pt', { lineHeight: '15.6pt' }],
        h2: ['18pt', { lineHeight: '21.6pt' }],
        h1: ['24pt', { lineHeight: '28.8pt' }],
        h0: ['32pt', { lineHeight: '38.4pt' }],
      },
      fontFamily: {
        helvetica: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
