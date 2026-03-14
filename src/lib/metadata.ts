import type { Metadata } from "next";

interface MetadataOptions {
    title: string;
    description: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ehsw2.com";
const siteName = "EHSW²";

/**
 * Factory function for generating consistent page metadata.
 * Uses Next.js built-in metadata API (no next-seo needed).
 */
export function createMetadata({
    title,
    description,
    path = "/",
    image = "/logo-ehsw.png",
    noIndex = false,
}: MetadataOptions): Metadata {
    const url = `${siteUrl}${path}`;

    return {
        title: `${title} | ${siteName}`,
        description,
        metadataBase: new URL(siteUrl),
        alternates: { canonical: url },
        openGraph: {
            title: `${title} | ${siteName}`,
            description,
            url,
            siteName,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
            locale: "es_MX",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${siteName}`,
            description,
            images: [image],
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}
