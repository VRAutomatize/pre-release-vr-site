import { defineConfig, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }: ConfigEnv) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('@radix-ui')) return 'radix-ui';
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('date-fns') || id.includes('zod')) return 'utils-vendor';
            return 'vendor';
          }
          if (id.includes('/src/components/ui/')) return 'shadcn-ui';
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true
  }
}));