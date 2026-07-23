import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  define: {
    // The real Next.js build injects this from next.config.ts's
    // `trailingSlash: true` so next/link keeps trailing slashes on
    // rendered hrefs. Vitest never runs that build step, so without this
    // define, next/link strips trailing slashes in every unit test
    // regardless of next.config.ts, diverging from real app behavior.
    'process.env.__NEXT_TRAILING_SLASH': JSON.stringify(true),
  },
});
