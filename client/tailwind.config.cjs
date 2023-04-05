/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            // 960px value
            screens: {
                "more-md": "960px",
            },
        },
    },
    plugins: [],
};
