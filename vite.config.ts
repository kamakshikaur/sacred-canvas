import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // Pre-transform critical files so the dev server delivers them instantly
    warmup: {
      clientFiles: [
        "./src/App.tsx",
        "./src/pages/Index.tsx",
        "./src/components/PageTransition.tsx",
        "./src/components/FadeInView.tsx",
        "./src/components/Navigation.tsx",
        "./src/components/LiquidBackground.tsx",
        "./src/components/InteractiveCursor.tsx",
        "./src/data/artworks.ts",
      ],
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    // Split framer-motion into its own chunk so it doesn't block the main bundle
    rollupOptions: {
      output: {
        manualChunks: {
          "framer-motion": ["framer-motion"],
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    // Target modern browsers for smaller output
    target: "esnext",
    // Reduce CSS/JS output size
    cssMinify: true,
    minify: "esbuild",
  },
}));
