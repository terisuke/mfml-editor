/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'manga': ['"Hiragino Kaku Gothic ProN"', '"Noto Sans JP"', 'sans-serif'],
        'manga-round': ['"Hiragino Maru Gothic ProN"', '"Rounded Mplus 1c"', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.3s ease-in-out infinite',
        'pulse-fx': 'pulse-fx 1.5s ease-in-out infinite',
        'float': 'float 2s ease-in-out infinite',
        'explode': 'explode 0.5s ease-out forwards',
        'glitch': 'glitch 0.5s ease-in-out infinite',
        'aura': 'aura 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'speed': 'speed 0.8s linear infinite',
        'bounce-fx': 'bounce-fx 0.6s ease-in-out infinite',
        'wave': 'wave 1s ease-in-out infinite',
        'zoom': 'zoom 0.3s ease-out forwards',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(-3px) rotate(-2deg)' },
          '75%': { transform: 'translateX(3px) rotate(2deg)' },
        },
        'pulse-fx': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        explode: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)', filter: 'none' },
          '20%': { transform: 'translate(-3px, 3px)', filter: 'hue-rotate(90deg)' },
          '40%': { transform: 'translate(3px, -3px)', filter: 'hue-rotate(180deg)' },
          '60%': { transform: 'translate(-2px, -2px)' },
        },
        aura: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1.2)' },
          '50%': { opacity: '0.9', transform: 'scale(1.6)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.3) rotate(180deg)' },
        },
        speed: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'bounce-fx': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.15)' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        zoom: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
