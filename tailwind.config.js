/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1B3D',
          light: '#1a3058',
          dark: '#071126'
        },
        gold: {
          DEFAULT: '#F5A623',
          light: '#f7b84a',
          dark: '#d48f1a'
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'fluid-hero': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'fluid-title': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        xl2: '1rem',
        '4xl': '2rem'
      },
      screens: {
        'xs': '375px',
        '3xl': '1600px'
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.06)',
        'nav': '0 1px 3px rgba(0,0,0,0.06)',
      }
    }
  },
  plugins: []
}
