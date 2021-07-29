module.exports = {
  purge: [
      'src/**/*.tsx',
      'src/**/*.css'
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          fg: '#4051b5',
          'fg-light': '#5d6cc0',
          'fg-dark': '#303fa1',
          'bg': '#fff',
        }
      },
      boxShadow: {
        'md-z1': '0 1px 4px rgb(0 0 0 / 8%)',
        'md-z2': '0 2px 4px rgb(0 0 0 / 20%)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
