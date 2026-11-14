"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, ExternalLink, GitBranch, Mail, Menu, Pause, Play, X } from "lucide-react";
import CreativeWorkDial from "@/components/CreativeWorkDial";
import { certifications, languageOptions } from "@/data/resume";
import { projects } from "@/data/projects";

const disciplines = [
  { name:"01 / Frontend engineering", detail:"Interfaces with the details considered.",skills:["Next.js","React","TypeScript","JavaScript","HTML/CSS","Tailwind CSS","Responsive UI","Figma"] },
  { name:"02 / Backend and data", detail:"APIs, authentication and reliable state.",skills:["Python","Java","FastAPI","Flask","REST APIs","PostgreSQL","Neon","Drizzle ORM","Clerk","Zod","MySQL","SQLite"] },
  { name:"03 / AI and automation", detail:"From signals to explainable outcomes.",skills:["PyTorch","scikit-learn","Pandas","NumPy","LLMs","RAG","FAISS","Redis","Celery"] },
  { name:"04 / Cloud and testing", detail:"Built to run, tested to survive.",skills:["AWS","Vercel","Docker","Git","GitHub","Postman","API Testing","Unit Testing","Technical Documentation"] },
  { name:"05 / IT support & networking", detail:"Find the fault. Fix what matters.",skills:["TCP/IP","DNS","DHCP","HTTP/HTTPS","Network Troubleshooting","Hardware/Software Diagnostics","Windows Troubleshooting","System Configuration","End-User Support","Ticketing Fundamentals"] },
];
const skillProjects:Record<string,string[]> = {
  "Next.js":["FreezoneB2B"],"React":["FreezoneB2B","OpsAssist AI","IntegrateX"],"TypeScript":["FreezoneB2B"],
  "PostgreSQL":["FreezoneB2B","OpsAssist AI","IntegrateX"],"Neon":["FreezoneB2B"],"Drizzle ORM":["FreezoneB2B"],
  "Clerk":["FreezoneB2B"],"Zod":["FreezoneB2B"],"Vercel":["FreezoneB2B"],
  "Python":["OpsAssist AI","IntegrateX"],"FastAPI":["OpsAssist AI","IntegrateX"],
  "RAG":["OpsAssist AI","IntegrateX"],"FAISS":["OpsAssist AI"],
  "Docker":["OpsAssist AI","IntegrateX"],"Redis":["IntegrateX"],"Celery":["IntegrateX"],
  "REST APIs":["FreezoneB2B","OpsAssist AI","IntegrateX"],
};

const experience = [
  {year:"2024",role:"Open Source Contributor",at:"GirlScript Summer of Code",description:"Contributed to code, documentation and collaborative GitHub workflows."},
  {year:"Current",role:"Project Lead & Technical Documentation Author",at:"Independent Engineering Work",description:"Plan architecture, API, data, testing, integration and deployment decisions."},
  {year:"Campus",role:"Core Team Member",at:"Microsoft Technical Club",description:"Organized workshops, peer-learning and student project showcases."},
];

export default function MotionPortfolio() {
  const [menu,setMenu]=useState(false);
  const [motion,setMotion]=useState(true);
  const [highlight,setHighlight]=useState<string|null>(null);
  const heroRef=useRef<HTMLElement>(null);
  useEffect(()=>{setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)},[]);
  useEffect(()=>{
    if(!motion||!heroRef.current)return;
    const el=heroRef.current;
    const move=(e:PointerEvent)=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty("--hover-x",String(x));el.style.setProperty("--hover-y",String(y));
    };
    el.addEventListener("pointermove",move,{passive:true});
    return ()=>el.removeEventListener("pointermove",move);
  },[motion]);
  useEffect(()=>{
    const targets=document.querySelectorAll<HTMLElement>(".mv-reveal");
    if(!("IntersectionObserver" in window)||!motion){targets.forEach(el=>el.classList.add("mv-visible"));return}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add("mv-visible");io.unobserve(e.target)}
    }),{threshold:.09,rootMargin:"0px 0px -35px 0px"});
    targets.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[motion]);
  const activeProof=highlight?skillProjects[highlight]||[]:[];
  const close=()=>setMenu(false);
  return <div className="mv-site" data-motion={motion?"on":"off"}>
    <a className="mv-skip" href="#selected-work">Skip to work</a>
    <header className="mv-nav" id="top">
      <Link href="/" className="mv-brand" onClick={close}><span className="mv-brand-icon">a<span>.</span></span><span>AAHANA AHIR <small>ENGINEER / CREATOR</small></span></Link>
      <nav className={menu?"mv-links mv-open":"mv-links"} aria-label="Main navigation">
        <a href="#selected-work" onClick={close}>Work</a><a href="#skills" onClick={close}>Skills</a><a href="#about" onClick={close}>About</a><a href="#credentials" onClick={close}>Certificates</a><a href="#contact" onClick={close}>Contact</a>
      </nav>
      <div className="mv-nav-actions"><Link href="/resume/" className="mv-nav-resume">Résumé <ArrowUpRight size={14}/></Link><button type="button" className="mv-motion-toggle" onClick={()=>setMotion(!motion)} aria-label={motion?"Reduce animation":"Enable animation"} aria-pressed={motion}>{motion?<Pause size={13}/>:<Play size={13}/>} <span>Motion {motion?"on":"off"}</span></button><button className="mv-menu" onClick={()=>setMenu(!menu)} aria-label={menu?"Close menu":"Open menu"} aria-expanded={menu}>{menu?<X size={23}/>:<Menu size={23}/>}</button></div>
    </header>
    <main>
      <section ref={heroRef} className="mv-hero" aria-labelledby="mv-name">
        <div className="mv-hero-top mv-reveal"><span>PORTFOLIO — 2026</span><span>BASED IN INDIA / WORKING WORLDWIDE</span></div>
        <div className="mv-hero-headline">
          <div className="mv-hero-type mv-reveal"><p>FULL-STACK DEVELOPER / BACKEND & AI SYSTEMS</p><h1 id="mv-name">Aahana<br/><em>Ahir</em><span>.</span></h1><div className="mv-hero-statement"><span>Not just a demo.</span><strong>Built to work.</strong></div></div>
          <div className="mv-hero-engine mv-reveal" aria-hidden="true">
            <div className="mv-engine-orbit mv-engine-one"/><div className="mv-engine-orbit mv-engine-two"/><div className="mv-engine-orbit mv-engine-three"/>
            <div className="mv-engine-center"><span>THINK</span><b>BUILD</b><span>SHIP</span></div>
            <div className="mv-engine-tag mv-engine-a">01 / INTERFACE</div><div className="mv-engine-tag mv-engine-b">02 / SYSTEM</div><div className="mv-engine-tag mv-engine-c">03 / IMPACT</div>
          </div>
        </div>
        <div className="mv-hero-bottom mv-reveal"><p>I build commerce platforms, intelligent workflows and practical digital products. My favorite part is making the complex feel simple.</p><div className="mv-hero-ctas"><a href="#selected-work" className="mv-cta mv-cta-dark">Explore work <ArrowDown size={18}/></a><Link href="/resume/" className="mv-cta mv-cta-outline">View my résumé <ArrowUpRight size={18}/></Link></div></div>
        <div className="mv-hero-ticker"><div aria-hidden="true">BACKEND <span>✳</span> COMMERCE <span>✳</span> AI SYSTEMS <span>✳</span> SOFTWARE ENGINEERING <span>✳</span> BACKEND <span>✳</span> COMMERCE <span>✳</span> AI SYSTEMS <span>✳</span> SOFTWARE ENGINEERING <span>✳</span></div></div>
      </section>

      <div id="selected-work"><CreativeWorkDial/></div>

      <section className="mv-language-feature mv-section" id="languages" aria-labelledby="languages-title">
        <div className="mv-section-head mv-reveal"><span>02 / MULTILINGUAL RÉSUMÉ</span><span>ONE STORY, SIX LANGUAGES</span></div>
        <div className="mv-language-top mv-reveal"><div><h2 id="languages-title">Read me in<br/><em>your language.</em></h2><p>My complete résumé, including my projects, education, experience and credentials. Choose a language to open it.</p></div><div className="mv-language-sculpture" aria-hidden="true"><span>अ</span><span>Ä</span><span>Ñ</span><span>語</span><b>AA</b></div></div>
        <div className="mv-language-grid">{languageOptions.map((l,i)=><Link key={l.code} href={"/resume/?lang="+l.code} className="mv-language-tile mv-reveal" lang={l.code}><span>{String(i+1).padStart(2,"0")}</span><strong>{l.nativeLabel}</strong><small>{l.level}</small><ArrowUpRight size={21}/></Link>)}</div>
      </section>

      <section className="mv-skills mv-section" id="skills" aria-labelledby="skills-title">
        <div className="mv-section-head mv-reveal"><span>03 / WHAT I USE</span><span>NOT A WALL OF LOGOS</span></div>
        <div className="mv-skills-layout"><div className="mv-skills-intro mv-reveal"><h2 id="skills-title">The right<br/><em>tools.</em></h2><p>From interfaces and data models to network troubleshooting. Select a skill to see which of my featured projects uses it.</p><div className="mv-skill-proof" aria-live="polite"><small>PROOF / CONTEXT</small><strong>{highlight||"Select a skill"}</strong><p>{highlight?(activeProof.length?"Used in "+activeProof.join(", "):"Broader technical toolkit / no specific public project linked"):"Click any technology on the right to explore its context."}</p></div></div><div className="mv-skill-groups">{disciplines.map((g,i)=><div className="mv-skill-group mv-reveal" key={g.name}><div className="mv-skill-category"><span>{g.name}</span><p>{g.detail}</p></div><div className="mv-skill-tags">{g.skills.map(s=><button type="button" key={s} aria-pressed={highlight===s} className={highlight===s?"active":""} onClick={()=>setHighlight(highlight===s?null:s)}>{s}</button>)}</div></div>)}</div></div>
      </section>

      <section className="mv-about mv-section" id="about" aria-labelledby="about-title">
        <div className="mv-section-head mv-reveal"><span>04 / THE HUMAN PART</span><span>BEYOND THE SCREEN</span></div>
        <div className="mv-about-intro mv-reveal"><h2 id="about-title">Curious about <em>how things work.</em><br/>Obsessed with making them better.</h2><p>I’m a final-year Computer Science Engineering student at VIT Bhopal. I work across full-stack applications, backend development, AI systems and technical documentation. I’m interested in international and remote opportunities where thoughtful engineering meets real-world usefulness.</p></div>
        <div className="mv-about-grid"><div className="mv-education mv-reveal"><span className="mv-mini-label">EDUCATION</span><div className="mv-education-number">2023<span>—</span>27</div><h3>B.Tech — Computer Science & Engineering</h3><p>Vellore Institute of Technology (VIT), Bhopal University</p><div className="mv-education-bottom"><span>CGPA</span><b>8.3 / 10</b></div><div className="mv-coursework"><b>Relevant coursework</b><span>Data Structures & Algorithms · DBMS · Operating Systems · Computer Networks · Software Engineering · AI/ML · Cloud Computing</span></div></div><div className="mv-history mv-reveal"><span className="mv-mini-label">EXPERIENCE & LEADERSHIP</span>{experience.map((e,i)=><div className="mv-history-row" key={e.role}><span>0{i+1}</span><div><h3>{e.role}</h3><strong>{e.at}</strong><p>{e.description}</p></div><small>{e.year}</small></div>)}</div></div>
      </section>

      <section className="mv-credentials mv-section" id="credentials" aria-labelledby="credentials-title">
        <div className="mv-section-head mv-reveal"><span>05 / CERTIFICATIONS</span><span>ALL SIX CREDENTIALS</span></div>
        <div className="mv-credential-intro mv-reveal"><h2 id="credentials-title">Always<br/><em>learning.</em></h2><p>Verified courses and certifications across support, networking, AI and analytics. Every credential is retained.</p></div>
        <div className="mv-credential-rows">{certifications.map((c,i)=><a key={c.title} href={c.url} target="_blank" rel="noreferrer" className="mv-credential-row mv-reveal"><span>{String(i+1).padStart(2,"0")}</span><div><h3>{c.title}</h3><p>{c.issuer}</p></div><small>{c.issued}</small><ArrowUpRight size={23}/></a>)}</div>
        <div className="mv-achievements mv-reveal"><span>ALSO</span><p>500+ Google Cloud Skills Boost Arcade badges across cloud, data, security and generative AI tracks. GirlScript Summer of Code 2024 contributor.</p></div>
      </section>

      <section className="mv-contact" id="contact" aria-labelledby="contact-title">
        <div className="mv-contact-top"><span>06 / LET'S CONNECT</span><span>OPEN TO INTERNATIONAL OPPORTUNITIES</span></div>
        <div className="mv-contact-inner"><p>Have an opportunity, an idea, or a good technical question?</p><h2 id="contact-title">Let's make<br/><em>something real.</em></h2><a href="mailto:aahanaahir10@gmail.com" className="mv-contact-main">Start a conversation <ArrowUpRight size={30}/></a></div>
        <div className="mv-contact-links"><a href="mailto:aahanaahir10@gmail.com"><Mail size={18}/> Email <ArrowUpRight size={16}/></a><a href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer"><GitBranch size={18}/> GitHub <ArrowUpRight size={16}/></a><a href="https://www.linkedin.com/in/aahanaahir02/" target="_blank" rel="noreferrer">in LinkedIn <ArrowUpRight size={16}/></a><a href="tel:+918824690398">+91 8824690398 <ArrowUpRight size={16}/></a><Link href="/resume/"><Download size={18}/> Résumé <ArrowUpRight size={16}/></Link></div>
        <footer className="mv-footer"><span>© 2026 AAHANA AHIR</span><span>DESIGNED TO BE EXPLORED / BUILT TO BE USED</span><a href="#top">BACK TO TOP ↑</a></footer>
      </section>
    </main>
  </div>;
}
