import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    visualizer({
      filename: 'stats.html',   // output file
      template: 'treemap',      // "sunburst", "treemap", "network"
      gzipSize: true,           // show gzip sizes
      brotliSize: true,         // show brotli sizes
      open: true,               // auto-open in browser
    })
  ],
  server: {
      proxy: {
        '/api': 'http://localhost:3000'
      },
      port: 5173,
      host: '0.0.0.0'
  },  
  resolve: {
      alias: {
      "@": path.resolve(__dirname, 'src'),
      },
  },
})
