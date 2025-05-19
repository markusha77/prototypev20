/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: 0.7 },
          '50%': { opacity: 0.3 },
        },
      },
      aspectRatio: {
        'w-16': '16',
        'h-9': '9',
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
      },
      rotate: {
        '30': '30deg',
      },
    },
  },
  plugins: [],
}
