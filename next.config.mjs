import withTM from "next-transpile-modules";

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
            config.resolve.alias = {
                ...config.resolve.alias,
                "node:async_hooks": false,
            };
        }
        return config;
    },
};

// Exporta la configuración utilizando `withTM`
export default withTM(["@clerk/nextjs"])(nextConfig);
