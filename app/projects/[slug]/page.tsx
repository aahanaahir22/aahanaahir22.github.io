import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, GitBranch as Github } from "lucide-react";
import CaseExplorer from "@/components/CaseExplorer";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{slug: string}> };

export function generateStaticParams() {
  return projects.map(project => ({slug: project.slug}));
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const project = getProject(slug);
  return project ? {title: project.shortName, description: project.tagline, alternates: {canonical: "/projects/"+slug}} : {};
}

export default async function ProjectCase({params}: Props) {
  const {slug} = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const others = projects.filter(p=>p.slug!==project.slug);
  return (
    <div className="ed-case">
      <header className="ed-case-top">
        <Link href="/#work"><ArrowLeft size={16}/> Selected work</Link>
        <Link href="/" aria-label="Aahana Ahir home">Aahana Ahir <span style={{color:"#b65c40"}}>✳</span></Link>
        <Link href="/resume">Résumé <ArrowUpRight size={15}/></Link>
      </header>
      <main className="ed-case-shell">
        <section className="ed-case-hero">
          <p className="ed-case-kicker">CASE STUDY / {project.number} / {project.status}</p>
          <h1>{project.shortName}</h1>
          <p>{project.tagline}</p>
          <div className="ed-case-hero-meta">{project.stack.map(item=><span key={item}>{item}</span>)}</div>
          <div className="ed-case-cta-row">
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Explore live project <ExternalLink size={15}/></a>}
            {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer"><Github size={15}/> Source on GitHub</a>}
          </div>
        </section>
        <div className={"ed-case-banner ed-case-banner--"+project.slug} aria-label={project.shortName+" project illustration"}>
          <strong>{project.slug==="freezoneb2b"?"trade, made clear.":project.slug==="opsassist-ai"?"signal → context":"intent → action"}</strong>
          <span>{project.shortName.toUpperCase()} / ENGINEERING NOTES</span>
        </div>
        {project.notice&&<aside className="ed-case-note"><b>Scope and evidence:</b> {project.notice}</aside>}
        <section className="ed-case-section ed-case-two" aria-labelledby="context-title">
          <div><p className="ed-case-caption">01 / CONTEXT</p><h2 id="context-title">The problem.</h2><p>{project.problem}</p></div>
          <div><p className="ed-case-caption">02 / RESPONSE</p><h2>The approach.</h2><p>{project.solution}</p></div>
        </section>
        {project.measured&&<section className="ed-case-section" aria-labelledby="metrics-title">
          <p className="ed-case-caption">03 / VERIFIED SCOPE</p><h2 id="metrics-title">Numbers, with context.</h2>
          <div className="ed-case-stats">{project.measured.map(metric=><div key={metric.label} className="ed-case-stat"><b>{metric.value}</b><h3>{metric.label}</h3><p>{metric.context}</p></div>)}</div>
        </section>}
        <section className="ed-case-section" aria-labelledby="architecture-title">
          <p className="ed-case-caption">04 / ARCHITECTURE</p><h2 id="architecture-title">What happens underneath.</h2>
          <div className="ed-case-architecture">
            {project.architecture.map((node,i)=><div className="ed-architecture-item" key={node.label}><span>{String(i+1).padStart(2,"0")} / {String(project.architecture.length).padStart(2,"0")}</span><h3>{node.label}</h3><p>{node.detail}</p></div>)}
          </div>
        </section>
        <section className="ed-case-section" aria-labelledby="workflow-title">
          <p className="ed-case-caption">05 / INTERACTIVE WALKTHROUGH</p>
          <h2 id="workflow-title">Follow the work.</h2>
          <p>Explore each stage. This walkthrough explains the implemented or designed workflow; it does not issue real transactions.</p>
          <CaseExplorer steps={project.lifecycle}/>
        </section>
        <section className="ed-case-section" aria-labelledby="decisions-title">
          <p className="ed-case-caption">06 / TECHNICAL DECISIONS</p><h2 id="decisions-title">Why it's built this way.</h2>
          <div className="ed-case-decisions">{project.decisions.map((decision,i)=><article key={decision.title}><span className="ed-case-caption">DECISION {String(i+1).padStart(2,"0")}</span><h3>{decision.title}</h3><p>{decision.body}</p></article>)}</div>
        </section>
        <section className="ed-case-section ed-case-two" aria-labelledby="next-title">
          <div><p className="ed-case-caption">07 / WHAT COMES NEXT</p><h2 id="next-title">Still to prove.</h2><p>Serious engineering means being clear about tradeoffs, validation still needed and boundaries between a demo and production.</p></div>
          <div className="ed-case-next"><ol>{project.next.map(item=><li key={item}>{item}</li>)}</ol></div>
        </section>
        <nav className="ed-case-footer" aria-label="Other projects">
          <Link href="/#work"><ArrowLeft size={16}/> All work</Link>
          <Link href={"/projects/"+others[0].slug}>Next: {others[0].shortName} <ArrowRight size={16}/></Link>
        </nav>
      </main>
    </div>
  );
}
