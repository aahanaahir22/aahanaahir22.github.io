import type { Metadata } from "next";
import CreativeResume from "@/components/CreativeResume";
export const metadata: Metadata = { title: "Multilingual Résumé", description: "Aahana Ahir’s complete résumé in English, Hindi, German, Spanish, French and Japanese — projects, education, skills, certifications and contact details.", alternates: {canonical:"/resume/"} };
export default function ResumePage() { return <CreativeResume />; }
