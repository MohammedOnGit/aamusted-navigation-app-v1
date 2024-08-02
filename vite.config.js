import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', // Output directory for build
    rollupOptions: {
      input: 'index.html' // Path to your index.html file relative to the root
    }
  }
});
