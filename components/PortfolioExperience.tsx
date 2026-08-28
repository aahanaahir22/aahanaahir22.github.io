"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Contact,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  Menu,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { projects } from "@/data/projects";

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
  ["AWS", "Certified Cloud Practitioner", "Amazon Web Services"],
  ["AZ-900", "Azure Fundamentals", "Microsoft"],
  ["ML", "Introduction to Machine Learning", "NPTEL"],
  ["GEN AI", "Using IBM watsonx", "IBM"],
  ["AI/ML", "Fundamentals of ML & AI", "Amazon Web Services"],
  ["GEN AI", "Introduction to Generative AI", "AWS Educate"],
  ["IT", "Google IT Support Certificate", "Google"],
];

function useAmbientSound() {
  const contextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ oscillator: OscillatorNode; gain: GainNode } | null>(null);
  const [enabled, setEnabled] = useState(false);

  const stop = () => {
    const context = contextRef.current;
    const nodes = nodesRef.current;
    if (nodes && context) {
      nodes.gain.gain.setTargetAtTime(0, context.currentTime, 0.08);
      window.setTimeout(() => {
        try { nodes.oscillator.stop(); } catch { /* already stopped */ }
        void context.close();
      }, 240);
    }
    nodesRef.current = null;
    contextRef.current = null;
    setEnabled(false);
    sessionStorage.setItem("aahana-sound", "off");
  };

  const start = () => {
    if (contextRef.current) return;
    const WebkitContext = (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const AudioContextClass = window.AudioContext || WebkitContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 52;
    gain.gain.value = 0.0001;
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 1.4);
    contextRef.current = context;
    nodesRef.current = { oscillator, gain };
    setEnabled(true);
    sessionStorage.setItem("aahana-sound", "on");
  };

  const pulse = () => {
    const context = contextRef.current;
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 420;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.18);
  };

  useEffect(() => {
    const onVisibility = () => {
      const context = contextRef.current;
      if (!context) return;
      if (document.hidden) void context.suspend();
      else if (enabled) void context.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      const context = contextRef.current;
      if (context) void context.close();
    };
  }, [enabled]);

  return { enabled, start, stop, pulse };
}

export function IntelligenceCore({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`intelligence-core ${compact ? "core-compact" : ""}`} aria-hidden="true">
      <div className="core-aura" />
      <div className="core-orbit orbit-a"><i /><i /><i /></div>
      <div className="core-orbit orbit-b"><i /><i /><i /><i /></div>
      <div className="core-orbit orbit-c"><i /><i /></div>
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

function EntryGate({ onEnter }: { onEnter: (sound: boolean) => void }) {
  return (
    <div className="entry-gate" role="dialog" aria-modal="true" aria-labelledby="entry-title">
      <div className="entry-noise" />
      <div className="entry-core"><IntelligenceCore compact /></div>
      <p className="eyebrow">INTELLIGENT SYSTEMS UNIVERSE / 2027</p>
      <h1 id="entry-title">Choose your signal.</h1>
      <p className="entry-copy">Sound adds a subtle computational pulse. The full experience remains identical without it.</p>
      <div className="entry-actions">
        <button onClick={() => onEnter(true)}><Volume2 size={17} /> Enter with sound</button>
        <button onClick={() => onEnter(false)}><VolumeX size={17} /> Continue silently</button>
      </div>
      <button className="skip-link-button" onClick={() => onEnter(false)}>Skip intro</button>
    </div>
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
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { enabled: soundEnabled, start: startSound, stop: stopSound, pulse } = useAmbientSound();

  useEffect(() => {
    if (sessionStorage.getItem("aahana-entered") === "yes") {
      document.body.classList.add("system-entered");
      queueMicrotask(() => setEntered(true));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const highlighted = useMemo(() => selectedSkill ? skillMap[selectedSkill] || [] : [], [selectedSkill]);

  const enter = (withSound: boolean) => {
    if (withSound) startSound();
    else sessionStorage.setItem("aahana-sound", "off");
    setEntered(true);
    sessionStorage.setItem("aahana-entered", "yes");
    document.body.classList.add("system-entered");
  };

  return (
    <main className="site-shell">
      {!entered && <EntryGate onEnter={enter} />}
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
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => soundEnabled ? stopSound() : startSound()} aria-label={soundEnabled ? "Mute ambient sound" : "Enable ambient sound"} data-cursor={soundEnabled ? "MUTE" : "SOUND"}>
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <section id="top" className="hero-scene">
        <div className="hero-grid" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> INDIA / OPEN WORLDWIDE</p>
          <h1><span>Aahana</span><span>Ahir</span></h1>
          <div className="hero-rule" />
          <p className="hero-role">COMPUTER SCIENCE ENGINEER <i>×</i> INTELLIGENT SYSTEMS</p>
          <p className="hero-statement">Engineering intelligent systems<br />that <em>explain</em> their reasoning.</p>
          <div className="hero-actions">
            <a href="#work" className="signal-button" data-cursor="EXPLORE" onClick={pulse}>Enter the systems <ArrowDownRight size={18} /></a>
            <a href="mailto:aahanaahir10@gmail.com" className="text-link">Start a conversation <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="hero-core-wrap">
          <IntelligenceCore />
          <div className="telemetry telemetry-a"><span>RETRIEVAL</span><b>READY</b></div>
          <div className="telemetry telemetry-b"><span>CONTROL</span><b>HUMAN</b></div>
          <div className="telemetry telemetry-c"><span>SYSTEM</span><b>AA—27</b></div>
        </div>
        <div className="hero-footer"><span>PYTHON</span><span>AI / ML</span><span>BACKEND</span><span>CLOUD</span></div>
      </section>

      <section className="manifesto-section" aria-label="Portfolio focus">
        <p className="section-code">SYS.00 / OPERATING PRINCIPLE</p>
        <p className="manifesto">Software earns trust when the path from <span>signal</span> to <span>decision</span> stays visible.</p>
        <div className="principle-line"><span>01 / UNDERSTAND</span><span>02 / GROUND</span><span>03 / BUILD</span><span>04 / VERIFY</span></div>
      </section>

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

      <section id="work" className="work-universe section-pad">
        <div className="work-heading">
          <div><p className="section-code">SYS.03 / FEATURED WORK</p><h2>Four systems.<br /><em>One philosophy.</em></h2></div>
          <p>Projects are presented with honest status, architecture, evidence boundaries and next steps—not inflated impact.</p>
        </div>
        <div className="project-index">
          {projects.map((project) => {
            const dimmed = highlighted.length > 0 && !highlighted.includes(project.slug);
            const lit = highlighted.includes(project.slug);
            return (
              <Link href={`/projects/${project.slug}`} key={project.slug} className={`project-row ${dimmed ? "is-dimmed" : ""} ${lit ? "is-lit" : ""}`} data-cursor="ENTER SYSTEM" onClick={pulse}>
                <span className="project-number">{project.number}</span>
                <div className="project-name"><h3>{project.shortName}</h3><p>{project.title}</p></div>
                <div className="project-meta"><span className={`status-dot ${project.statusTone}`} />{project.status}</div>
                <div className="project-stack">{project.stack.slice(0, 4).join(" / ")}</div>
                <ArrowUpRight className="project-arrow" size={24} />
              </Link>
            );
          })}
        </div>
        {selectedSkill && <p className="skill-signal">ACTIVE SIGNAL: {selectedSkill.toUpperCase()} → {highlighted.length || "NO DIRECT PROJECT MAP"}</p>}
      </section>

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
          <p>Verification links, issue dates and credential IDs can be attached when supplied. None are fabricated here.</p>
        </div>
        <div className="credentials-table">
          {certifications.map(([code, title, issuer], index) => <div className="credential-row" key={title}><span>{String(index + 1).padStart(2, "0")}</span><b>{code}</b><h3>{title}</h3><p>{issuer}</p><span className="credential-state">ARCHIVED</span></div>)}
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
          <button className="outline-link is-placeholder" disabled title="Resume file will be linked when supplied"><Download size={17} /> Résumé / pending</button>
          <button className="outline-link is-placeholder" disabled title="GitHub profile will be linked when supplied"><GitBranch size={17} /> GitHub / pending</button>
        </div>
        <div className="contact-meta"><span>INDIA / UTC+5:30</span><a href="mailto:aahanaahir10@gmail.com">AAHANAAHIR10@GMAIL.COM</a><span>AVAILABLE / 2027</span></div>
      </section>

      <footer><span>AAHANA / SYSTEMS</span><span>DESIGNED AROUND EVIDENCE + HUMAN CONTROL</span><a href="#top">RETURN TO ORBIT ↑</a></footer>
    </main>
  );
}
