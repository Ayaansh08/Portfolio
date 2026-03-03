/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080810',
        text: '#F0F4FF',
        accent: '#CBD6FF',
        surface: 'rgba(15, 15, 28, 0.85)',
        border: 'rgba(203, 214, 255, 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
