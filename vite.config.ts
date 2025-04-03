import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "Vusto-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split vendor code from application code
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-label', '@radix-ui/react-tooltip'],
          animation: ['framer-motion'],
        },
        // Use a hash based on content, not time, for better caching
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    // Enable source maps only in development
    sourcemap: mode === 'development',
    // Minify CSS
    cssMinify: true,
    // Pre-optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    // Add dependencies that should be optimized
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-toast',
      '@radix-ui/react-label',
      '@tanstack/react-query',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
  }
}));
