import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@dance/common': new URL('../../packages/common/src', import.meta.url).pathname,
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
