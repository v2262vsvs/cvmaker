module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'violetShadow': '19px 21px 4px rgba(123, 97, 255, 0.31)',
        'violetShadowMenu': '7px 8px 4px rgba(123, 97, 255, 0.31)',
      },
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        greenn: {
          500: '#2ec36a'
        },
        bluee:{
          500:'#646ccc'
        }
      },
      scale:{
        '80':'0.80',
        '70':'0.70',
        '65':'0.65',
        '60':'0.60',
        '40':'0.40',
        '30':'0.30',
        '20':'0.20',
        '10':'0.10',
      },
      height: {
        '842': '52rem',
        '595': '37rem',
      },

    },

  },
  plugins: [],
};
