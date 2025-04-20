import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable JSX in .js files too
      include: '**/*.{jsx,js}',
    }),
  ],
  server: {
    proxy: {
      // Proxy for mediastack news API
      '/api/news': {
        target: 'http://api.mediastack.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/news/, '/news')
      },
      // Proxy for weatherapi.com
      '/api/weather': {
        target: 'https://api.weatherapi.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, '')
      }
    }
  },
  // Configure esbuild to handle JSX in .js files
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  esbuild: {
    loader: 'jsx',
    include: /.*\.jsx?$/,
    exclude: []
  }
})
