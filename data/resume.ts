export type ResumeLocale = "en" | "hi" | "de" | "es" | "fr" | "ja";

export type LanguageOption = {
  code: ResumeLocale;
  label: string;
  nativeLabel: string;
  proficiency: string;
  level: string;
  glyph: string;
  theme: string;
};

export const languageOptions: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", proficiency: "Fluent", level: "Fluent", glyph: "EN", theme: "cosmic" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", proficiency: "Native", level: "मातृभाषा", glyph: "अ", theme: "surya" },
  { code: "de", label: "German", nativeLabel: "Deutsch", proficiency: "Intermediate", level: "Mittelstufe / B1", glyph: "DE", theme: "bauhaus" },
  { code: "es", label: "Spanish", nativeLabel: "Español", proficiency: "Intermediate", level: "Intermedio / B1", glyph: "Ñ", theme: "solar" },
  { code: "fr", label: "French", nativeLabel: "Français", proficiency: "Basic", level: "Élémentaire / A2", glyph: "FR", theme: "lumiere" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", proficiency: "Basic", level: "初級 / A2", glyph: "語", theme: "indigo" },
];

export type ResumeEntry = {
  period: string;
  organization: string;
  role: string;
  location: string;
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  title: string;
  status: string;
  summary: string;
  stack: string[];
  repositoryUrl?: string;
  demoUrl?: string;
};

export type ResumeContent = {
  direction?: "ltr" | "rtl";
  hero: { kicker: string; role: string; availability: string };
  actions: { portfolio: string; print: string; repository: string; demo: string; selectLanguage: string };
  labels: {
    profile: string;
    experience: string;
    projects: string;
    education: string;
    skills: string;
    credentials: string;
    languages: string;
    contact: string;
    issued: string;
    coursework: string;
    cgpa: string;
  };
  summary: string;
  facts: { label: string; value: string }[];
  experience: ResumeEntry[];
  projects: ResumeProject[];
  education: {
    institution: string;
    degree: string;
    period: string;
    cgpa: string;
    coursework: string[];
  };
  skillGroups: { label: string; items: string[] }[];
  languageNote: string;
  footer: string;
};

const sharedProjects = {
  opsassist: {
    name: "OpsAssist AI",
    stack: ["Python", "FastAPI", "PostgreSQL", "FAISS", "React", "Docker"],
    repositoryUrl: "https://github.com/aahanaahir22/opsassist-ai",
    demoUrl: "https://aahanaahir22.github.io/opsassist-ai/",
  },
  integratex: { name: "IntegrateX", stack: ["Python", "FastAPI", "Redis", "Celery", "RAG"] },
  healthbridge: { name: "HealthBridge", stack: ["HTML", "CSS", "JavaScript", "Responsive UI"] },
  prevention: { name: "Suicide Prevention Microservice", stack: ["Go", "Kafka", "Python", "BERT", "Redis"] },
};

export const certifications = [
  { title: "Google IT Support Certificate", issuer: "Google", issued: "Mar 2026", url: "https://www.credly.com/badges/285c98dd-27a8-4841-86a7-1eb9ee7a640b/linked_in_profile" },
  { title: "The Bits and Bytes of Computer Networking", issuer: "Google", issued: "Nov 2025", url: "https://www.coursera.org/account/accomplishments/verify/YNSCCNS6GJNX" },
  { title: "AWS Educate Introduction to Generative AI", issuer: "Amazon Web Services", issued: "Jul 2025", url: "https://www.credly.com/badges/c1388cdc-f0ce-4c41-829f-3b5a68cf6d28/linked_in_profile" },
  { title: "GEN AI Using IBM Watsonx", issuer: "IBM", issued: "Jun 2025", url: "https://courses.adroitprolearn.skillsnetwork.site/certificates/d8f15675eb49481fa8c64848731b16da" },
  { title: "Introduction to Machine Learning", issuer: "NPTEL / IIT Madras", issued: "Jan–Apr 2025", url: "/certificates/nptel-introduction-to-machine-learning.pdf" },
  { title: "Google Analytics Certification", issuer: "Google Digital Academy", issued: "Oct 2024", url: "https://skillshop.credential.net/4be459ff-f634-460f-bbb5-92f0660f9fc4" },
] as const;

export const resumeContent: Record<ResumeLocale, ResumeContent> = {
  en: {
    hero: {
      kicker: "SOFTWARE · AI/ML · CLOUD SYSTEMS",
      role: "Computer Science Engineer building explainable intelligent systems",
      availability: "Open to international, remote, internship and entry-level opportunities",
    },
    actions: { portfolio: "Back to portfolio", print: "Print / Save PDF", repository: "Repository", demo: "Live demo", selectLanguage: "Select résumé language" },
    labels: { profile: "Profile", experience: "Experience", projects: "Selected projects", education: "Education", skills: "Technical capabilities", credentials: "Verified credentials", languages: "Languages", contact: "Contact", issued: "Issued", coursework: "Relevant coursework", cgpa: "CGPA" },
    summary: "Final-year B.Tech Computer Science and Engineering student focused on Python, AI/ML, backend APIs and cloud-ready software. I build evidence-aware systems with typed boundaries, explainable decisions, human approval and honest evaluation.",
    facts: [
      { label: "Location", value: "India" },
      { label: "Graduation", value: "2027" },
      { label: "Target roles", value: "Python · AI/ML · Software · Solutions" },
    ],
    experience: [
      { period: "2024", organization: "GirlScript Summer of Code", role: "Open Source Contributor", location: "Remote", bullets: ["Investigated reported issues and reproduced defects in existing repositories.", "Contributed Python features, bug fixes and documentation through pull-request workflows.", "Incorporated maintainer feedback and improved setup usability and maintainability."] },
      { period: "Current", organization: "Independent Technical Projects", role: "Project Lead & Technical Documentation Author", location: "India", bullets: ["Lead planning across frontend, API, data, retrieval, testing, safety and deployment workstreams.", "Define milestones, integration responsibilities, architecture and reproducible setup documentation.", "Translate complex system behavior into evidence, limitations and recruiter-verifiable demonstrations."] },
      { period: "Campus", organization: "Microsoft Technical Club", role: "Core Team Member", location: "VIT Bhopal University", bullets: ["Help plan technical workshops, peer-learning sessions and student project showcases.", "Coordinate technical content, documentation and cross-team communication."] },
    ],
    projects: [
      { ...sharedProjects.opsassist, title: "Evidence-Backed Incident Diagnosis & Resolution", status: "Live demo · Active development", summary: "A deployed incident-intelligence demonstration with a FastAPI backend, PostgreSQL, anomaly analysis, cited runbook retrieval and approval-gated synthetic remediation." },
      { ...sharedProjects.integratex, title: "AI-Powered API Integration & Workflow Automation", status: "Active development", summary: "A natural-language-to-workflow system designed around typed API steps, validation, idempotency, retries and observable execution." },
      { ...sharedProjects.healthbridge, title: "Responsive Healthcare Discovery Prototype", status: "Completed prototype", summary: "A mobile-first interface joining doctor discovery, appointment booking, medicine flows and representative administrative views." },
      { ...sharedProjects.prevention, title: "Privacy-Aware Ethical Research Prototype", status: "Research prototype", summary: "A bounded research system exploring anonymized streams, BERT-based classification and mandatory human-review safeguards; not a clinical tool." },
    ],
    education: { institution: "VIT Bhopal University", degree: "B.Tech in Computer Science and Engineering", period: "2023–2027 · Final year", cgpa: "8.3 / 10", coursework: ["Data Structures & Algorithms", "Database Management Systems", "Operating Systems", "Computer Networks", "Software Engineering", "Artificial Intelligence & Machine Learning", "Cloud Computing"] },
    skillGroups: [
      { label: "Languages", items: ["Python", "Java", "SQL"] },
      { label: "Backend", items: ["FastAPI", "Flask", "REST APIs", "Pydantic", "SQLAlchemy"] },
      { label: "AI / ML", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS"] },
      { label: "Data", items: ["PostgreSQL", "MySQL", "SQLite", "Redis"] },
      { label: "Cloud & delivery", items: ["AWS", "Docker", "Git", "GitHub", "Postman"] },
      { label: "Design", items: ["Figma", "Canva", "Adobe Express"] },
    ],
    languageNote: "Professional communication across English and Hindi, with growing working proficiency in German, Spanish, French and Japanese.",
    footer: "Built around evidence, explainability and human control.",
  },

  hi: {
    hero: {
      kicker: "सॉफ्टवेयर · एआई/एमएल · क्लाउड सिस्टम",
      role: "व्याख्यायोग्य इंटेलिजेंट सिस्टम बनाने वाली कंप्यूटर साइंस इंजीनियर",
      availability: "अंतरराष्ट्रीय, रिमोट, इंटर्नशिप और एंट्री-लेवल अवसरों के लिए उपलब्ध",
    },
    actions: { portfolio: "पोर्टफोलियो पर वापस", print: "प्रिंट / PDF सेव करें", repository: "रिपॉज़िटरी", demo: "लाइव डेमो", selectLanguage: "रिज़्यूमे की भाषा चुनें" },
    labels: { profile: "परिचय", experience: "अनुभव", projects: "चयनित प्रोजेक्ट", education: "शिक्षा", skills: "तकनीकी क्षमताएँ", credentials: "सत्यापित प्रमाणपत्र", languages: "भाषाएँ", contact: "संपर्क", issued: "जारी", coursework: "प्रमुख पाठ्यक्रम", cgpa: "सीजीपीए" },
    summary: "मैं अंतिम वर्ष की बी.टेक कंप्यूटर साइंस एवं इंजीनियरिंग छात्रा हूँ और Python, AI/ML, बैकएंड API तथा क्लाउड-रेडी सॉफ्टवेयर पर केंद्रित हूँ। मैं टाइप्ड सीमाओं, स्पष्ट निर्णयों, मानवीय स्वीकृति और ईमानदार मूल्यांकन वाले प्रमाण-आधारित सिस्टम बनाती हूँ।",
    facts: [
      { label: "स्थान", value: "भारत" },
      { label: "स्नातक वर्ष", value: "2027" },
      { label: "लक्षित भूमिकाएँ", value: "Python · AI/ML · Software · Solutions" },
    ],
    experience: [
      { period: "2024", organization: "GirlScript Summer of Code", role: "ओपन-सोर्स योगदानकर्ता", location: "रिमोट", bullets: ["रिपोर्ट की गई समस्याओं की जाँच कर मौजूदा रिपॉज़िटरी में त्रुटियों को पुनः उत्पन्न किया।", "Pull-request workflow के माध्यम से Python फीचर, बग फिक्स और दस्तावेज़ीकरण में योगदान दिया।", "मेंटेनर की समीक्षा को लागू कर सेटअप की उपयोगिता और कोड की रखरखाव क्षमता सुधारी।"] },
      { period: "वर्तमान", organization: "स्वतंत्र तकनीकी प्रोजेक्ट", role: "प्रोजेक्ट लीड एवं तकनीकी दस्तावेज़ लेखिका", location: "भारत", bullets: ["Frontend, API, data, retrieval, testing, safety और deployment workstreams की योजना का नेतृत्व किया।", "Milestones, integration responsibilities, architecture और reproducible setup documentation निर्धारित किया।", "जटिल सिस्टम व्यवहार को प्रमाण, सीमाओं और recruiter-verifiable demonstrations में बदला।"] },
      { period: "कैंपस", organization: "Microsoft Technical Club", role: "कोर टीम सदस्य", location: "VIT Bhopal University", bullets: ["तकनीकी workshops, peer-learning sessions और student project showcases की योजना में सहयोग किया।", "तकनीकी सामग्री, दस्तावेज़ीकरण और cross-team communication का समन्वय किया।"] },
    ],
    projects: [
      { ...sharedProjects.opsassist, title: "प्रमाण-आधारित घटना निदान एवं समाधान", status: "लाइव डेमो · सक्रिय विकास", summary: "FastAPI backend, PostgreSQL, anomaly analysis, cited runbook retrieval और approval-gated synthetic remediation वाला deployed incident-intelligence demonstration।" },
      { ...sharedProjects.integratex, title: "AI-संचालित API Integration एवं Workflow Automation", status: "सक्रिय विकास", summary: "Typed API steps, validation, idempotency, retries और observable execution पर आधारित natural-language-to-workflow system।" },
      { ...sharedProjects.healthbridge, title: "Responsive Healthcare Discovery Prototype", status: "पूर्ण प्रोटोटाइप", summary: "Doctor discovery, appointment booking, medicine flows और representative administrative views को जोड़ने वाला mobile-first interface।" },
      { ...sharedProjects.prevention, title: "गोपनीयता-सचेत नैतिक शोध प्रोटोटाइप", status: "शोध प्रोटोटाइप", summary: "Anonymized streams, BERT classification और अनिवार्य human review पर केंद्रित सीमित शोध सिस्टम; यह clinical tool नहीं है।" },
    ],
    education: { institution: "VIT Bhopal University", degree: "बी.टेक — कंप्यूटर साइंस एवं इंजीनियरिंग", period: "2023–2027 · अंतिम वर्ष", cgpa: "8.3 / 10", coursework: ["डेटा स्ट्रक्चर एवं एल्गोरिदम", "डेटाबेस मैनेजमेंट सिस्टम", "ऑपरेटिंग सिस्टम", "कंप्यूटर नेटवर्क", "सॉफ्टवेयर इंजीनियरिंग", "आर्टिफिशियल इंटेलिजेंस एवं मशीन लर्निंग", "क्लाउड कंप्यूटिंग"] },
    skillGroups: [
      { label: "प्रोग्रामिंग भाषाएँ", items: ["Python", "Java", "SQL"] },
      { label: "बैकएंड", items: ["FastAPI", "Flask", "REST APIs", "Pydantic", "SQLAlchemy"] },
      { label: "एआई / एमएल", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS"] },
      { label: "डेटा", items: ["PostgreSQL", "MySQL", "SQLite", "Redis"] },
      { label: "क्लाउड एवं डिलीवरी", items: ["AWS", "Docker", "Git", "GitHub", "Postman"] },
      { label: "डिज़ाइन", items: ["Figma", "Canva", "Adobe Express"] },
    ],
    languageNote: "अंग्रेज़ी और हिन्दी में पेशेवर संवाद, साथ ही जर्मन, स्पैनिश, फ़्रेंच और जापानी में बढ़ती कार्यशील दक्षता।",
    footer: "प्रमाण, व्याख्यायोग्यता और मानवीय नियंत्रण पर आधारित।",
  },

  de: {
    hero: {
      kicker: "SOFTWARE · KI/ML · CLOUD-SYSTEME",
      role: "Informatikingenieurin für erklärbare intelligente Systeme",
      availability: "Offen für internationale, Remote-, Praktikums- und Einstiegspositionen",
    },
    actions: { portfolio: "Zurück zum Portfolio", print: "Drucken / PDF speichern", repository: "Repository", demo: "Live-Demo", selectLanguage: "Lebenslaufsprache wählen" },
    labels: { profile: "Profil", experience: "Erfahrung", projects: "Ausgewählte Projekte", education: "Ausbildung", skills: "Technische Kompetenzen", credentials: "Verifizierte Zertifikate", languages: "Sprachen", contact: "Kontakt", issued: "Ausgestellt", coursework: "Relevante Studienfächer", cgpa: "CGPA" },
    summary: "Informatikstudentin im letzten B.Tech-Studienjahr mit Schwerpunkt auf Python, KI/ML, Backend-APIs und cloudfähiger Software. Ich entwickle evidenzbasierte Systeme mit typisierten Schnittstellen, nachvollziehbaren Entscheidungen, menschlicher Freigabe und ehrlicher Evaluation.",
    facts: [
      { label: "Standort", value: "Indien" },
      { label: "Abschluss", value: "2027" },
      { label: "Zielrollen", value: "Python · KI/ML · Software · Solutions" },
    ],
    experience: [
      { period: "2024", organization: "GirlScript Summer of Code", role: "Open-Source-Contributorin", location: "Remote", bullets: ["Gemeldete Probleme untersucht und Fehler in bestehenden Repositories reproduziert.", "Python-Funktionen, Fehlerbehebungen und Dokumentation über Pull-Request-Workflows beigetragen.", "Maintainer-Feedback umgesetzt und Einrichtung sowie Wartbarkeit verbessert."] },
      { period: "Aktuell", organization: "Unabhängige technische Projekte", role: "Projektleitung & technische Dokumentation", location: "Indien", bullets: ["Planung für Frontend, API, Daten, Retrieval, Tests, Sicherheit und Deployment geleitet.", "Meilensteine, Integrationsverantwortung, Architektur und reproduzierbare Einrichtung definiert.", "Komplexes Systemverhalten in überprüfbare Evidenz, Grenzen und Demonstrationen übersetzt."] },
      { period: "Campus", organization: "Microsoft Technical Club", role: "Mitglied des Kernteams", location: "VIT Bhopal University", bullets: ["Technische Workshops, Peer-Learning-Sessions und Projektpräsentationen mitgeplant.", "Technische Inhalte, Dokumentation und teamübergreifende Kommunikation koordiniert."] },
    ],
    projects: [
      { ...sharedProjects.opsassist, title: "Evidenzbasierte Störungsdiagnose und -behebung", status: "Live-Demo · Aktive Entwicklung", summary: "Eine bereitgestellte Incident-Intelligence-Demo mit FastAPI, PostgreSQL, Anomalieanalyse, zitierter Runbook-Suche und freigabegesteuerter synthetischer Behebung." },
      { ...sharedProjects.integratex, title: "KI-gestützte API-Integration und Workflow-Automatisierung", status: "Aktive Entwicklung", summary: "Ein Natural-Language-to-Workflow-System mit typisierten API-Schritten, Validierung, Idempotenz, Wiederholungen und beobachtbarer Ausführung." },
      { ...sharedProjects.healthbridge, title: "Responsiver Healthcare-Discovery-Prototyp", status: "Abgeschlossener Prototyp", summary: "Eine Mobile-First-Oberfläche für Arztsuche, Terminbuchung, Medikamentenabläufe und repräsentative Verwaltungsansichten." },
      { ...sharedProjects.prevention, title: "Datenschutzbewusster ethischer Forschungsprototyp", status: "Forschungsprototyp", summary: "Ein begrenztes Forschungssystem zu anonymisierten Datenströmen, BERT-Klassifikation und verpflichtender menschlicher Prüfung; kein klinisches Werkzeug." },
    ],
    education: { institution: "VIT Bhopal University", degree: "B.Tech in Informatik und Ingenieurwesen", period: "2023–2027 · Abschlussjahr", cgpa: "8,3 / 10", coursework: ["Datenstrukturen & Algorithmen", "Datenbanksysteme", "Betriebssysteme", "Computernetzwerke", "Software Engineering", "Künstliche Intelligenz & Machine Learning", "Cloud Computing"] },
    skillGroups: [
      { label: "Programmiersprachen", items: ["Python", "Java", "SQL"] },
      { label: "Backend", items: ["FastAPI", "Flask", "REST APIs", "Pydantic", "SQLAlchemy"] },
      { label: "KI / ML", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS"] },
      { label: "Daten", items: ["PostgreSQL", "MySQL", "SQLite", "Redis"] },
      { label: "Cloud & Delivery", items: ["AWS", "Docker", "Git", "GitHub", "Postman"] },
      { label: "Design", items: ["Figma", "Canva", "Adobe Express"] },
    ],
    languageNote: "Professionelle Kommunikation auf Englisch und Hindi sowie wachsende Arbeitskenntnisse in Deutsch, Spanisch, Französisch und Japanisch.",
    footer: "Entwickelt rund um Evidenz, Erklärbarkeit und menschliche Kontrolle.",
  },

  es: {
    hero: {
      kicker: "SOFTWARE · IA/ML · SISTEMAS CLOUD",
      role: "Ingeniera informática que crea sistemas inteligentes explicables",
      availability: "Disponible para oportunidades internacionales, remotas, prácticas y puestos de entrada",
    },
    actions: { portfolio: "Volver al portafolio", print: "Imprimir / Guardar PDF", repository: "Repositorio", demo: "Demo en vivo", selectLanguage: "Seleccionar idioma del currículum" },
    labels: { profile: "Perfil", experience: "Experiencia", projects: "Proyectos seleccionados", education: "Educación", skills: "Capacidades técnicas", credentials: "Credenciales verificadas", languages: "Idiomas", contact: "Contacto", issued: "Emitido", coursework: "Asignaturas relevantes", cgpa: "CGPA" },
    summary: "Estudiante de último año de B.Tech en Informática e Ingeniería, centrada en Python, IA/ML, APIs backend y software preparado para la nube. Desarrollo sistemas basados en evidencia con límites tipados, decisiones explicables, aprobación humana y evaluación honesta.",
    facts: [
      { label: "Ubicación", value: "India" },
      { label: "Graduación", value: "2027" },
      { label: "Roles objetivo", value: "Python · IA/ML · Software · Solutions" },
    ],
    experience: [
      { period: "2024", organization: "GirlScript Summer of Code", role: "Colaboradora de código abierto", location: "Remoto", bullets: ["Investigué incidencias reportadas y reproduje defectos en repositorios existentes.", "Contribuí funciones de Python, correcciones y documentación mediante pull requests.", "Incorporé comentarios de mantenedores y mejoré la configuración y mantenibilidad."] },
      { period: "Actual", organization: "Proyectos técnicos independientes", role: "Líder de proyecto y autora de documentación técnica", location: "India", bullets: ["Dirijo la planificación de frontend, API, datos, recuperación, pruebas, seguridad y despliegue.", "Defino hitos, responsabilidades de integración, arquitectura y configuración reproducible.", "Convierto comportamientos complejos en evidencia, limitaciones y demostraciones verificables."] },
      { period: "Campus", organization: "Microsoft Technical Club", role: "Miembro del equipo central", location: "VIT Bhopal University", bullets: ["Colaboro en talleres técnicos, sesiones de aprendizaje entre pares y muestras de proyectos.", "Coordino contenido técnico, documentación y comunicación entre equipos."] },
    ],
    projects: [
      { ...sharedProjects.opsassist, title: "Diagnóstico y resolución de incidentes con evidencia", status: "Demo en vivo · Desarrollo activo", summary: "Demostración desplegada de inteligencia de incidentes con FastAPI, PostgreSQL, análisis de anomalías, recuperación de runbooks citados y remediación sintética con aprobación." },
      { ...sharedProjects.integratex, title: "Integración de APIs y automatización de flujos con IA", status: "Desarrollo activo", summary: "Sistema de lenguaje natural a workflows con pasos API tipados, validación, idempotencia, reintentos y ejecución observable." },
      { ...sharedProjects.healthbridge, title: "Prototipo responsivo de descubrimiento sanitario", status: "Prototipo completado", summary: "Interfaz mobile-first que integra búsqueda de médicos, citas, flujos de medicamentos y vistas administrativas representativas." },
      { ...sharedProjects.prevention, title: "Prototipo ético de investigación con privacidad", status: "Prototipo de investigación", summary: "Sistema de investigación limitado sobre flujos anonimizados, clasificación BERT y revisión humana obligatoria; no es una herramienta clínica." },
    ],
    education: { institution: "VIT Bhopal University", degree: "B.Tech en Informática e Ingeniería", period: "2023–2027 · Último año", cgpa: "8,3 / 10", coursework: ["Estructuras de datos y algoritmos", "Sistemas de bases de datos", "Sistemas operativos", "Redes informáticas", "Ingeniería de software", "Inteligencia artificial y machine learning", "Cloud computing"] },
    skillGroups: [
      { label: "Lenguajes", items: ["Python", "Java", "SQL"] },
      { label: "Backend", items: ["FastAPI", "Flask", "REST APIs", "Pydantic", "SQLAlchemy"] },
      { label: "IA / ML", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS"] },
      { label: "Datos", items: ["PostgreSQL", "MySQL", "SQLite", "Redis"] },
      { label: "Cloud y entrega", items: ["AWS", "Docker", "Git", "GitHub", "Postman"] },
      { label: "Diseño", items: ["Figma", "Canva", "Adobe Express"] },
    ],
    languageNote: "Comunicación profesional en inglés e hindi, con competencia de trabajo creciente en alemán, español, francés y japonés.",
    footer: "Construido alrededor de evidencia, explicabilidad y control humano.",
  },

  fr: {
    hero: {
      kicker: "LOGICIEL · IA/ML · SYSTÈMES CLOUD",
      role: "Ingénieure informatique créant des systèmes intelligents explicables",
      availability: "Ouverte aux opportunités internationales, à distance, en stage et junior",
    },
    actions: { portfolio: "Retour au portfolio", print: "Imprimer / Enregistrer en PDF", repository: "Dépôt", demo: "Démo en direct", selectLanguage: "Choisir la langue du CV" },
    labels: { profile: "Profil", experience: "Expérience", projects: "Projets sélectionnés", education: "Formation", skills: "Compétences techniques", credentials: "Certifications vérifiées", languages: "Langues", contact: "Contact", issued: "Délivré", coursework: "Cours pertinents", cgpa: "CGPA" },
    summary: "Étudiante en dernière année de B.Tech en informatique et ingénierie, spécialisée en Python, IA/ML, API backend et logiciels prêts pour le cloud. Je conçois des systèmes fondés sur des preuves, avec interfaces typées, décisions explicables, validation humaine et évaluation honnête.",
    facts: [
      { label: "Localisation", value: "Inde" },
      { label: "Diplôme prévu", value: "2027" },
      { label: "Postes ciblés", value: "Python · IA/ML · Software · Solutions" },
    ],
    experience: [
      { period: "2024", organization: "GirlScript Summer of Code", role: "Contributrice open source", location: "À distance", bullets: ["Analyse des problèmes signalés et reproduction des défauts dans des dépôts existants.", "Contribution de fonctionnalités Python, corrections et documentation via des pull requests.", "Intégration des retours des mainteneurs et amélioration de l’installation et de la maintenabilité."] },
      { period: "Actuel", organization: "Projets techniques indépendants", role: "Cheffe de projet et rédactrice technique", location: "Inde", bullets: ["Pilotage de la planification frontend, API, données, retrieval, tests, sécurité et déploiement.", "Définition des jalons, responsabilités d’intégration, architecture et installation reproductible.", "Transformation de comportements complexes en preuves, limites et démonstrations vérifiables."] },
      { period: "Campus", organization: "Microsoft Technical Club", role: "Membre de l’équipe principale", location: "VIT Bhopal University", bullets: ["Participation à l’organisation d’ateliers, de sessions d’apprentissage et de présentations de projets.", "Coordination du contenu technique, de la documentation et de la communication inter-équipes."] },
    ],
    projects: [
      { ...sharedProjects.opsassist, title: "Diagnostic et résolution d’incidents fondés sur les preuves", status: "Démo en direct · Développement actif", summary: "Démonstration déployée d’intelligence d’incident avec FastAPI, PostgreSQL, analyse d’anomalies, runbooks cités et remédiation synthétique soumise à approbation." },
      { ...sharedProjects.integratex, title: "Intégration d’API et automatisation de workflows par IA", status: "Développement actif", summary: "Système transformant le langage naturel en workflow avec étapes API typées, validation, idempotence, nouvelles tentatives et exécution observable." },
      { ...sharedProjects.healthbridge, title: "Prototype responsive de découverte de soins", status: "Prototype terminé", summary: "Interface mobile-first réunissant recherche de médecins, rendez-vous, parcours de médicaments et vues administratives représentatives." },
      { ...sharedProjects.prevention, title: "Prototype de recherche éthique et respectueux de la vie privée", status: "Prototype de recherche", summary: "Système de recherche limité sur des flux anonymisés, la classification BERT et la revue humaine obligatoire ; ce n’est pas un outil clinique." },
    ],
    education: { institution: "VIT Bhopal University", degree: "B.Tech en informatique et ingénierie", period: "2023–2027 · Dernière année", cgpa: "8,3 / 10", coursework: ["Structures de données et algorithmes", "Systèmes de bases de données", "Systèmes d’exploitation", "Réseaux informatiques", "Génie logiciel", "Intelligence artificielle et machine learning", "Cloud computing"] },
    skillGroups: [
      { label: "Langages", items: ["Python", "Java", "SQL"] },
      { label: "Backend", items: ["FastAPI", "Flask", "REST APIs", "Pydantic", "SQLAlchemy"] },
      { label: "IA / ML", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS"] },
      { label: "Données", items: ["PostgreSQL", "MySQL", "SQLite", "Redis"] },
      { label: "Cloud et livraison", items: ["AWS", "Docker", "Git", "GitHub", "Postman"] },
      { label: "Design", items: ["Figma", "Canva", "Adobe Express"] },
    ],
    languageNote: "Communication professionnelle en anglais et en hindi, avec des compétences croissantes en allemand, espagnol, français et japonais.",
    footer: "Conçu autour des preuves, de l’explicabilité et du contrôle humain.",
  },

  ja: {
    hero: {
      kicker: "ソフトウェア・AI/ML・クラウドシステム",
      role: "説明可能なインテリジェントシステムを構築するコンピュータサイエンスエンジニア",
      availability: "海外・リモート・インターン・新卒ポジションを希望",
    },
    actions: { portfolio: "ポートフォリオへ戻る", print: "印刷 / PDF保存", repository: "リポジトリ", demo: "ライブデモ", selectLanguage: "履歴書の言語を選択" },
    labels: { profile: "プロフィール", experience: "経験", projects: "主なプロジェクト", education: "学歴", skills: "技術スキル", credentials: "認定資格", languages: "言語", contact: "連絡先", issued: "取得", coursework: "主な履修科目", cgpa: "CGPA" },
    summary: "コンピュータサイエンス工学を専攻するB.Tech最終学年の学生です。Python、AI/ML、バックエンドAPI、クラウド対応ソフトウェアに注力しています。型安全な境界、説明可能な判断、人による承認、誠実な評価を備えたエビデンス重視のシステムを開発しています。",
    facts: [
      { label: "所在地", value: "インド" },
      { label: "卒業予定", value: "2027年" },
      { label: "希望職種", value: "Python・AI/ML・Software・Solutions" },
    ],
    experience: [
      { period: "2024", organization: "GirlScript Summer of Code", role: "オープンソースコントリビューター", location: "リモート", bullets: ["報告された問題を調査し、既存リポジトリの不具合を再現しました。", "Pull Requestを通じてPython機能、バグ修正、ドキュメントに貢献しました。", "メンテナーのフィードバックを反映し、セットアップと保守性を改善しました。"] },
      { period: "現在", organization: "個人技術プロジェクト", role: "プロジェクトリード・技術文書作成", location: "インド", bullets: ["フロントエンド、API、データ、検索、テスト、安全性、デプロイの計画を主導しています。", "マイルストーン、統合責任、アーキテクチャ、再現可能なセットアップを定義しています。", "複雑なシステム動作を、検証可能な証拠・制約・デモとして表現しています。"] },
      { period: "学内", organization: "Microsoft Technical Club", role: "コアチームメンバー", location: "VIT Bhopal University", bullets: ["技術ワークショップ、ピアラーニング、学生プロジェクト展示の企画を支援しました。", "技術コンテンツ、文書、チーム間コミュニケーションを調整しました。"] },
    ],
    projects: [
      { ...sharedProjects.opsassist, title: "エビデンスに基づくインシデント診断・解決", status: "ライブデモ・開発中", summary: "FastAPI、PostgreSQL、異常分析、引用付きRunbook検索、承認制の合成修復を備えたデプロイ済みインシデントインテリジェンスデモです。" },
      { ...sharedProjects.integratex, title: "AIによるAPI統合・ワークフロー自動化", status: "開発中", summary: "型付きAPIステップ、検証、冪等性、再試行、観測可能な実行を備えた自然言語からワークフローへのシステムです。" },
      { ...sharedProjects.healthbridge, title: "レスポンシブ医療検索プロトタイプ", status: "完成プロトタイプ", summary: "医師検索、予約、医薬品フロー、管理画面を統合したモバイルファーストのインターフェースです。" },
      { ...sharedProjects.prevention, title: "プライバシーに配慮した倫理的研究プロトタイプ", status: "研究プロトタイプ", summary: "匿名化ストリーム、BERT分類、必須の人間レビューを検討する限定的な研究システムです。臨床ツールではありません。" },
    ],
    education: { institution: "VIT Bhopal University", degree: "B.Tech コンピュータサイエンス工学", period: "2023–2027・最終学年", cgpa: "8.3 / 10", coursework: ["データ構造とアルゴリズム", "データベース管理システム", "オペレーティングシステム", "コンピュータネットワーク", "ソフトウェア工学", "人工知能・機械学習", "クラウドコンピューティング"] },
    skillGroups: [
      { label: "プログラミング言語", items: ["Python", "Java", "SQL"] },
      { label: "バックエンド", items: ["FastAPI", "Flask", "REST APIs", "Pydantic", "SQLAlchemy"] },
      { label: "AI / ML", items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "LLMs", "RAG", "FAISS"] },
      { label: "データ", items: ["PostgreSQL", "MySQL", "SQLite", "Redis"] },
      { label: "クラウド・デリバリー", items: ["AWS", "Docker", "Git", "GitHub", "Postman"] },
      { label: "デザイン", items: ["Figma", "Canva", "Adobe Express"] },
    ],
    languageNote: "英語とヒンディー語で専門的なコミュニケーションが可能です。ドイツ語、スペイン語、フランス語、日本語も継続して学習しています。",
    footer: "エビデンス、説明可能性、人によるコントロールを中心に設計しています。",
  },
};
