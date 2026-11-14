import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, ExternalLink, GitBranch as Github, Contact as Linkedin, Mail } from "lucide-react";
import { certifications, resumeContent } from "@/data/resume";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Aahana Ahir — full-stack engineering, Python backends, AI systems and IT support. Experience, projects, skills and verified credentials.",
  alternates: {canonical: "/resume"},
};
const coreSkills = [
  {title:"Programming",items:["Python","Java","TypeScript","JavaScript","SQL"]},
  {title:"Full-stack & backend",items:["Next.js","React","FastAPI","Flask","REST APIs","Node.js","PostgreSQL","Neon","Drizzle ORM","Clerk","Zod","MySQL","SQLite"]},
  {title:"AI / data",items:["PyTorch","scikit-learn","Pandas","NumPy","LLMs","RAG","FAISS"]},
  {title:"Cloud / tools",items:["AWS","Vercel","Docker","Git","GitHub","Postman","API Testing","Unit Testing"]},
  {title:"IT support",items:["TCP/IP","DNS","DHCP","HTTP/HTTPS","Network Troubleshooting","Windows Troubleshooting","System Configuration","Hardware / Software Diagnostics","End-User Support","Ticketing Fundamentals","Technical Documentation"]},
];

export default function ResumePage() {
  const data = resumeContent.en;
  return <div className="ed-resume">
    <header className="ed-resume-top">
      <Link href="/"><ArrowLeft size={15}/> Portfolio</Link>
      <span>Aahana Ahir / Résumé</span>
      <a href="mailto:aahanaahir10@gmail.com">Contact <ArrowUpRight size={15}/></a>
    </header>
    <main className="ed-resume-shell">
      <section className="ed-resume-hero">
        <p className="ed-resume-kicker">COMPUTER SCIENCE / FULL-STACK ENGINEERING / IT SUPPORT</p>
        <h1>Aahana Ahir<span style={{color:"#bb583c"}}>.</span></h1>
        <p>Final-year B.Tech Computer Science Engineering student building full-stack commerce platforms, backend APIs and evidence-aware AI systems. Built FreezoneB2B with Next.js, PostgreSQL, verified identity and role-based commerce workflows. Interested in international graduate and entry-level engineering opportunities.</p>
        <div className="ed-resume-hero-links">
          <a href="/Aahana_Ahir_Resume_International_Impact_1_Page.pdf" download><Download size={16}/> Download ATS résumé (PDF)</a>
          <a href="https://www.linkedin.com/in/aahanaahir02/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a>
          <a href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a>
          <a href="mailto:aahanaahir10@gmail.com"><Mail size={15}/> Email</a>
        </div>
      </section>
      <div className="ed-resume-content">
        <aside>
          <section>
            <h2>Contact</h2>
            <p>India · Open to international opportunities</p>
            <p><a href="mailto:aahanaahir10@gmail.com">aahanaahir10@gmail.com</a></p>
            <p><a href="https://aahanaahir22.github.io/">aahanaahir22.github.io</a></p>
            <p><a href="https://github.com/aahanaahir22">github.com/aahanaahir22</a></p>
          </section>
          <section>
            <h2>Education</h2>
            <h3>B.Tech in Computer Science & Engineering</h3>
            <p>Vellore Institute of Technology, Bhopal University<br/>2023—2027 · CGPA 8.3/10</p>
          </section>
          <section>
            <h2>Technical toolkit</h2>
            {coreSkills.map(group=><div className="ed-resume-entry" key={group.title}><h3>{group.title}</h3><div className="ed-resume-skills">{group.items.map(skill=><span key={skill}>{skill}</span>)}</div></div>)}
          </section>
          <section>
            <h2>Languages</h2>
            <p>English (Fluent) · Hindi (Native) · German (B1) · Spanish (B1) · French (A2) · Japanese (A2)</p>
          </section>
        </aside>
        <div>
          <section>
            <h2>Selected engineering projects</h2>
            {projects.map(p=><Link href={"/projects/"+p.slug} className="ed-resume-project" key={p.slug}><h3>{p.shortName} <ArrowUpRight size={15}/></h3><small>{p.title}</small><p>{p.solution}</p><small>{p.stack.slice(0,8).join(" · ")}</small></Link>)}
          </section>
          <section>
            <h2>Experience & leadership</h2>
            {data.experience.map(entry=><div className="ed-resume-entry" key={entry.organization}><h3>{entry.role} · {entry.organization}</h3><small>{entry.period} · {entry.location}</small><ul>{entry.bullets.map(b=><li key={b}>{b}</li>)}</ul></div>)}
          </section>
          <section>
            <h2>Certifications</h2>
            {certifications.map(c=><div key={c.title} className="ed-resume-cert"><a href={c.url} target="_blank" rel="noreferrer">{c.title} <ExternalLink size={12}/></a><small>{c.issuer}</small></div>)}
          </section>
          <section>
            <h2>Additional achievements</h2>
            <p>Earned 500+ Google Cloud Skills Boost Arcade badges spanning cloud, data, security and generative AI learning tracks. Selected as a GirlScript Summer of Code 2024 contributor.</p>
          </section>
        </div>
      </div>
    </main>
  </div>;
}
