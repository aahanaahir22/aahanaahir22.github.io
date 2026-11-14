import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://aahanaahir22.github.io"; return [ {url:base,changeFrequency:"monthly",priority:1}, {url:base+"/resume",changeFrequency:"monthly",priority:.8}, ...projects.map(project=>({url:base+"/projects/"+project.slug,changeFrequency:"monthly" as const,priority:.8})) ]; }
