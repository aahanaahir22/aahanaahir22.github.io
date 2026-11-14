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
    number: "001", slug: "freezoneb2b", shortName: "FreezoneB2B",
    title: "Global B2B Sourcing & Commerce Platform",
    tagline: "Trade infrastructure built around real product, supplier and business workflows.",
    status: "Deployed · Commercial rollout in progress", statusTone: "green",
    stack: ["Next.js", "React", "TypeScript", "Neon PostgreSQL", "Drizzle ORM", "Clerk", "Zod", "Vercel"],
    demoUrl: "https://freezoneb2b.vercel.app/",
    problem: "International sourcing often fragments supplier research, product discovery, quotations and business onboarding across disconnected tools.",
    solution: "Built a full-stack marketplace supporting verified-email buyer and supplier accounts, business onboarding, moderated product listings, RFQs, quotations, stock reservations and trade discovery. Public source references and demonstration products are always distinguished from approved seller stock.",
    principles: ["Validate commerce actions at the server boundary", "Separate researched leads from approved inventory", "Keep currency and fulfilment constraints clear", "Never imply payment success before confirmation"],
    evaluation: ["Finish live gateway onboarding and verified payment workflows", "Complete logistics/customs integrations", "Conduct authenticated end-to-end load tests", "Measure real conversion and onboarding usability"],
    architecture: [
      { label: "Presentation", detail: "Next.js / React with responsive marketplace search, listings, dashboards and checkout journeys." },
      { label: "Identity", detail: "Clerk verified-email authentication and persistent role-based business onboarding." },
      { label: "API", detail: "Server-side handlers with Zod validation and scoped authorization for supplier and buyer actions." },
      { label: "Data", detail: "Neon PostgreSQL and Drizzle ORM for offers, inventory, orders, business profiles and quotation state." },
      { label: "Discovery", detail: "Sourced company references and demonstrative variants are separated from genuine approved offers." },
      { label: "Commerce", detail: "RFQ/quotation comparison, server-calculated orders and inventory reservations; live payment release remains gated." }
    ],
    lifecycle: [
      { label: "Explore", detail: "Browse 2,873 sourced companies across 69 regions and 7,894 published range references. These are research entries, not onboarded sellers." },
      { label: "Join", detail: "Complete verified sign-in and persistent buyer or supplier business onboarding." },
      { label: "List", detail: "Submit offers with stock, pricing, MOQ and source details for business and product review." },
      { label: "Negotiate", detail: "Issue RFQs, compare quotations and review freight, taxes and terms." },
      { label: "Order", detail: "Produce server-calculated order records and stock reservations; real payments and delivery need further release verification." }
    ],
    decisions: [
      { title: "Relational commerce model", body: "PostgreSQL and Drizzle keep product, supplier, role and order states traceable and queryable." },
      { title: "Explicit data provenance", body: "Research leads, 600 demo variants and approved stock use distinct labels to prevent misleading buyers." },
      { title: "Authenticated service boundaries", body: "Verified identity, server-side role checks, validation and approval states protect sensitive transactions." },
      { title: "Evidence-led performance", body: "A query-service benchmark used 100,000 synthetic staging rows; it is not production throughput evidence." }
    ],
    measured: [
      { value: "2,873", label: "Sourced businesses", context: "Public directory research; not verified marketplace sellers." },
      { value: "69", label: "Countries / regions", context: "Source directory coverage, not active markets." },
      { value: "7,894", label: "Range references", context: "Public product/range references, not live inventory." },
      { value: "100k", label: "Staging test rows", context: "Synthetic records in an isolated catalogue-query benchmark." }
    ],
    next: ["Complete payment provider onboarding", "Integrate shipping and customs providers", "Conduct production security and load validation", "Onboard and verify genuine suppliers"],
    notice: "The product is deployed, but commercial onboarding is in progress. Payment and delivery are not yet certified. The directory and synthetic benchmarks are not evidence of customers, inventory or sales."
  },
] = [
  {
    number: "002",
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
    number: "003",
    slug: "integratex",
    shortName: "IntegrateX",
    title: "AI-Powered API Integration & Workflow Automation",
    tagline: "Natural language becomes a validated, observable and recoverable workflow.",
    status: "Completed",
    statusTone: "green",
    repositoryUrl: "https://github.com/aahanaahir22/integratex",
    demoUrl: "https://aahanaahir22.github.io/integratex/",
    notice: "Completed portfolio project. The hosted demo uses seeded data and safe simulated connectors; the FastAPI, PostgreSQL, Redis and Celery platform runs locally with Docker. Dashboard values are demonstrations, not measured benchmarks.",
    stack: ["React", "Python", "FastAPI", "PostgreSQL", "Redis", "Celery", "RAG", "Docker", "AWS"],
    problem: "Connecting CRM, email, payment, webhook and database systems repeatedly produces brittle integration logic and difficult-to-explain failures.",
    solution: "IntegrateX converts natural-language intent into typed, evidence-backed API workflows with schema validation, approval gates, retries, idempotency and traceable recovery. Its interactive Data Factory demonstrates the complete journey from intent to execution receipt.",
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
];
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
