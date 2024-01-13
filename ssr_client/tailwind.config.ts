import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
    theme: {},
    mode: "jit",
    plugins: [nextui()],
    darkMode: "class",
};
export default config;
