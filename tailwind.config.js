module.exports = {
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        accent: '#657786',
        // other custom colors
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        // other custom spacing
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        // other custom fonts
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.875rem',
        // other custom font sizes
      },
      screens: {
        'xs': '480px',
        '2xl': '1536px',
        // other custom breakpoints
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
      ringColor: ['dark'],
      boxShadow: ['dark'],

    },
  },
  plugins: [],
}
