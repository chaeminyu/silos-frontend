/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ Custom elegant colors - teal smoke theme
      colors: {
        'teal-smoke': {
          50: '#f0f9f9',
          100: '#e1f2f2',
          200: '#c3e6e6',
          300: '#b4cdcd', // Main teal smoke color
          400: '#8eb8b8',
          500: '#6aa3a3',
          600: '#558888',
          700: '#446d6d',
          800: '#335252',
          900: '#223737'
        },
        'elegant': {
          50: '#fafbfb',
          100: '#f5f7f7',
          200: '#e8eded',
          300: '#dbe3e3',
          400: '#c1d0d0',
          500: '#a7bdbd',
          600: '#8daaaa',
          700: '#739797',
          800: '#597a7a',
          900: '#3f5d5d'
        }
      },
      
      // ✅ Pretendard font families
      fontFamily: {
        'sans': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
        'elegant': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'elegant-sans': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'display': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      // ✅ 1. animation & keyframes
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin 15s linear infinite reverse',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // ✅ 2. rotate, translate 등은 keyframes 밖에서 정의
      rotate: {
        'y-12': 'rotateY(12deg)',
        '-y-6': 'rotateY(-6deg)',
        '-y-12': 'rotateY(-12deg)',
      },
      translate: {
        'z-20': 'translateZ(20px)',
        '-z-20': 'translateZ(-20px)',
        '-z-40': 'translateZ(-40px)',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.rotate-y-12': {
          transform: 'rotateY(12deg)',
        },
        '.-rotate-y-6': {
          transform: 'rotateY(-6deg)',
        },
        '.-rotate-y-12': {
          transform: 'rotateY(-12deg)',
        },
        '.-translate-z-20': {
          transform: 'translateZ(-20px)',
        },
        '.-translate-z-40': {
          transform: 'translateZ(-40px)',
        },
      });
    },
  ],
};
