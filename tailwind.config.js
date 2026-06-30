module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04071A',
          900: '#0A0E2A',
          800: '#0F1535',
          700: '#1A2150',
          600: '#243070',
        },
        brand: {
          50:  '#EEF2FF',
          100: '#C7D2FE',
          400: '#818CF8',
          500: '#6366F1',
          600: '#3B5BDB',
          700: '#2D4AC7',
          800: '#1E3A8A',
        },
        cyan: {
          neon: '#00D4FF',
          soft: '#67E8F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #04071A 0%, #0A0E2A 50%, #0F1535 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(59,91,219,0.15) 0%, rgba(0,212,255,0.05) 100%)',
        'brand-gradient': 'linear-gradient(135deg, #3B5BDB 0%, #00D4FF 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, #0F1535 0%, #0A0E2A 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-lg': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'brand': '0 0 30px rgba(59, 91, 219, 0.3)',
        'cyan': '0 0 20px rgba(0, 212, 255, 0.2)',
        'neon': '0 0 40px rgba(59, 91, 219, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
