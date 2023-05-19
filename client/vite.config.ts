import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ mode }) => {
    config();
    return defineConfig({
        plugins: [react(), tsconfigPaths()],
        server: {
            proxy: {
                "/graphql": {
                    target: process.env.SERVER_URL,
                    changeOrigin: true,
                    secure: false,
                },
                "/api": {
                    target: process.env.SERVER_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    });
};
