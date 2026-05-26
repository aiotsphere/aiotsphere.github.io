import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5a4',
        accent: '#7c3aed'
      }
    }
  },
  plugins: []
})
