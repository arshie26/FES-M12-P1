import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The /api proxy sends browser calls to the Express server.
// The browser never sees the API key — the server holds it.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
