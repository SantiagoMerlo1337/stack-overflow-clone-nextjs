import { MetadataRoute } from "next";

console.log("🚨 Server URL:", process.env.NEXT_PUBLIC_SERVER_URL);
const baseUrl =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "https://dev-overflow-santiago-merlo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 1,
        },
        {
            url: `${baseUrl}/community`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/collections`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tags`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/ask-question`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sign-in`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/sign-up`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];
}
