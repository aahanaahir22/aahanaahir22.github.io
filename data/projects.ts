export type Project = {
  number: string;
  slug: string;
  shortName: string;
  title: string;
  tagline: string;
  status: string;
  statusTone: "amber" | "green" | "violet";
  stack: string[];
  problem: string;
  solution: string;
  principles: string[];
  evaluation: string[];
  architecture: { label: string; detail: string }[];
  lifecycle: { label: string; detail: string }[];
  decisions: { title: string; body: string }[];
  next: string[];
  notice?: string;
  measured?: { value: string; label: string; context: string }[];
  repositoryUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    number: "001",
    slug: "opsassist-ai",
    shortName: "OpsAssist AI",
    title: "Evidence-Backed Incident Diagnosis & Resolution",
    tagline: "From noisy operational signals to an explainable, approval-gated response.",
    status: "Live Demo · Active Development",
    statusTone: "green",
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "FAISS", "LLM API", "Docker", "AWS"],
    repositoryUrl: "https://github.com/aahanaahir22/opsassist-ai",
    demoUrl: "https://aahanaahir22.github.io/opsassist-ai/",
    problem: "Production incident response is slowed by fragmented logs, alerts, runbooks and advice that is difficult to verify.",
    solution: "OpsAssist AI is a deployed incident-intelligence demonstration that groups operational signals, retrieves runbook evidence and presents diagnoses with visible confidence, citations and human control. The public interface connects to a live Python API and PostgreSQL.",
    principles: ["Evidence before recommendation", "Human approval for sensitive actions", "Trace every system decision", "Confirm observed outcomes only"],
    evaluation: ["Diagnostic precision", "Evidence coverage", "API latency", "Approval-policy compliance", "Recommendation traceability"],
    architecture: [
      { label: "Observe", detail: "REST ingestion receives logs and health events." },
      { label: "Correlate", detail: "Related failures become one incident timeline." },
      { label: "Retrieve", detail: "FAISS searches only approved runbook evidence." },
      { label: "Diagnose", detail: "The LLM drafts a cited, uncertainty-aware explanation." },
      { label: "Approve", detail: "Sensitive remediation stops at a human gate." },
      { label: "Audit", detail: "Inputs, evidence, decisions and outcomes are recorded." },
    ],
    lifecycle: [
      { label: "126 signals arrive", detail: "Service errors and database timeouts enter through a versioned event contract." },
      { label: "One incident emerges", detail: "Temporal and service metadata connect related events without hiding raw evidence." },
      { label: "Runbooks are searched", detail: "Metadata filters constrain retrieval to the correct service, environment and approval state." },
      { label: "A diagnosis is proposed", detail: "The explanation contains evidence IDs, uncertainty and reversible next steps." },
      { label: "A human stays in control", detail: "High-impact actions require explicit approval; the system never implies an unobserved success." },
    ],
    decisions: [
      { title: "FAISS for bounded retrieval", body: "A local vector index keeps the prototype reproducible while the evidence contract remains portable." },
      { title: "PostgreSQL for the audit spine", body: "Relational records make incidents, approvals and evidence references queryable and testable." },
      { title: "Typed FastAPI boundaries", body: "Explicit request and response models reduce ambiguous integrations across the dashboard and workers." },
    ],
    next: ["Add production-grade OAuth/RBAC and tenant isolation", "Expand persistent embedding and retrieval evaluation", "Connect a production LLM provider to the typed workflow", "Broaden end-to-end, resilience and security testing"],
    notice: "The public demo connects to a live Python backend and PostgreSQL. Remediation runs only against a synthetic simulator—not real customer infrastructure.",
  },
  {
    number: "002",
    slug: "integratex",
    shortName: "IntegrateX",
    title: "AI-Powered API Integration & Workflow Automation",
    tagline: "Natural language becomes a validated, observable and recoverable workflow.",
    status: "In Development",
    statusTone: "amber",
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "RAG", "Docker", "AWS"],
    problem: "Connecting CRM, email, payment, webhook and database systems repeatedly produces brittle integration logic and difficult-to-explain failures.",
    solution: "IntegrateX is being designed as a natural-language-to-workflow engine that translates intent into validated API steps with retries, idempotency and traceable execution.",
    principles: ["Validate before execution", "Make retries safe", "Explain partial failure", "Preserve workflow state"],
    evaluation: ["Workflow success rate", "End-to-end latency", "Partial-failure recovery", "Execution traceability", "Validation accuracy"],
    architecture: [
      { label: "Intent", detail: "A user describes the cross-service outcome." },
      { label: "Ground", detail: "RAG retrieves the relevant API schemas and constraints." },
      { label: "Plan", detail: "The request becomes typed, reviewable workflow steps." },
      { label: "Queue", detail: "Celery workers execute durable tasks through Redis." },
      { label: "Recover", detail: "Idempotency and retry policies contain partial failures." },
      { label: "Explain", detail: "Every step exposes inputs, outputs and failure reasons." },
    ],
    lifecycle: [
      { label: "Describe an outcome", detail: "For example: create a CRM lead, send a welcome email and record a payment link." },
      { label: "Resolve connectors", detail: "The planner matches each operation to a documented API capability." },
      { label: "Validate the graph", detail: "Types, required fields, permissions and step dependencies are checked." },
      { label: "Execute durably", detail: "Workers persist state so interrupted workflows can resume safely." },
      { label: "Explain the result", detail: "A visual trace separates completed, retried, blocked and failed operations." },
    ],
    decisions: [
      { title: "Redis + Celery for durable work", body: "Longer-running connectors need background execution, retries and observable task state." },
      { title: "Schemas as a safety boundary", body: "The planner is constrained by connector contracts instead of inventing unsupported calls." },
      { title: "Idempotency by design", body: "Retrying must not duplicate emails, payments or records when a downstream response is ambiguous." },
    ],
    next: ["Ship connector SDK", "Implement visual workflow trace", "Create failure-injection suite", "Benchmark multi-step recovery"],
  },
  {
    number: "003",
    slug: "healthbridge",
    shortName: "HealthBridge",
    title: "Care, Connected",
    tagline: "A responsive healthcare discovery and booking prototype focused on clarity.",
    status: "Completed Prototype",
    statusTone: "green",
    stack: ["HTML", "CSS", "JavaScript", "Responsive UI", "Form Validation"],
    problem: "Healthcare discovery, booking and medicine flows can become fragmented and difficult to navigate on smaller screens.",
    solution: "HealthBridge brings doctor discovery, appointment booking, medicine delivery and administrative views into one responsive front-end prototype.",
    principles: ["Mobile-first readability", "Clear form feedback", "Consistent task flow", "Honest simulated data"],
    evaluation: ["Responsive behavior", "Form-validation coverage", "Task-flow clarity", "Local prototype load time"],
    architecture: [
      { label: "Discover", detail: "Responsive browsing surfaces doctors and services." },
      { label: "Select", detail: "A visitor chooses a care path and time." },
      { label: "Validate", detail: "Client-side rules prevent incomplete form submission." },
      { label: "Confirm", detail: "A simulated confirmation makes the prototype state explicit." },
      { label: "Admin", detail: "A dashboard organizes representative booking data." },
    ],
    lifecycle: [
      { label: "Find a doctor", detail: "Browse representative profiles through a responsive discovery interface." },
      { label: "Book an appointment", detail: "Complete a guided form with visible validation and confirmation states." },
      { label: "Explore medicine delivery", detail: "Move through a simulated ordering flow without implying real fulfilment." },
      { label: "Review operations", detail: "The admin prototype demonstrates how bookings could be organized." },
    ],
    decisions: [
      { title: "Progressive enhancement", body: "The core structure remains readable while JavaScript adds validation and interface state." },
      { title: "Responsive from the first layout", body: "Navigation, forms and panels are composed for touch before expanding to desktop." },
      { title: "Prototype boundaries are visible", body: "Representative records and confirmations are identified as simulated data." },
    ],
    next: ["Connect a real backend", "Add authenticated user roles", "Run formal usability testing", "Add end-to-end tests"],
    notice: "This is a completed front-end prototype. Its healthcare data, bookings and fulfilment states are simulated.",
    measured: [{ value: "<1.4s", label: "Local page load", context: "Observed in the prototype environment; not a production benchmark." }],
  },
  {
    number: "004",
    slug: "suicide-prevention-microservice",
    shortName: "Suicide Prevention Microservice",
    title: "Ethical Research Prototype",
    tagline: "Privacy-aware signal classification with deliberate human review boundaries.",
    status: "Ethical Research Prototype",
    statusTone: "violet",
    stack: ["Go", "Kafka", "Python", "BERT", "Redis", "Twilio"],
    problem: "Research into early-risk signals must balance timely analysis with privacy, false-positive risk and the danger of treating a model output as a clinical judgment.",
    solution: "This research prototype explores anonymized streaming ingestion, BERT-based risk classification, minimized location data and controlled alert routing with explicit human-review safeguards.",
    principles: ["Not a clinical diagnosis", "Minimize personal data", "Human review before intervention", "Measure false-positive harm"],
    evaluation: ["Prototype classification accuracy", "Prototype alert latency", "False-positive analysis", "Privacy-control coverage", "Human-review compliance"],
    architecture: [
      { label: "Ingest", detail: "Public research data enters a bounded stream." },
      { label: "Minimize", detail: "Identifiers and unnecessary geo-data are removed." },
      { label: "Classify", detail: "A BERT research model produces a calibrated risk score." },
      { label: "Review", detail: "High-risk signals enter controlled human review." },
      { label: "Route", detail: "Only reviewed cases reach a simulated alert channel." },
      { label: "Audit", detail: "Safeguard decisions and model limitations stay visible." },
    ],
    lifecycle: [
      { label: "Bounded research stream", detail: "The experiment operates on a prototype dataset, not private platform surveillance." },
      { label: "Privacy filtering", detail: "Direct identifiers are removed and location precision is minimized." },
      { label: "Risk classification", detail: "The model estimates a research label while uncertainty remains explicit." },
      { label: "Human review", detail: "A score alone never represents diagnosis or authorizes an intervention." },
      { label: "Controlled routing", detail: "The simulated notification path is measured without claiming clinical deployment." },
    ],
    decisions: [
      { title: "Human review is structural", body: "Review is a required system state, not a disclaimer added after classification." },
      { title: "Data minimization before inference", body: "The pipeline removes unnecessary identity and location fields before they reach the model." },
      { title: "Accuracy is not safety", body: "Aggregate accuracy is reported alongside the need for false-positive, bias and calibration analysis." },
    ],
    next: ["Run subgroup and calibration analysis", "Formalize reviewer protocol", "Threat-model data handling", "Seek domain-expert evaluation"],
    notice: "Research prototype only. It is not a clinical diagnosis system, crisis service or replacement for professional emergency support.",
    measured: [
      { value: "87%", label: "Prototype accuracy", context: "Reported on a 50,000-post prototype dataset; requires fuller error and bias analysis." },
      { value: "0.4s", label: "Prototype alert latency", context: "Observed in the prototype pipeline; not a clinical response-time claim." },
    ],
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
