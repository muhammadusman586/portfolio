/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme tokens are CSS vars (see index.css): bg/fg flip at night, the
        // rest change with the chosen line theme. paper/ink/muted are fixed.
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)', // stickers, shadows at night, poster echo
        signal: 'rgb(var(--signal) / <alpha-value>)', // highlights; always paired with dark text
        deep: 'rgb(var(--deep) / <alpha-value>)', // dark secondary; paired with light text
        sky: 'rgb(var(--sky) / <alpha-value>)', // light secondary (windows, chips)
        board: 'rgb(var(--board) / <alpha-value>)',
        paper: '#F7F6F1',
        ink: '#111111',
        muted: '#5c5a55',
        amber: '#FFB938',
      },
      fontFamily: {
        display: ['"Bowlby One"', '"Arial Black"', 'Impact', 'sans-serif'],
        sans: ['Archivo', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        marker: ['"Permanent Marker"', '"Comic Sans MS"', 'cursive'],
      },
      boxShadow: {
        hard: '6px 6px 0 0 var(--shadow)',
        'hard-sm': '3px 3px 0 0 var(--shadow)',
        'hard-lg': '10px 10px 0 0 var(--shadow)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.25' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-3px)' } },
        shuttle: { from: { left: '0%' }, to: { left: '100%' } },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        blink: 'blink 1.2s ease-in-out infinite',
        bob: 'bob 0.6s ease-in-out infinite',
        shuttle: 'shuttle 5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
