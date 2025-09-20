/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ Bright Teal theme - lighter and modern
      colors: {
        'teal-smoke': {
          50: '#f0f9fa',
          100: '#d9eff1',
          200: '#b3dfe3',
          300: '#69C5CC', // Main color - darkest point
          400: '#7ACDD3',
          500: '#8BD5DA',
          600: '#9CDDE1',
          700: '#ADE5E8',
          800: '#BEEDEF',
          900: '#CFF5F6'
        },
        'elegant': {
          50: '#f5fbfc',
          100: '#e8f5f7',
          200: '#d1eaed',
          300: '#a9d7dc',
          400: '#88CCD3',
          500: '#95D2D8',
          600: '#A2D8DD',
          700: '#AFDEE2',
          800: '#BCE4E7',
          900: '#C9EAEC'
        }
      },
      
      // ✅ Pretendard font families
      fontFamily: {
        'sans': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
        'elegant': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'elegant-sans': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'display': ['"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'gmarket': ['"GmarketSans"', '"Pretendard"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'nanum-myeongjo': ['"Nanum Myeongjo"', 'serif'],
      },
      // ✅ 1. animation & keyframes
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin 15s linear infinite reverse',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-from-left': 'slideFromLeft 0.7s ease-out',
        'slide-from-right': 'slideFromRight 0.7s ease-out',
        'scroll-slow': 'scrollSlow 30s linear infinite',
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
        slideFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scrollSlow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
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
