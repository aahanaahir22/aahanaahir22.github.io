import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aahana Ahir — Intelligent Systems Portfolio",
  description: "Python, AI/ML, backend and cloud systems engineered with evidence, explainability and human control.",
  keywords: ["Aahana Ahir", "Python Developer", "AI ML Engineer", "Software Engineer", "Solutions Engineer"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
