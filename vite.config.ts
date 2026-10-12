import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // EMAILJS_* ids are public by design, so they're safe to expose to client code.
  envPrefix: ['VITE_', 'EMAILJS_'],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
