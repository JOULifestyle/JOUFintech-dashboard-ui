/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    exclude: ['e2e/**', 'node_modules/**'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        url: 'http://localhost:3000'
      }
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/**',
        'src/test/**',
        'e2e/**',
        '**/*.d.ts',
        '**/*.config.*',
        'coverage/**',
        'dist/**',
        'public/**',
      ],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
    },
  },
})