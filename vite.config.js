const path = require('path')

const vuePlugin = require('@vitejs/plugin-vue')
const vue = vuePlugin.default ?? vuePlugin

// https://vitejs.dev/config/
module.exports = {
  server: {
    headers: {
      // Helps Firebase Auth popup flow in modern browsers during dev.
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [vue()],
}
