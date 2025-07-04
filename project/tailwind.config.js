/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#374151',
          600: '#1f2937',
          700: '#111827',
          800: '#0a0a0f',
          900: '#030712',
        },
        accent: {
          purple: '#8b5cf6',
          blue: '#06b6d4',
          green: '#10b981',
          orange: '#f59e0b',
          red: '#ef4444',
        },
        gaming: {
          dark: '#0a0a0f',
          darker: '#030712',
          light: '#1a1a2e',
          lighter: '#16213e',
          neon: '#00ff88',
          purple: '#8b5cf6',
          blue: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient': 'gradient-shift 3s ease infinite',
        'particle': 'particle-float linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(139, 92, 246, 0.5)',
        'neon-blue': '0 0 20px rgba(6, 182, 212, 0.5)',
        'neon-green': '0 0 20px rgba(16, 185, 129, 0.5)',
      }
    },
  },
  plugins: [],
};