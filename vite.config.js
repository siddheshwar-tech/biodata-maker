import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // raise warning limit slightly or adjust as needed
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('jspdf') || id.includes('html2canvas')) {
            return 'pdf-libs';
          }
          if (id.includes('@mui/material') || id.includes('@mui/icons-material')) {
            return 'mui';
          }
        },
      },
    },
  },
})
