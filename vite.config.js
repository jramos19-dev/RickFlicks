const path = require('path')

const vuePlugin = require('@vitejs/plugin-vue')
const vue = vuePlugin.default ?? vuePlugin

// https://vitejs.dev/config/
module.exports = {
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [vue()],
}
