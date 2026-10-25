"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Contact,
  Download,
  ExternalLink,
  GitBranch,
  Languages,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { projects } from "@/data/projects";
import { languageOptions } from "@/data/resume";

const skillGroups = [
  { label: "Language layer", skills: ["Python", "Java", "SQL"] },
  { label: "Service layer", skills: ["FastAPI", "Flask", "REST APIs"] },
  { label: "Intelligence layer", skills: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS"] },
  { label: "Data layer", skills: ["PostgreSQL", "MySQL", "SQLite"] },
  { label: "Delivery layer", skills: ["AWS", "Docker", "Git", "GitHub", "Postman"] },
  { label: "Interface layer", skills: ["Figma", "Canva", "Adobe Express"] },
];

const skillMap: Record<string, string[]> = {
  Python: ["opsassist-ai", "integratex", "suicide-prevention-microservice"],
  FastAPI: ["opsassist-ai", "integratex"],
  PostgreSQL: ["opsassist-ai", "integratex"],
  AWS: ["opsassist-ai", "integratex"],
  Docker: ["opsassist-ai", "integratex"],
  FAISS: ["opsassist-ai"],
  RAG: ["opsassist-ai", "integratex"],
};

const certifications = [
  {
    code: "GOOGLE",
    title: "Google IT Support Certificate",
    issuer: "Google",
    issued: "Mar 2026",
    credentialUrl: "https://www.credly.com/badges/285c98dd-27a8-4841-86a7-1eb9ee7a640b/linked_in_profile",
  },
  {
    code: "NETWORK",
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    issued: "Nov 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/YNSCCNS6GJNX",
  },
  {
    code: "AWS",
    title: "AWS Educate Introduction to Generative AI",
    issuer: "Amazon Web Services",
    issued: "Jul 2025",
    credentialUrl: "https://www.credly.com/badges/c1388cdc-f0ce-4c41-829f-3b5a68cf6d28/linked_in_profile",
  },
  {
    code: "IBM",
    title: "GEN AI Using IBM Watsonx",
    issuer: "IBM",
    issued: "Jun 2025",
    credentialUrl: "https://courses.adroitprolearn.skillsnetwork.site/certificates/d8f15675eb49481fa8c64848731b16da",
  },
  {
    code: "NPTEL",
    title: "Introduction to Machine Learning",
    issuer: "NPTEL / IIT Madras",
    issued: "Jan-Apr 2025",
    credentialUrl: "/certificates/nptel-introduction-to-machine-learning.pdf",
  },
  {
    code: "ANALYTICS",
    title: "Google Analytics Certification",
    issuer: "Google Digital Academy",
    issued: "Oct 2024",
    credentialUrl: "https://skillshop.credential.net/4be459ff-f634-460f-bbb5-92f0660f9fc4",
  },
];

export function IntelligenceCore({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`intelligence-core ${compact ? "core-compact" : ""}`} aria-hidden="true">
      <div className="core-aura" />
      <div className="core-plane plane-a" />
      <div className="core-plane plane-b" />
      <div className="core-orbit orbit-a"><i /><i /><i /></div>
      <div className="core-orbit orbit-b"><i /><i /><i /><i /></div>
      <div className="core-orbit orbit-c"><i /><i /></div>
      <svg className="core-neural-web" viewBox="0 0 400 400">
        <path d="M64 210 L142 112 L205 188 L286 85 L337 196" />
        <path d="M70 292 L142 112 L222 300 L337 196" />
        <path d="M64 210 L205 188 L222 300 L305 334" />
        {[ [64, 210], [70, 292], [142, 112], [205, 188], [222, 300], [286, 85], [337, 196], [305, 334] ].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r={index % 3 === 0 ? 5 : 3.5} />)}
      </svg>
      <div className="core-sphere">
        <span className="core-grid" />
        <span className="core-point point-a" />
        <span className="core-point point-b" />
        <span className="core-point point-c" />
      </div>
      <span className="core-label label-a">API</span>
      <span className="core-label label-b">RAG</span>
      <span className="core-label label-c">DB</span>
      <span className="core-label label-d">HITL</span>
    </div>
  );
}

function NeuralTrace() {
  const layers = [4, 6, 5, 3];
  return (
    <section className="neural-trace section-pad" aria-labelledby="neural-title">
      <div className="neural-copy">
        <p className="section-code">SYS.00B / NEURAL TRACE</p>
        <h2 id="neural-title">From signal to<br /><em>explainable output.</em></h2>
        <p>A living map of the engineering path I use for intelligent systems: normalize the input, form useful representations, ground the model and keep the final decision visible.</p>
        <div className="neural-legend"><span>01 / SIGNAL</span><span>02 / EMBEDDING</span><span>03 / INFERENCE</span><span>04 / OUTPUT</span></div>
      </div>
      <div className="neural-stage" aria-hidden="true">
        <div className="neural-depth-grid" />
        <svg viewBox="0 0 720 430" role="presentation">
          <defs>
            <linearGradient id="neural-flow" x1="0" x2="1"><stop stopColor="#6fe5ff" stopOpacity=".12" /><stop offset=".5" stopColor="#7e66ff" stopOpacity=".85" /><stop offset="1" stopColor="#65f5b5" stopOpacity=".2" /></linearGradient>
          </defs>
          {layers.slice(0, -1).flatMap((count, layerIndex) => {
            const nextCount = layers[layerIndex + 1];
            const x1 = 96 + layerIndex * 172;
            const x2 = 96 + (layerIndex + 1) * 172;
            return Array.from({ length: count }).flatMap((_, from) => Array.from({ length: nextCount }).map((__, to) => {
              const y1 = 215 - ((count - 1) * 48) / 2 + from * 48;
              const y2 = 215 - ((nextCount - 1) * 48) / 2 + to * 48;
              return <line className="neural-connection" key={`${layerIndex}-${from}-${to}`} x1={x1} y1={y1} x2={x2} y2={y2} style={{ animationDelay: `${(from + to + layerIndex) * 90}ms` }} />;
            }));
          })}
          {layers.flatMap((count, layerIndex) => {
            const x = 96 + layerIndex * 172;
            return Array.from({ length: count }).map((_, nodeIndex) => {
              const y = 215 - ((count - 1) * 48) / 2 + nodeIndex * 48;
              return <g className="neural-node" key={`${layerIndex}-${nodeIndex}`} style={{ animationDelay: `${(layerIndex * 180) + (nodeIndex * 70)}ms` }}><circle cx={x} cy={y} r="12" /><circle className="node-core" cx={x} cy={y} r="3" /></g>;
            });
          })}
          <path className="neural-signal-path" d="M42 215 C120 90 210 345 292 215 S470 88 642 215" />
        </svg>
        <div className="model-readout readout-a"><span>VECTOR SPACE</span><b>INDEXED</b></div>
        <div className="model-readout readout-b"><span>MODEL STATE</span><b>GROUNDED</b></div>
        <div className="model-readout readout-c"><span>HUMAN LAYER</span><b>VISIBLE</b></div>
      </div>
    </section>
  );
}

function CursorSignal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      ref.current.dataset.active = interactive ? "true" : "false";
      ref.current.dataset.label = interactive?.getAttribute("data-cursor") || "";
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="cursor-signal" aria-hidden="true"><span /></div>;
}

export default function PortfolioExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const heroCoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const target = heroCoreRef.current;
        if (!target) return;
        const rotateY = ((event.clientX / window.innerWidth) - 0.5) * 13;
        const rotateX = ((event.clientY / window.innerHeight) - 0.5) * -9;
        target.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
        target.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".section-heading, .scan-panel, .skill-row, .education-grid, .credential-row");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("reveal-target", "is-visible"));
      return;
    }
    targets.forEach((target, index) => {
      target.classList.add("reveal-target");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const highlighted = useMemo(() => selectedSkill ? skillMap[selectedSkill] || [] : [], [selectedSkill]);

  return (
    <main className="site-shell">
      <CursorSignal />
      <a className="skip-to-work" href="#work">Skip to Work</a>
      <div className="scroll-orbit" aria-label={`Page progress ${Math.round(progress * 100)}%`}>
        <svg viewBox="0 0 44 44"><circle className="scroll-track" cx="22" cy="22" r="18" /><circle className="scroll-value" cx="22" cy="22" r="18" style={{ strokeDashoffset: 113 - 113 * progress }} /></svg>
        <span>{String(Math.round(progress * 100)).padStart(2, "0")}</span>
      </div>

      <header className="system-nav">
        <a className="system-mark" href="#top" data-cursor="HOME"><b>AAHANA</b><span>/ SYSTEMS</span></a>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#profile" onClick={() => setMenuOpen(false)}>Profile</a>
          <a href="#languages" onClick={() => setMenuOpen(false)}>Languages</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero-scene">
        <div className="hero-sticky">
        <div className="hero-crosshair" aria-hidden="true">✳</div>
        <div className="hero-grid" />
        <div className="data-rain" aria-hidden="true">
          {["0101", "RAG", "∇L", "VECTOR", "AI", "TOKEN", "HITL", "PY", "MODEL", "API"].map((token, index) => <span key={token} style={{ "--stream": index } as CSSProperties}>{token}</span>)}
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> INDIA / OPEN WORLDWIDE</p>
          <h1><span>Aahana</span><span>Ahir</span></h1>
          <div className="hero-rule" /><div className="scroll-invitation" aria-hidden="true"><span>SCROLL TO TRANSFORM</span><i>↓</i></div>
          <p className="hero-role">COMPUTER SCIENCE ENGINEER <i>×</i> INTELLIGENT SYSTEMS</p>
          <p className="hero-statement">Engineering intelligent systems<br />that <em>explain</em> their reasoning.</p>
          <div className="hero-actions">
            <a href="#work" className="signal-button" data-cursor="EXPLORE">Enter the systems <ArrowDownRight size={18} /></a>
            <a href="mailto:aahanaahir10@gmail.com" className="text-link">Start a conversation <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div ref={heroCoreRef} className="hero-core-wrap">
          <div className="hero-art-space" aria-hidden="true" />
          <div className="telemetry telemetry-a"><span>RETRIEVAL</span><b>READY</b></div>
          <div className="telemetry telemetry-b"><span>CONTROL</span><b>HUMAN</b></div>
          <div className="telemetry telemetry-c"><span>SYSTEM</span><b>AA—27</b></div>
        </div>
        <div className="hero-footer"><span>PYTHON</span><span>AI / ML</span><span>BACKEND</span><span>CLOUD</span></div>
        <div className="hero-refrain" aria-hidden="true"><span>INTELLIGENT</span><span>SYSTEMS.</span></div>
        <div className="sequence-meter" aria-hidden="true"><span>SCROLL TO DECONSTRUCT</span><i /><b>001 / 100</b></div>
        </div>
      </section>

      <section className="manifesto-section" aria-label="Portfolio focus"><div className="manifesto-sticky">
        <span className="manifesto-star" aria-hidden="true">✳</span>
        <p className="section-code">SYS.00 / OPERATING PRINCIPLE</p>
        <p className="manifesto">{"Software earns trust when the path from signal to decision stays visible.".split(" ").map((word, i) => <span className="manifesto-word" key={i}><span>{word}</span>{" "}</span>)}</p>
        <div className="principle-line"><span>01 / UNDERSTAND</span><span>02 / GROUND</span><span>03 / BUILD</span><span>04 / VERIFY</span></div></div>
      </section>

      <div className="kinetic-strip" aria-hidden="true"><div>PYTHON / AI / ML / BACKEND / CLOUD / PYTHON / AI / ML / BACKEND / CLOUD /</div></div>
      <NeuralTrace />

      <section id="profile" className="profile-scene section-pad">
        <div className="section-heading">
          <p className="section-code">SYS.01 / IDENTITY SCAN</p>
          <h2>Profile,<br /><em>decoded.</em></h2>
        </div>
        <div className="scan-panel">
          <div className="scan-line" />
          <p className="scan-lead">A final-year Computer Science Engineering student building Python backends, AI-powered applications, cloud-ready APIs and explainable automation systems.</p>
          <div className="profile-facts">
            <div><span>Institution</span><b>VIT Bhopal University</b></div>
            <div><span>Program</span><b>B.Tech — Computer Science</b></div>
            <div><span>Graduation</span><b>2027 / Final Year</b></div>
            <div><span>CGPA</span><b>8.3 / 10</b></div>
            <div><span>Base</span><b>India</b></div>
            <div><span>Trajectory</span><b>International / Remote</b></div>
          </div>
          <p className="scan-note">Targeting entry-level opportunities across Software Engineering, Python Development, AI/ML Engineering and Solutions Engineering.</p>
        </div>
      </section>


      <section id="languages" className="language-universe section-pad">
        <div className="language-heading">
          <div>
            <p className="section-code">SYS.01B / LANGUAGE CONSTELLATION</p>
            <h2>Six languages.<br /><em>Six visual worlds.</em></h2>
          </div>
          <p>Choose a language to open my complete résumé in that language. Each mode changes its typography, color system and animated 3D visualization while preserving the same professional evidence.</p>
        </div>
        <div className="language-constellation">
          <div className="language-stage" aria-hidden="true">
            <div className="language-sphere">
              <i className="language-particle p1" /><i className="language-particle p2" /><i className="language-particle p3" />
            </div>
            <span className="language-stage-label one">6 LANGUAGE SYSTEMS</span>
            <span className="language-stage-label two">LIVE RÉSUMÉ TRANSLATION</span>
          </div>
          <div className="language-card-grid">
            {languageOptions.map((language, index) => (
              <Link
                href={`/resume?lang=${language.code}`}
                className="language-card"
                data-glyph={language.glyph}
                data-cursor="OPEN RÉSUMÉ"
                key={language.code}

              >
                <span>LANG / {String(index + 1).padStart(2, "0")}</span>
                <Languages size={16} />
                <h3>{language.nativeLabel}</h3>
                <p>{language.label} · {language.level}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="skills-section section-pad">
        <div className="section-heading compact-heading">
          <p className="section-code">SYS.02 / CAPABILITY MAP</p>
          <h2>Skills are<br /><em>connected.</em></h2>
          <p>Select a node to reveal where it operates.</p>
        </div>
        <div className="skills-map">
          <div className="map-axis"><span>INPUT</span><i /><span>OUTPUT</span></div>
          {skillGroups.map((group, index) => (
            <div className="skill-row" key={group.label}>
              <span className="skill-index">0{index + 1}</span>
              <h3>{group.label}</h3>
              <div className="skill-nodes">
                {group.skills.map((skill) => (
                  <button key={skill} className={selectedSkill === skill ? "is-selected" : ""} onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}>{skill}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="work-universe section-pad"><div className="work-sticky">
        <div className="work-heading">
          <div><p className="section-code">SYS.03 / FEATURED WORK</p><h2>Four systems.<br /><em>One philosophy.</em></h2></div>
          <p>Projects are presented with honest status, architecture, evidence boundaries and next steps—not inflated impact.</p>
        </div>
        <div className="gallery-viewport"><div className="project-index">
          {projects.map((project, projectIndex) => {
            const dimmed = highlighted.length > 0 && !highlighted.includes(project.slug);
            const lit = highlighted.includes(project.slug);
            return (
              <Link href={`/projects/${project.slug}`} key={project.slug} className={`project-row project-card-${projectIndex} ${dimmed ? "is-dimmed" : ""} ${lit ? "is-lit" : ""}`} data-cursor="ENTER SYSTEM">
                <div className="project-art" aria-hidden="true"><span className="art-serial">{project.number}</span><div className="project-object">{Array.from({length:8},(_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</div><span className="art-label">{project.stack[0]} ↗ {project.stack[1]}</span></div>
                <span className="project-number">{project.number}</span>
                <div className="project-name"><h3>{project.shortName}</h3><p>{project.title}</p></div>
                <div className="project-meta"><span className={`status-dot ${project.statusTone}`} />{project.status}</div>
                <div className="project-stack">{project.stack.slice(0, 4).join(" / ")}</div>
                <ArrowUpRight className="project-arrow" size={24} />
              </Link>
            );
          })}
        </div>
        </div>
        <div className="gallery-controls"><span>SCROLL TO EXPLORE →</span><div>{projects.map((project,i)=><button key={project.slug} aria-label={`Show ${project.shortName}`} onClick={()=>{const section=document.getElementById("work");const card=document.querySelectorAll<HTMLElement>(".project-row")[i];if(!section||!card)return;if(document.documentElement.classList.contains("immersive-ready")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){window.scrollTo({top:section.offsetTop+(section.offsetHeight-innerHeight)*(i/(projects.length-1)),behavior:"smooth"});}else card.scrollIntoView({behavior:"smooth",block:"center"});}}>{String(i+1).padStart(2,"0")}</button>)}</div><span className="gallery-count">01 / 04</span></div>
        {selectedSkill && <p className="skill-signal">ACTIVE SIGNAL: {selectedSkill.toUpperCase()} → {highlighted.length || "NO DIRECT PROJECT MAP"}</p>}
      </div></section>

      <section id="experience" className="experience-section section-pad">
        <div className="section-heading compact-heading">
          <p className="section-code">SYS.04 / EXPERIENCE LOG</p>
          <h2>Built in the<br /><em>open.</em></h2>
        </div>
        <div className="experience-log">
          <article className="experience-entry">
            <div className="entry-time"><span>2024</span><i /></div>
            <div><p className="eyebrow">OPEN SOURCE / REMOTE</p><h3>GirlScript Summer of Code</h3><h4>Open Source Contributor</h4></div>
            <ul><li>Investigated reported issues and reproduced defects.</li><li>Contributed Python features, bug fixes and documentation through pull-request workflows.</li><li>Incorporated maintainer feedback and improved setup usability.</li><li>Collaborated asynchronously using Git and GitHub.</li></ul>
          </article>
          <article className="experience-entry">
            <div className="entry-time"><span>NOW</span><i /></div>
            <div><p className="eyebrow">LEADERSHIP / SYSTEMS</p><h3>Project Lead & Technical Documentation Author</h3><h4>Architecture + Integration Planning</h4></div>
            <ul><li>Led planning across frontend, API, data, retrieval, testing, safety and deployment workstreams.</li><li>Defined milestones, integration responsibilities and technical documentation.</li><li>Authored architecture, API, evaluation, risk and deployment material.</li></ul>
          </article>
          <article className="experience-entry">
            <div className="entry-time"><span>CLUB</span><i /></div>
            <div><p className="eyebrow">COMMUNITY / CAMPUS</p><h3>Microsoft Technical Club</h3><h4>Core Team Member</h4></div>
            <ul><li>Helped plan technical workshops, peer-learning sessions and student project showcases.</li><li>Coordinated technical content, documentation and cross-team communication.</li></ul>
          </article>
        </div>
      </section>

      <section className="education-section section-pad">
        <div className="education-header"><p className="section-code">SYS.05 / LEARNING GRAPH</p><span>2023 — 2027</span></div>
        <div className="education-grid">
          <div className="degree-orbit"><div><b>8.3</b><span>CGPA / 10</span></div></div>
          <div className="degree-copy"><p>VIT BHOPAL UNIVERSITY</p><h2>B.Tech in Computer<br />Science & Engineering</h2><div className="course-grid">{["Data Structures", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering", "AI / ML", "Cloud Computing"].map((course, index) => <span key={course}>0{index + 1} — {course}</span>)}</div></div>
        </div>
      </section>

      <section className="credentials-section section-pad">
        <div className="work-heading">
          <div><p className="section-code">SYS.06 / EVIDENCE ARCHIVE</p><h2>Credentials,<br /><em>indexed.</em></h2></div>
          <p>Every listed certificate opens independent completion evidence. Unverified entries are intentionally excluded.</p>
        </div>
        <div className="credentials-table">
          {certifications.map((certificate, index) => (
            <div className="credential-row" key={certificate.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{certificate.code}</b>
              <h3>{certificate.title}</h3>
              <p>{certificate.issuer}<small>ISSUED {certificate.issued}</small></p>
              <a
                className="credential-link"
                href={certificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Verify ${certificate.title}`}
              >
                VERIFY <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
        <div className="achievement-signal"><span>500+</span><p>Google Cloud Skills Boost Arcade badges across cloud, data, security and generative AI learning tracks.</p></div>
      </section>

      <section id="contact" className="contact-scene section-pad">
        <div className="contact-core"><IntelligenceCore compact /></div>
        <p className="section-code">SYS.07 / OPEN CHANNEL</p>
        <h2>Let’s build systems that are<br /><em>intelligent, explainable and useful.</em></h2>
        <p className="contact-note">Open to international, remote, internship and entry-level opportunities.</p>
        <div className="contact-actions">
          <a className="signal-button" href="mailto:aahanaahir10@gmail.com" data-cursor="CONNECT"><Mail size={18} /> Start a conversation</a>
          <a className="outline-link" href="https://www.linkedin.com/in/aahanaahir02/" target="_blank" rel="noreferrer"><Contact size={17} /> LinkedIn <ExternalLink size={14} /></a>
          <Link className="outline-link" href="/resume"><Download size={17} /> Multilingual résumé <ArrowUpRight size={14} /></Link>
          <a className="outline-link" href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub <ExternalLink size={14} /></a>
        </div>
        <div className="contact-meta"><span>INDIA / UTC+5:30</span><a href="mailto:aahanaahir10@gmail.com">AAHANAAHIR10@GMAIL.COM</a><span>AVAILABLE / 2027</span></div>
      </section>

      <footer><span>AAHANA / SYSTEMS</span><span>DESIGNED AROUND EVIDENCE + HUMAN CONTROL</span><a href="#top">RETURN TO ORBIT ↑</a></footer>
    </main>
  );
}
