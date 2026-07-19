module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      // Keep StyleX rules un-layered: the plain-element reset in globals.css
      // must not outrank them (un-layered CSS always beats @layer CSS).
      useCSSLayers: false,
    },
    autoprefixer: {},
  },
};
