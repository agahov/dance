import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: new URL('../../assets', import.meta.url).pathname,
  resolve: {
    alias: {
      '@dance/common': new URL('../../packages/common/src', import.meta.url).pathname,
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
