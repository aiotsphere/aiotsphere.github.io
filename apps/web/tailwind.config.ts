module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#7c3aed',
        primary: '#0ea5a4',
      },
      boxShadow: {
        glow: '0 0 60px rgba(124, 58, 237, 0.18)',
      },
    },
  },
  plugins: [],
};
