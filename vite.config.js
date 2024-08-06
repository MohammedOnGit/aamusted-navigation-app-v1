import { defineConfig } from 'vite';

export default defineConfig({
  base: '/aamusted-navigation-app-v1/', // Base path for assets
  build: {
    outDir: 'dist', // Output directory for build
    rollupOptions: {
      input: 'index.html' // Path to your index.html file relative to the root
    }
  }
});
