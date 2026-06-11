/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0f0d',
        surface: '#111815',
        'surface-light': '#161f1b',
        border: '#1f2b26',
        primary: {
          DEFAULT: '#39ff88',
          dark: '#22c563',
          light: '#7dffb3',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(57, 255, 136, 0.15)',
        card: '0 4px 24px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        scaleIn: 'scaleIn 0.15s ease-out',
      },
    },
  },
  plugins: [],
}
