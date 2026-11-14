import type { Metadata } from "next";
import "./editorial.css";

export const metadata: Metadata = {
  title: { default: "Aahana Ahir — Full-Stack & Backend Engineer", template: "%s — Aahana Ahir" },
  description: "Aahana Ahir builds full-stack commerce products, backend services and thoughtful AI systems. Explore FreezoneB2B, OpsAssist AI and IntegrateX.",
  keywords: ["Aahana Ahir", "Full-Stack Developer", "Backend Engineer", "Next.js", "PostgreSQL", "AI Engineering", "IT Support"],
  metadataBase: new URL("https://aahanaahir22.github.io"),
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "Aahana Ahir — Engineering that goes beyond the demo", description: "Selected full-stack, backend and AI engineering work.", url: "https://aahanaahir22.github.io" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
