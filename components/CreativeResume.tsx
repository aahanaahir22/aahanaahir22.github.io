"use client";

import { useEffect,useMemo,useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, ExternalLink, Globe2, Mail, Printer } from "lucide-react";
import { certifications, languageOptions, resumeContent, type ResumeLocale } from "@/data/resume";

const sectionExtras:Record<ResumeLocale,{commerce:string;support:string;download:string;site:string;languageLabel:string;allContent:string;certText:string}> = {
  en:{commerce:"Full-stack commerce",support:"IT support & networking",download:"Download ATS résumé (English)",site:"Portfolio",languageLabel:"View résumé in",allContent:"Complete résumé, translated",certText:"All credentials"},
  hi:{commerce:"फुल-स्टैक कॉमर्स",support:"आईटी सपोर्ट और नेटवर्किंग",download:"ATS रिज़्यूमे डाउनलोड करें (अंग्रेज़ी)",site:"पोर्टफोलियो",languageLabel:"रिज़्यूमे की भाषा",allContent:"पूरा रिज़्यूमे, अनुवाद सहित",certText:"सभी प्रमाणपत्र"},
  de:{commerce:"Full-Stack-Commerce",support:"IT-Support und Netzwerke",download:"ATS-Lebenslauf (Englisch) herunterladen",site:"Portfolio",languageLabel:"Lebenslauf auf",allContent:"Vollständiger, übersetzter Lebenslauf",certText:"Alle Zertifikate"},
  es:{commerce:"Comercio full-stack",support:"Soporte TI y redes",download:"Descargar CV ATS (inglés)",site:"Portafolio",languageLabel:"Ver currículum en",allContent:"Currículum completo traducido",certText:"Todas las certificaciones"},
  fr:{commerce:"Commerce full-stack",support:"Support informatique et réseaux",download:"Télécharger CV ATS (anglais)",site:"Portfolio",languageLabel:"Voir le CV en",allContent:"CV complet traduit",certText:"Toutes les certifications"},
  ja:{commerce:"フルスタックコマース",support:"ITサポート・ネットワーク",download:"ATS履歴書をダウンロード（英語）",site:"ポートフォリオ",languageLabel:"履歴書の言語",allContent:"翻訳された完全な履歴書",certText:"すべての認定資格"},
};
const addedSkills = [
  ["Next.js","React","TypeScript","JavaScript","Neon","Drizzle ORM","Clerk","Zod","Vercel"],
  ["TCP/IP","DNS","DHCP","HTTP/HTTPS","Network Troubleshooting","Windows Troubleshooting","Hardware/Software Diagnostics","System Configuration","End-User Support","Ticketing Fundamentals"]
];

export default function CreativeResume() {
  const [locale,setLocale]=useState<ResumeLocale>("en");
  const [initialized,setInitialized]=useState(false);
  const labels=sectionExtras[locale];
  const content=resumeContent[locale];
  const choice=useMemo(()=>languageOptions.find(o=>o.code===locale)!,[locale]);

  useEffect(()=>{
    const raw=new URLSearchParams(window.location.search).get("lang");
    const found=languageOptions.find(l=>l.code===raw);
    if(found)setLocale(found.code);
    setInitialized(true);
  },[]);
  useEffect(()=>{
    if(!initialized)return;
    document.documentElement.lang=locale;
    document.title=(locale==="en"?"Résumé":choice.nativeLabel+" · Résumé")+" — Aahana Ahir";
    return ()=>{document.documentElement.lang="en"};
  },[locale,choice.nativeLabel,initialized]);
  const pick=(l:ResumeLocale)=>{
    setLocale(l);
    const url=l==="en"?"/resume/":"/resume/?lang="+l;
    window.history.replaceState(null,"",url);
  };

  return <main className="mr-page" data-lang={locale}>
    <header className="mr-nav">
      <Link href="/" className="mr-back"><ArrowLeft size={17}/> {labels.site}</Link>
      <span className="mr-nav-title">A / A — INTERNATIONAL RÉSUMÉ</span>
      <a href="mailto:aahanaahir10@gmail.com" className="mr-nav-email"><Mail size={17}/> Contact</a>
    </header>

    <section className="mr-language-hero" aria-labelledby="mr-lang-title">
      <div className="mr-language-top"><span>01 / LANGUAGE SELECTOR</span><span>{labels.allContent}</span></div>
      <h1 id="mr-lang-title"><span>One résumé.</span><br/><em>Six languages.</em></h1>
      <div className="mr-language-prompt"><Globe2 size={18}/> {labels.languageLabel}</div>
      <div className="mr-language-options" role="group" aria-label="Choose résumé language">
        {languageOptions.map((l,i)=><button type="button" key={l.code} onClick={()=>pick(l.code)} aria-pressed={locale===l.code} className={locale===l.code?"is-active":""} lang={l.code}><small>{String(i+1).padStart(2,"0")}</small><span>{l.nativeLabel}</span><b>{l.code.toUpperCase()}</b></button>)}
      </div>
      <div className="mr-language-current" aria-live="polite"><span>CURRENT EDITION / {choice.label.toUpperCase()}</span><span>{choice.level}</span></div>
    </section>

    <div className="mr-paper" lang={locale} dir={content.direction||"ltr"}>
      <div className="mr-sheet-top"><div><span>A A / CURRICULUM VITAE</span><h2>Aahana<br/>Ahir<span>.</span></h2><p>{content.hero.role}</p></div><div className="mr-sheet-stamp"><span>{content.hero.kicker}</span><strong>{choice.glyph}</strong><small>{content.hero.availability}</small></div></div>
      <div className="mr-action-line">
        <div><a href="mailto:aahanaahir10@gmail.com">aahanaahir10@gmail.com <ArrowUpRight size={13}/></a><a href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer">github.com/aahanaahir22 <ArrowUpRight size={13}/></a><a href="https://www.linkedin.com/in/aahanaahir02/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13}/></a><span>India · +91 8824690398</span></div>
        <div className="mr-action-btns"><a href="/Aahana_Ahir_Resume_International_Impact_1_Page.pdf" download><Download size={16}/>{labels.download}</a><button onClick={()=>window.print()} type="button"><Printer size={16}/>{content.actions.print}</button></div>
      </div>
      <section className="mr-section mr-profile"><div className="mr-section-title"><span>01</span><h3>{content.labels.profile}</h3></div><div><p className="mr-summary">{content.summary}</p><div className="mr-facts">{content.facts.map(f=><div key={f.label}><span>{f.label}</span><strong>{f.value}</strong></div>)}</div></div></section>
      <section className="mr-section"><div className="mr-section-title"><span>02</span><h3>{content.labels.projects}</h3></div><div className="mr-list">{content.projects.map((p,i)=><article className="mr-project" key={p.name}><div className="mr-row-head"><span>0{i+1} / {p.status}</span>{p.demoUrl&&<a href={p.demoUrl} target="_blank" rel="noreferrer" aria-label={"Visit "+p.name}><ArrowUpRight size={20}/></a>}</div><h4>{p.name}</h4><p className="mr-project-subtitle">{p.title}</p><p>{p.summary}</p><div className="mr-skill-chips">{p.stack.map(skill=><span key={skill}>{skill}</span>)}</div>{p.repositoryUrl&&<a href={p.repositoryUrl} className="mr-link-inline" target="_blank" rel="noreferrer">{content.actions.repository} <ExternalLink size={12}/></a>}</article>)}</div></section>
      <section className="mr-section"><div className="mr-section-title"><span>03</span><h3>{content.labels.experience}</h3></div><div className="mr-list">{content.experience.map((e,i)=><article key={e.organization} className="mr-experience"><div><span>0{i+1}</span><small>{e.period}</small></div><div><h4>{e.role}</h4><strong>{e.organization}</strong><p>{e.location}</p><ul>{e.bullets.map(b=><li key={b}>{b}</li>)}</ul></div></article>)}</div></section>
      <section className="mr-section"><div className="mr-section-title"><span>04</span><h3>{content.labels.education}</h3></div><div><div className="mr-education"><span>{content.education.period}</span><h4>{content.education.degree}</h4><p>{content.education.institution}</p><strong>{content.labels.cgpa}: {content.education.cgpa}</strong></div><p className="mr-small-title">{content.labels.coursework}</p><div className="mr-skill-chips">{content.education.coursework.map(c=><span key={c}>{c}</span>)}</div></div></section>
      <section className="mr-section"><div className="mr-section-title"><span>05</span><h3>{content.labels.skills}</h3></div><div><div className="mr-skill-group-extra">{content.skillGroups.map(s=><div key={s.label}><h4>{s.label}</h4><div className="mr-skill-chips">{s.items.map(v=><span key={v}>{v}</span>)}</div></div>)}<div><h4>{labels.commerce}</h4><div className="mr-skill-chips">{addedSkills[0].map(v=><span key={v}>{v}</span>)}</div></div><div><h4>{labels.support}</h4><div className="mr-skill-chips">{addedSkills[1].map(v=><span key={v}>{v}</span>)}</div></div></div></div></section>
      <section className="mr-section"><div className="mr-section-title"><span>06</span><h3>{content.labels.credentials}</h3></div><div><p className="mr-small-title">{labels.certText}</p><div className="mr-certificate-list">{certifications.map((c,i)=><a href={c.url} target="_blank" rel="noreferrer" key={c.title}><span>{String(i+1).padStart(2,"0")}</span><strong>{c.title}</strong><small>{c.issuer}</small><ArrowUpRight size={17}/></a>)}</div></div></section>
      <section className="mr-section"><div className="mr-section-title"><span>07</span><h3>{content.labels.languages}</h3></div><div><p>{content.languageNote}</p><div className="mr-languages-line">{languageOptions.map(l=><span key={l.code}>{l.nativeLabel} <b>{l.level}</b></span>)}</div></div></section>
      <section className="mr-section mr-contact"><div className="mr-section-title"><span>08</span><h3>{content.labels.contact}</h3></div><div><a href="mailto:aahanaahir10@gmail.com">aahanaahir10@gmail.com <ArrowUpRight size={20}/></a><a href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={18}/></a><a href="https://www.linkedin.com/in/aahanaahir02/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={18}/></a><a href="tel:+918824690398">+91 8824690398</a></div></section>
      <footer className="mr-sheet-footer"><span>AAHANA AHIR / {choice.nativeLabel}</span><span>{content.footer}</span><Link href="/">← {labels.site}</Link></footer>
    </div>
  </main>;
}
