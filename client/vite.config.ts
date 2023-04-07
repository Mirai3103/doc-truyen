import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ mode }) => {
    if (mode === "development")
        config({
            path: "..\\dev.env",
            override: true,
        });
    return defineConfig({
        plugins: [react(), tsconfigPaths()],
        define: {
            "process.env": {
                VITE_SERVER_URL: process.env.SERVER_URL,
                VITE_GRAPHQL_URL: process.env.GRAPHQL_URL,
            },
        },
    });
};
