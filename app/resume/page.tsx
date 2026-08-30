import type { Metadata } from "next";
import MultilingualResume from "@/components/MultilingualResume";

export const metadata: Metadata = {
  title: "Multilingual Résumé — Aahana Ahir",
  description: "Aahana Ahir's interactive résumé in English, Hindi, German, Spanish, French and Japanese.",
};

export default function ResumePage() {
  return <MultilingualResume />;
}
