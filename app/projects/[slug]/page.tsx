import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Database, ExternalLink, GitBranch, Play, ShieldCheck } from "lucide-react";
import ProjectTrace from "@/components/ProjectTrace";
import { getProject, projects } from "@/data/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.shortName} — Aahana Ahir`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className={`case-shell case-${project.statusTone}`}>
      <header className="case-nav">
        <Link href="/#work"><ArrowLeft size={16} /> All systems</Link>
        <Link href="/" className="system-mark"><b>AAHANA</b><span>/ SYSTEMS</span></Link>
        <a href="mailto:aahanaahir10@gmail.com">Contact <ArrowRight size={14} /></a>
      </header>

      <section className="case-hero">
        <div className="case-hero-grid" />
        <div className="case-count">SYSTEM / {project.number}</div>
        <div className="case-title">
          <p className="eyebrow"><span className={`status-dot ${project.statusTone}`} /> {project.status}</p>
          <h1>{project.shortName}</h1>
          <p>{project.title}</p>
        </div>
        <div className="case-signal" aria-hidden="true">
          <div className="signal-ring ring-one" /><div className="signal-ring ring-two" /><div className="signal-ring ring-three" />
          <div className="signal-center"><Database size={28} /></div>
          {project.stack.slice(0, 4).map((item, itemIndex) => <span key={item} className={`signal-tech tech-${itemIndex + 1}`}>{item}</span>)}
        </div>
        <p className="case-tagline">{project.tagline}</p>
        <div className="case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      {project.notice && <aside className="integrity-notice"><ShieldCheck size={19} /><div><b>Scope & responsibility</b><p>{project.notice}</p></div></aside>}

      <section className="case-context case-pad">
        <div><p className="section-code">01 / CONTEXT</p><h2>The friction.</h2><p>{project.problem}</p></div>
        <div><p className="section-code">02 / PROPOSED SYSTEM</p><h2>The response.</h2><p>{project.solution}</p></div>
      </section>

      {project.measured && (
        <section className="metrics-band case-pad">
          <div className="metrics-intro"><p className="section-code">MEASURED / PROTOTYPE CONTEXT</p><p>Results are separated from future evaluation plans.</p></div>
          {project.measured.map((metric) => <div className="metric-block" key={metric.label}><b>{metric.value}</b><h3>{metric.label}</h3><p>{metric.context}</p></div>)}
        </section>
      )}

      <section className="architecture-section case-pad">
        <div className="case-section-head"><div><p className="section-code">03 / ARCHITECTURE</p><h2>Inside the system.</h2></div><p>Each layer has one clear responsibility. The connections preserve context without collapsing safety boundaries.</p></div>
        <div className="architecture-flow">
          {project.architecture.map((node, nodeIndex) => (
            <div className="architecture-node" key={node.label}>
              <span>{String(nodeIndex + 1).padStart(2, "0")}</span><h3>{node.label}</h3><p>{node.detail}</p>{nodeIndex < project.architecture.length - 1 && <i />}
            </div>
          ))}
        </div>
      </section>

      <section className="principles-section case-pad">
        <div><p className="section-code">04 / ENGINEERING PRINCIPLES</p><h2>What the system<br /><em>must protect.</em></h2></div>
        <div className="principles-list">{project.principles.map((principle, principleIndex) => <div key={principle}><span>{String(principleIndex + 1).padStart(2, "0")}</span><p>{principle}</p></div>)}</div>
      </section>

      <section className="trace-section case-pad">
        <div className="case-section-head"><div><p className="section-code">05 / INTERACTIVE TRACE</p><h2>Follow one event.</h2></div><p>Select a stage to inspect how the planned system changes state. This is an explanatory simulation, not a live production demo.</p></div>
        <ProjectTrace steps={project.lifecycle} project={project.shortName} />
      </section>

      <section className="decisions-section case-pad">
        <div className="case-section-head"><div><p className="section-code">06 / TECHNICAL DECISIONS</p><h2>Why this shape?</h2></div></div>
        <div className="decision-grid">{project.decisions.map((decision, decisionIndex) => <article key={decision.title}><span>DECISION / {String(decisionIndex + 1).padStart(2, "0")}</span><h3>{decision.title}</h3><p>{decision.body}</p></article>)}</div>
      </section>

      <section className="evaluation-section case-pad">
        <div><p className="section-code">07 / EVALUATION</p><h2>Evidence still<br />to be earned.</h2><p>The following criteria define how the system will be evaluated. They are plans, not fabricated production results.</p></div>
        <ol>{project.evaluation.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </section>

      <section className="roadmap-section case-pad">
        <div className="roadmap-state"><p className="section-code">08 / CURRENT STATE</p><span className={`status-dot ${project.statusTone}`} /><h2>{project.status}</h2><p>{project.repositoryUrl || project.demoUrl ? "The source repository and live demonstration are available below. Project limitations and synthetic-remediation boundaries remain explicit." : "Architecture and intended evaluation are shown transparently. Repository evidence and live demos will be linked only when supplied."}</p></div>
        <div className="roadmap-list"><p className="section-code">NEXT TRANSMISSIONS</p>{project.next.map((item, itemIndex) => <div key={item}><span>{String(itemIndex + 1).padStart(2, "0")}</span><p>{item}</p></div>)}</div>
      </section>

      <section className="evidence-actions case-pad">
        <div><p className="section-code">EVIDENCE LINKS</p><h2>Source proof,<br />{project.repositoryUrl || project.demoUrl ? "connected." : "when ready."}</h2></div>
        <div>
          {project.repositoryUrl ? (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer" aria-label={`Open the ${project.shortName} GitHub repository`}>
              <GitBranch size={18} /> GitHub repository <ExternalLink size={14} />
            </a>
          ) : <button disabled><GitBranch size={18} /> Repository / pending</button>}
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={`Open the ${project.shortName} live demo`}>
              <Play size={18} /> Live demo <ExternalLink size={14} />
            </a>
          ) : <button disabled><Play size={18} /> Demo / pending</button>}
        </div>
      </section>

      <Link className="next-system" href={`/projects/${next.slug}`}>
        <span>NEXT SYSTEM / {next.number}</span><h2>{next.shortName}</h2><ArrowRight size={34} />
      </Link>
    </main>
  );
}
