import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
      proxy: {
        '/api': 'http://localhost:3000'
      },
      host: '0.0.0.0'
  },  
  resolve: {
      alias: {
      "@": path.resolve(__dirname, 'src'),
      },
  },
})
