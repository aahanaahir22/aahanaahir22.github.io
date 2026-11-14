"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Download, ExternalLink, GitBranch as Github, Contact as Linkedin, Mail, Menu, X } from "lucide-react";
import { projects } from "@/data/projects";
import { certifications } from "@/data/resume";

const skillAreas = [
  { title: "Frontend & product", caption: "Interfaces that feel considered", items: ["Next.js", "React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Figma"] },
  { title: "Backend & data", caption: "Systems behind the interface", items: ["Python", "Java", "SQL", "FastAPI", "Flask", "REST APIs", "PostgreSQL", "Neon", "Drizzle ORM", "MySQL", "SQLite", "Clerk", "Zod"] },
  { title: "AI & engineering", caption: "Automation with evidence", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS", "Redis", "Celery"] },
  { title: "Cloud & workflow", caption: "Building, testing, shipping", items: ["AWS", "Vercel", "Docker", "Git", "GitHub", "Postman", "API Testing", "Unit Testing", "Technical Documentation"] },
  { title: "IT support & networks", caption: "Diagnosis, resolution, reliability", items: ["TCP/IP", "DNS", "DHCP", "HTTP/HTTPS", "Network Troubleshooting", "Hardware Diagnostics", "Software Diagnostics", "Windows Troubleshooting", "System Configuration", "End-User Support", "Incident Troubleshooting", "Ticketing Fundamentals"] },
];
const skillProof: Record<string, string[]> = {
  "Next.js": ["FreezoneB2B"], "React": ["FreezoneB2B", "OpsAssist AI", "IntegrateX"], "TypeScript": ["FreezoneB2B"],
  "PostgreSQL": ["FreezoneB2B", "OpsAssist AI", "IntegrateX"], "Neon": ["FreezoneB2B"], "Drizzle ORM": ["FreezoneB2B"],
  "Clerk": ["FreezoneB2B"], "Zod": ["FreezoneB2B"], "Vercel": ["FreezoneB2B"],
  "Python": ["OpsAssist AI", "IntegrateX"], "FastAPI": ["OpsAssist AI", "IntegrateX"],
  "RAG": ["OpsAssist AI", "IntegrateX"], "FAISS": ["OpsAssist AI"], "Docker": ["OpsAssist AI", "IntegrateX"],
  "Redis": ["IntegrateX"], "Celery": ["IntegrateX"], "AWS": ["OpsAssist AI", "IntegrateX"],
  "REST APIs": ["FreezoneB2B", "OpsAssist AI", "IntegrateX"], "Git": ["FreezoneB2B", "OpsAssist AI", "IntegrateX"],
};
const selectedRepos = [
  { name: "aahanaahir22.github.io", desc: "This portfolio — design, interactions and engineering", link: "https://github.com/aahanaahir22/aahanaahir22.github.io" },
  { name: "opsassist-ai", desc: "Incident intelligence with evidence-backed diagnosis", link: "https://github.com/aahanaahir22/opsassist-ai" },
  { name: "integratex", desc: "AI-powered workflow integration and automation", link: "https://github.com/aahanaahir22/integratex" },
];

function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(node => node.classList.add("is-visible")); return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -28px 0px" });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

export default function EditorialPortfolio() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [showAllCredentials, setShowAllCredentials] = useState(false);
  const usedIn = useMemo(() => activeSkill ? skillProof[activeSkill] || [] : [], [activeSkill]);
  const closeMenu = () => setMobileMenu(false);
  return (
    <div className="ed-site">
      <RevealObserver />
      <a className="ed-skip" href="#work">Skip to selected work</a>
      <header className="ed-nav" id="top">
        <Link className="ed-signature" href="/" onClick={closeMenu} aria-label="Aahana Ahir, home"><span className="ed-monogram">a.</span><span className="ed-signature-name">Aahana Ahir<small>Developer / Designer-minded</small></span></Link>
        <button className="ed-mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenu}>{mobileMenu ? <X size={22}/> : <Menu size={22}/>}</button>
        <nav className={mobileMenu ? "ed-navlinks open" : "ed-navlinks"} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#expertise" onClick={closeMenu}>Expertise</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <Link className="ed-resume-link" href="/resume">Résumé <ArrowUpRight size={16}/></Link>
      </header>

      <main>
        <section className="ed-hero" aria-labelledby="ed-hero-title">
          <div className="ed-hero-index" data-reveal><span className="ed-asterisk">✳</span> PORTFOLIO / 2026 <span className="ed-index-right">INDIA · OPEN TO INTERNATIONAL OPPORTUNITIES</span></div>
          <div className="ed-hero-grid">
            <div className="ed-hero-main" data-reveal>
              <p className="ed-eyebrow">FULL-STACK DEVELOPMENT / BACKEND / AI SYSTEMS</p>
              <h1 id="ed-hero-title">Aahana <span>Ahir<span className="ed-period">.</span></span></h1>
              <p className="ed-hero-belief">I build software that works <em>beyond the demo.</em></p>
              <p className="ed-hero-intro">I’m a computer science engineer building practical commerce products, backend systems and thoughtful digital experiences. I care about what happens after the interface looks finished.</p>
              <div className="ed-hero-actions">
                <a className="ed-button ed-button-dark" href="#work">Explore my work <ArrowDown size={17}/></a>
                <Link className="ed-button ed-button-outline" href="/resume">View résumé <ArrowUpRight size={17}/></Link>
              </div>
            </div>
            <aside className="ed-hero-note" data-reveal aria-label="Current focus">
              <span className="ed-note-top">CURRENTLY BUILDING <span className="ed-live-mark"/></span>
              <div className="ed-note-center"><span className="ed-note-serial">01 / IN PROGRESS</span><span className="ed-note-typography">make<br/>things<br/><i>useful.</i></span></div>
              <div className="ed-note-bottom"><span>FreezoneB2B<br/><small>Global sourcing & commerce</small></span><Link href="/projects/freezoneb2b" aria-label="Explore FreezoneB2B"><ArrowUpRight size={23}/></Link></div>
            </aside>
          </div>
          <div className="ed-hero-bottom"><span>SCROLL TO EXPLORE <ArrowDown size={15}/></span><span>01 — 05</span></div>
        </section>

        <section id="work" className="ed-section ed-work" aria-labelledby="work-title">
          <div className="ed-section-heading" data-reveal><span className="ed-section-no">01 / SELECTED WORK</span><div><h2 id="work-title">Proof, not <em>promises.</em></h2><p>Three projects. Different problems. Real decisions behind every interface.</p></div></div>
          <article className="ed-featured-project" data-reveal>
            <div className="ed-featured-copy">
              <div className="ed-project-meta"><span>FEATURED / 001</span><span className="ed-status"><i/> DEPLOYED · ROLL OUT IN PROGRESS</span></div>
              <h3>Freezone<span>B2B</span></h3>
              <p className="ed-project-tagline">An international sourcing platform with a real backend — not just a storefront.</p>
              <p>Built with Next.js, PostgreSQL, Drizzle and Clerk. Combines supplier research, moderated offers, RFQs, quotation comparison, role-based onboarding and inventory workflows.</p>
              <div className="ed-tech-line"><span>Next.js</span><span>TypeScript</span><span>PostgreSQL</span><span>Clerk</span><span>Drizzle</span></div>
              <div className="ed-feature-actions"><Link className="ed-inline-cta" href="/projects/freezoneb2b">Read case study <ArrowUpRight size={18}/></Link><a href="https://freezoneb2b.vercel.app/" target="_blank" rel="noreferrer" className="ed-inline-subtle">Live website <ExternalLink size={15}/></a></div>
            </div>
            <div className="ed-product-stage">
              <div className="ed-browser-bar"><div><i/><i/><i/></div><span>freezoneb2b.vercel.app</span><ExternalLink size={13}/></div>
              <div className="ed-browser-content"><iframe src="https://freezoneb2b.vercel.app/" title="Live FreezoneB2B website preview" loading="lazy" tabIndex={-1} aria-hidden="true"/></div>
              <div className="ed-stage-footer"><span>LIVE WEBSITE PREVIEW</span><a href="https://freezoneb2b.vercel.app/" target="_blank" rel="noreferrer">OPEN PLATFORM <ArrowUpRight size={14}/></a></div>
            </div>
          </article>
          <div className="ed-work-metrics" data-reveal>
            <div><b>2,873</b><span>Source-listed companies</span></div><div><b>69</b><span>Countries / regions in research</span></div><div><b>7,894</b><span>Published product-range references</span></div>
            <p>Reference-directory coverage, not verified onboarded sellers or sales. <Link href="/projects/freezoneb2b">View the evidence →</Link></p>
          </div>
          <div className="ed-project-list">
            {projects.filter(p=>p.slug!=="freezoneb2b").map((project,index)=>(
              <article className="ed-project-row" key={project.slug} data-reveal>
                <span className="ed-project-row-index">0{index+2}</span>
                <div className="ed-project-row-info"><span className="ed-small-label">ENGINEERING CASE STUDY</span><h3>{project.shortName}</h3><p>{project.tagline}</p><div className="ed-tags">{project.stack.slice(0,5).map(tech=><span key={tech}>{tech}</span>)}</div></div>
                <div className={"ed-project-graphic "+(index===0?"ed-graphic-ops":"ed-graphic-integratex")} aria-hidden="true"><div><span>{index===0?"INCIDENT / EVIDENCE":"INTENT / EXECUTION"}</span><strong>{index===0?"observe → explain":"validate → automate"}</strong><small>{index===0?"HUMAN REVIEW REQUIRED":"TYPED WORKFLOWS"}</small></div></div>
                <div className="ed-project-row-actions"><Link href={"/projects/"+project.slug} aria-label={"View "+project.shortName+" case study"}><ArrowUpRight size={24}/></Link>{project.demoUrl&&<a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={"Open "+project.shortName+" demo"}><ExternalLink size={19}/></a>}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="expertise" className="ed-section ed-expertise" aria-labelledby="expertise-title">
          <div className="ed-section-heading" data-reveal><span className="ed-section-no">02 / EXPERTISE</span><div><h2 id="expertise-title">Under the <em>hood.</em></h2><p>A practical toolkit spanning interface engineering, reliable services and IT support.</p></div></div>
          <div className="ed-skills-layout"><div className="ed-skills-note" data-reveal><span>THE WORK BEHIND THE WORK</span><p>Pick a technology to see where it appears in my projects. Skills without an explicit project match are part of my broader technical toolkit.</p><div className="ed-skill-evidence" aria-live="polite">{activeSkill?<><strong>{activeSkill}</strong><span>{usedIn.length?"Used in "+usedIn.join(", "):"Technical knowledge / no specific public project mapped"}</span><button onClick={()=>setActiveSkill(null)}>Clear selection <X size={13}/></button></>:<><strong>Choose a skill</strong><span>Evidence and context, without arbitrary proficiency percentages.</span></>}</div></div><div className="ed-skills-groups">{skillAreas.map((group,i)=><div className="ed-skill-group" key={group.title} data-reveal><span className="ed-skill-num">0{i+1}</span><div><h3>{group.title}</h3><p>{group.caption}</p><div className="ed-skill-items">{group.items.map(item=><button key={item} type="button" aria-pressed={activeSkill===item} className={activeSkill===item?"selected":""} onClick={()=>setActiveSkill(activeSkill===item?null:item)}>{item}{activeSkill===item&&<Check size={12}/>}</button>)}</div></div></div>)}</div></div>
        </section>

        <section id="about" className="ed-section ed-about" aria-labelledby="about-title">
          <div className="ed-section-heading" data-reveal><span className="ed-section-no">03 / ABOUT</span><div><h2 id="about-title">Curious by <em>design.</em></h2></div></div>
          <div className="ed-about-grid"><div className="ed-about-story" data-reveal><p>I’m in my final year of Computer Science Engineering at VIT Bhopal. I like building systems end to end: understanding a real problem, designing the data model, writing APIs, testing edge cases and making the experience easy to use.</p><p>My work includes a global B2B commerce platform, incident-intelligence software and API workflow automation. I’m interested in international graduate and entry-level engineering roles where thoughtful implementation matters.</p><div className="ed-education"><span>EDUCATION</span><strong>B.Tech · Computer Science & Engineering</strong><p>VIT Bhopal University · 2023—2027 · CGPA 8.3/10</p></div></div><div className="ed-about-history" data-reveal><h3>Beyond the code</h3><div><span>01</span><p><strong>GirlScript Summer of Code</strong><small>Open-source contributor · 2024</small></p></div><div><span>02</span><p><strong>Project Lead & Technical Documentation</strong><small>Architecture, milestones & integration planning</small></p></div><div><span>03</span><p><strong>Microsoft Technical Club</strong><small>Core team member · Workshops & project showcases</small></p></div></div></div>
          <div className="ed-credentials" data-reveal><div className="ed-credential-heading"><div><span className="ed-small-label">CREDENTIALS</span><h3>Continuing to learn.</h3></div><button onClick={()=>setShowAllCredentials(!showAllCredentials)} aria-expanded={showAllCredentials}>{showAllCredentials?"Show less":"View all credentials"} <ArrowRight size={16}/></button></div><div className="ed-credential-list">{certifications.slice(0,showAllCredentials?certifications.length:3).map((c,i)=><a href={c.url} key={c.title} target="_blank" rel="noreferrer"><span>0{i+1}</span><strong>{c.title}</strong><small>{c.issuer}</small><ArrowUpRight size={17}/></a>)}</div></div>
        </section>

        <section className="ed-section ed-github" aria-labelledby="source-title">
          <div className="ed-section-heading" data-reveal><span className="ed-section-no">04 / OPEN SOURCE</span><div><h2 id="source-title">See the <em>source.</em></h2><p>Selected public repositories. No invented activity numbers.</p></div></div>
          <div className="ed-repo-list">{selectedRepos.map(r=><a key={r.name} href={r.link} target="_blank" rel="noreferrer" className="ed-repo" data-reveal><Github size={23}/><div><strong>{r.name}</strong><p>{r.desc}</p></div><ArrowUpRight size={20}/></a>)}</div>
          <a href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer" className="ed-github-all">Explore my GitHub <ArrowUpRight size={16}/></a>
        </section>

        <section id="contact" className="ed-contact" aria-labelledby="contact-title">
          <div className="ed-contact-top" data-reveal><span>05 / GET IN TOUCH</span><span>LET'S TALK ABOUT SOMETHING REAL.</span></div>
          <div className="ed-contact-main" data-reveal><p>Have an idea, a role, or an interesting problem?</p><h2 id="contact-title">Let’s make it <em>work.</em></h2><a href="mailto:aahanaahir10@gmail.com" className="ed-contact-cta">Start a conversation <ArrowUpRight size={29}/></a></div>
          <footer className="ed-footer"><span>© 2026 AAHANA AHIR</span><div><a href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/aahanaahir02/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a><a href="mailto:aahanaahir10@gmail.com">Email <ArrowUpRight size={13}/></a><Link href="/resume">Résumé <ArrowUpRight size={13}/></Link></div><a href="#top">Back to top ↑</a></footer>
        </section>
      </main>
    </div>
  );
}
