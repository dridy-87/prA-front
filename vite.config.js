import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@system': resolve(__dirname, 'src/system'),
      '@service': resolve(__dirname, 'src/service'),
      '@publishing': resolve(__dirname, 'src/publishing'),
    },
  },
  plugins: [vue()],
  server: {
    port: 5177,
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
    }
  }
})
