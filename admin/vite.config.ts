import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { config } from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";

config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      tsDecorators: true,
    }),
    tsconfigPaths(),
    TanStackRouterVite(),
  ],
  server: {
    proxy: {
      "/api": {
        target: process.env.API_URI || "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
