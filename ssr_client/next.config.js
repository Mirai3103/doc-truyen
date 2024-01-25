/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => [
        {
            source: "/api/:path*",
            destination: "http://localhost:8080/:path*",
        },
    ],
    images: {
        remotePatterns: [
            {
                // any host ;
                hostname: "*",
            },
        ],
    },
};

module.exports = nextConfig;
