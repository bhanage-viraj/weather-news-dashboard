import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// API keys for development
const API_KEYS = [
  '1d90ef3fff1ffbae553730cea09ad1e8',
  '97bfb71f23f142eef98500ea16681a01', 
  '6b7b9bf554b7d642c5d18e7d18712d89'
];
let currentKeyIndex = 0;
let failedKeys = new Set();

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
      // Proxy for /api/news now points to Vercel serverless function in development
      // In production, this will be handled by the actual Vercel function
      '/api/news': {
        target: 'http://api.mediastack.com/v1',
        changeOrigin: true,
        rewrite: (path) => '/news',
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Rotate through API keys if all keys have been tried
            if (failedKeys.size >= API_KEYS.length) {
              failedKeys.clear(); // Reset and try again
            }
            
            // Choose a key that hasn't failed yet
            while (failedKeys.has(API_KEYS[currentKeyIndex]) && failedKeys.size < API_KEYS.length) {
              currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
            }
            
            // Add the API key to the request
            const url = new URL(proxyReq.path, 'http://api.mediastack.com');
            url.searchParams.append('access_key', API_KEYS[currentKeyIndex]);
            proxyReq.path = url.pathname + url.search;
            
            console.log(`Using API key index ${currentKeyIndex} (${API_KEYS[currentKeyIndex].substring(0, 5)}...)`);
          });
          
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Check for rate limit (429) or unauthorized (401) response
            if (proxyRes.statusCode === 429 || proxyRes.statusCode === 401) {
              console.log(`API key ${currentKeyIndex} failed with status ${proxyRes.statusCode}, trying next key`);
              
              // Mark this key as failed
              failedKeys.add(API_KEYS[currentKeyIndex]);
              
              // Move to the next key for future requests
              currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
            }
          });
        }
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
