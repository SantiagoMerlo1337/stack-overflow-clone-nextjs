import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
            {
                protocol: "http",
                hostname: "*",
            },
        ],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                async_hooks: false,
            };
        }
        config.plugins.push(new NodePolyfillPlugin());
        return config;
    },
};

export default nextConfig;
