// ============================================================
// tailwind.config.js – Tailwind theme & dark mode setup
// ============================================================

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Toggle dark mode by adding/removing the "dark" class on <html>
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Expressive display + readable body (avoids default Inter/Roboto)
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef8f4',
          100: '#d5efe4',
          200: '#aee0cb',
          300: '#7cc9ad',
          400: '#4aab8c',
          500: '#2f8f72',
          600: '#23735c',
          700: '#1e5c4b',
          800: '#1a4a3d',
          900: '#163e34',
        },
        ink: {
          50: '#f6f5f2',
          100: '#ebe8e1',
          200: '#d6d0c4',
          700: '#3d3a34',
          800: '#2a2824',
          900: '#1a1916',
        },
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(26, 25, 22, 0.18)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out both',
        pulseSoft: 'pulseSoft 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
