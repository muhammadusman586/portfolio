/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        elevated: '#161616',
        border: '#1f1f1f',
        accent: {
          DEFAULT: '#00FF7F',
          dim: '#00cc66',
          glow: 'rgba(0,255,127,0.15)',
        },
        muted: '#a0a0a0',
        body: '#ffffff',
        term: {
          red: '#ff5f56',
          yellow: '#ffbd2e',
          green: '#27c93f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        term: '0 20px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px #1f1f1f',
        glow: '0 0 24px rgba(0,255,127,0.25)',
        'glow-sm': '0 0 12px rgba(0,255,127,0.18)',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulse_dot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        caret: { '0%,50%': { opacity: '1' }, '51%,100%': { opacity: '0' } },
      },
      animation: {
        blink: 'blink 1s steps(2) infinite',
        caret: 'caret 1s steps(2) infinite',
        scan: 'scan 8s linear infinite',
        'pulse-dot': 'pulse_dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
