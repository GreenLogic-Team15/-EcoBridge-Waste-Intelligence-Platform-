import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/-EcoBridge-Waste-Intelligence-Platform-/",
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-maps": ["@react-google-maps/api"],
          "vendor-charts": ["recharts"],
        },
      },
    },
  },
});
