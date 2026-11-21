/** @type {import('tailwindcss').Config} */
// Palette: deep teal window, frosted light-glass panels, cyan as the one
// fill/accent colour. Cyan is a fill, never body text on glass; text accents
// on glass use `aqua-deep`.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050b0d',
        teal: {
          950: '#071a1f',
          900: '#0d2a32',
          800: '#143b45',
          700: '#1c5260',
          600: '#286b7a',
        },
        ink: {
          DEFAULT: '#0b222a',
          soft: '#3a5961',
          faint: '#5f7c84',
        },
        aqua: {
          DEFAULT: '#1ec4e0',
          bright: '#5fdcf0',
          deep: '#08697b',
          soft: '#c4f1f8',
        },
        amber: { DEFAULT: '#f4a63a', deep: '#8a5108' },
        mint: { DEFAULT: '#3ccf91', deep: '#11714a' },
        coral: { DEFAULT: '#f2715f', deep: '#a3301f' },
        side: {
          DEFAULT: '#d6ecf0',
          muted: '#94b9c1',
        },
        pill: '#0a1b20',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        window: '1.75rem',
        panel: '1.5rem',
        card: '1.375rem',
      },
      boxShadow: {
        window: '0 40px 120px -40px rgb(0 0 0 / 0.9)',
        // offset, soft: the active pill and bars sit just above the surface
        lift: 'inset 0 1px 0 rgb(255 255 255 / 0.45), 0 6px 16px -6px rgb(8 105 123 / 0.6)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        app: '1600px',
      },
    },
  },
  plugins: [],
}
