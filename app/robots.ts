import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.GITHUB_PAGES === "true"
    ? "https://aahanaahir22.github.io"
    : "https://aahana-intelligent-systems.aahanaahir12.chatgpt.site";

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
