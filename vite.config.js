import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('framer-motion')) {
            return 'motion-vendor';
          }
          if (id.includes('gsap')) {
            return 'gsap-vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    cors: true,
    proxy: {
      '/api-groq': {
        target: 'https://api.groq.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-groq/, ''),
        headers: { 'Origin': 'https://api.groq.com' }
      }
    }
  }
})
