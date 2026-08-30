"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Globe2,
  Mail,
  MapPin,
  Printer,
  Sparkles,
} from "lucide-react";
import {
  certifications,
  languageOptions,
  resumeContent,
  type ResumeLocale,
} from "@/data/resume";

const isResumeLocale = (value: string | null): value is ResumeLocale =>
  languageOptions.some((language) => language.code === value);

export default function MultilingualResume() {
  const [locale, setLocale] = useState<ResumeLocale>("en");
  const content = resumeContent[locale];
  const language = useMemo(
    () => languageOptions.find((item) => item.code === locale) ?? languageOptions[0],
    [locale],
  );

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (isResumeLocale(requested)) setLocale(requested);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    return () => { document.documentElement.lang = "en"; };
  }, [locale]);

  const chooseLanguage = (nextLocale: ResumeLocale) => {
    setLocale(nextLocale);
    const nextUrl = nextLocale === "en" ? "/resume" : `/resume?lang=${nextLocale}`;
    window.history.replaceState(null, "", nextUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="resume-shell" data-theme={language.theme} dir={content.direction ?? "ltr"}>
      <div className="resume-aurora" aria-hidden="true" />
      <div className="resume-noise" aria-hidden="true" />

      <header className="resume-nav">
        <Link href="/" className="resume-back"><ArrowLeft size={16} /> {content.actions.portfolio}</Link>
        <div className="resume-wordmark"><b>AAHANA AHIR</b><span> / MULTILINGUAL CV</span></div>
        <button type="button" className="resume-print" onClick={() => window.print()}><Printer size={16} /> {content.actions.print}</button>
      </header>

      <section className="resume-language-dock" aria-label={content.actions.selectLanguage}>
        <div className="resume-language-dock-copy">
          <Globe2 size={17} />
          <span>{content.actions.selectLanguage}</span>
        </div>
        <div className="resume-language-tabs" role="tablist" aria-label={content.actions.selectLanguage}>
          {languageOptions.map((option) => (
            <button
              type="button"
              role="tab"
              aria-selected={locale === option.code}
              className={locale === option.code ? "is-active" : ""}
              key={option.code}
              onClick={() => chooseLanguage(option.code)}
            >
              <span>{option.glyph}</span>
              <b>{option.nativeLabel}</b>
              <small>{option.level}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="resume-hero">
        <div className="resume-hero-copy">
          <p className="resume-kicker"><Sparkles size={14} /> {content.hero.kicker}</p>
          <h1><span>Aahana</span><span>Ahir</span></h1>
          <p className="resume-role">{content.hero.role}</p>
          <p className="resume-availability">{content.hero.availability}</p>
          <div className="resume-contact-strip">
            <a href="mailto:aahanaahir10@gmail.com"><Mail size={15} /> aahanaahir10@gmail.com</a>
            <a href="https://github.com/aahanaahir22" target="_blank" rel="noreferrer"><GitBranch size={15} /> github.com/aahanaahir22</a>
            <span><MapPin size={15} /> India</span>
          </div>
        </div>

        <div className="resume-visual" aria-hidden="true">
          <div className="resume-visual-grid" />
          <div className="resume-visual-ring ring-a" />
          <div className="resume-visual-ring ring-b" />
          <div className="resume-visual-ring ring-c" />
          <div className="resume-visual-core"><span>{language.glyph}</span><i /></div>
          <span className="resume-visual-label label-one">{language.nativeLabel}</span>
          <span className="resume-visual-label label-two">{language.level}</span>
          <span className="resume-visual-label label-three">SYSTEM / {language.code.toUpperCase()}</span>
        </div>
      </section>

      <section className="resume-profile resume-block">
        <div className="resume-section-title"><span>01</span><h2>{content.labels.profile}</h2></div>
        <div className="resume-profile-content">
          <p>{content.summary}</p>
          <div className="resume-fact-grid">
            {content.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><b>{fact.value}</b></div>)}
          </div>
        </div>
      </section>

      <section className="resume-block">
        <div className="resume-section-title"><span>02</span><h2>{content.labels.experience}</h2></div>
        <div className="resume-timeline">
          {content.experience.map((entry) => (
            <article key={`${entry.organization}-${entry.period}`}>
              <div className="resume-time"><span>{entry.period}</span><i /></div>
              <div className="resume-entry-heading"><p>{entry.location}</p><h3>{entry.organization}</h3><h4>{entry.role}</h4></div>
              <ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-block">
        <div className="resume-section-title"><span>03</span><h2>{content.labels.projects}</h2></div>
        <div className="resume-project-grid">
          {content.projects.map((project, index) => (
            <article key={project.name} className={project.demoUrl ? "is-featured" : ""}>
              <div className="resume-project-index">0{index + 1}</div>
              <p className="resume-project-status">{project.status}</p>
              <h3>{project.name}</h3>
              <h4>{project.title}</h4>
              <p>{project.summary}</p>
              <div className="resume-project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              {(project.repositoryUrl || project.demoUrl) && (
                <div className="resume-project-links">
                  {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer"><GitBranch size={14} /> {content.actions.repository}<ExternalLink size={12} /></a>}
                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer"><Sparkles size={14} /> {content.actions.demo}<ExternalLink size={12} /></a>}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="resume-dual resume-block">
        <div className="resume-education-panel">
          <div className="resume-section-title"><span>04</span><h2>{content.labels.education}</h2></div>
          <p className="resume-university">{content.education.institution}</p>
          <h3>{content.education.degree}</h3>
          <div className="resume-education-meta"><span>{content.education.period}</span><b>{content.labels.cgpa} / {content.education.cgpa}</b></div>
          <p className="resume-subtitle">{content.labels.coursework}</p>
          <div className="resume-coursework">{content.education.coursework.map((course) => <span key={course}>{course}</span>)}</div>
        </div>

        <div className="resume-skills-panel">
          <div className="resume-section-title"><span>05</span><h2>{content.labels.skills}</h2></div>
          <div className="resume-skill-groups">
            {content.skillGroups.map((group) => <div key={group.label}><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></div>)}
          </div>
        </div>
      </section>

      <section className="resume-block">
        <div className="resume-section-title"><span>06</span><h2>{content.labels.credentials}</h2></div>
        <div className="resume-credential-list">
          {certifications.map((certificate, index) => (
            <a href={certificate.url} target="_blank" rel="noreferrer" key={certificate.title}>
              <span>0{index + 1}</span>
              <div><h3>{certificate.title}</h3><p>{certificate.issuer} · {content.labels.issued} {certificate.issued}</p></div>
              <ExternalLink size={15} />
            </a>
          ))}
        </div>
      </section>

      <section className="resume-languages resume-block">
        <div className="resume-section-title"><span>07</span><h2>{content.labels.languages}</h2></div>
        <p className="resume-language-note">{content.languageNote}</p>
        <div className="resume-language-matrix">
          {languageOptions.map((option) => (
            <button type="button" key={option.code} onClick={() => chooseLanguage(option.code)} className={locale === option.code ? "is-current" : ""}>
              <span>{option.glyph}</span><div><b>{option.nativeLabel}</b><small>{option.label} · {option.level}</small></div>
            </button>
          ))}
        </div>
      </section>

      <footer className="resume-footer">
        <div><p>{content.labels.contact}</p><a href="mailto:aahanaahir10@gmail.com">aahanaahir10@gmail.com</a></div>
        <p>{content.footer}</p>
        <button type="button" onClick={() => window.print()}><Printer size={15} /> {content.actions.print}</button>
      </footer>
    </main>
  );
}
