// Service detail pages. Power /services/[slug], the sitemap, and FAQ schema.

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  code: string; // matches the stylised title on /services (e.g. AI_AUTOMATION)
  title: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  intro: string[];
  deliverables: { label: string; description: string }[];
  process: string[];
  faqs: ServiceFaq[];
}

export const services: ServiceDetail[] = [
  {
    slug: "ai-automation",
    code: "AI_AUTOMATION",
    title: "AI Automation & LLM Integration",
    metaTitle: "AI Automation Agency — Custom LLM Integration & Workflow Automation",
    metaDescription:
      "Codeeee Labs builds custom AI automation for businesses in the US, UK, Canada, and Europe: LLM integration, intelligent document processing, AI agents, and workflow automation that pays for itself.",
    tagline: "Neural workflow engines that remove the repetitive 40% of your team's week.",
    intro: [
      "Most companies don't need 'an AI strategy' — they need ten specific, repetitive workflows automated. Reading inbound emails and routing them. Extracting data from invoices and PDFs. Drafting first-pass responses, reports, and quotes. Answering the same fifty customer questions. These are exactly the tasks modern large language models handle reliably when they're engineered into your systems properly, with guardrails, rather than bolted on as a chatbot.",
      "We build production AI systems for clients across the United States, United Kingdom, Canada, Europe, and the Gulf: custom LLM integrations using models from Anthropic and OpenAI, retrieval pipelines over your own documents and data (RAG), AI agents that operate your internal tools, and intelligent document processing that turns unstructured paperwork into structured records. Every system ships with evaluation suites, fallbacks for when the model is uncertain, and cost controls — because an AI feature that hallucinates or burns budget is worse than no AI feature.",
    ],
    deliverables: [
      { label: "LLM_INTEGRATION", description: "Custom integration of Claude, GPT, and open-weight models into your product or back office — prompt engineering, evaluation, and cost optimisation included." },
      { label: "RAG_PIPELINES", description: "Retrieval-augmented generation over your documents, knowledge bases, and databases, so answers come from your data, not the model's imagination." },
      { label: "AI_AGENTS", description: "Autonomous and semi-autonomous agents that use your internal tools — triaging tickets, updating records, preparing drafts for human approval." },
      { label: "DOCUMENT_INTELLIGENCE", description: "Automated extraction from invoices, contracts, bills of lading, and forms — PDFs and scans in, clean structured data out." },
    ],
    process: [
      "Workflow audit — we map where your team's hours actually go and rank automation candidates by ROI",
      "Pilot build — one workflow automated end-to-end in 2–4 weeks, measured against a baseline",
      "Hardening — evaluation suites, edge-case handling, human-in-the-loop controls, cost ceilings",
      "Rollout & expansion — deploy, train your team, and move down the ranked list",
    ],
    faqs: [
      {
        question: "Which AI models do you work with?",
        answer:
          "We work with Anthropic's Claude models, OpenAI's GPT models, and open-weight models (Llama, Mistral) when data must stay on your infrastructure. We're model-agnostic: we benchmark candidates against your actual workload and recommend based on accuracy, latency, and cost — not vendor loyalty.",
      },
      {
        question: "Is our company data safe when using LLMs?",
        answer:
          "Yes, when architected correctly. We use API tiers where your data is not used for model training, redact sensitive fields before they reach any third party, and can deploy open-weight models entirely within your own cloud for regulated workloads. For European clients we design pipelines with GDPR data-residency requirements in mind from day one.",
      },
      {
        question: "How much does an AI automation project cost?",
        answer:
          "A focused pilot — one workflow automated end-to-end — typically lands in the $5,000–$15,000 range and ships in two to four weeks. Larger multi-workflow programmes are scoped after the pilot proves ROI. Because our engineering team is based in Karachi, these figures are typically 40–60% below equivalent US or UK agency quotes for the same scope.",
      },
      {
        question: "Do you build AI chatbots?",
        answer:
          "Only when a chatbot is actually the right interface. Many 'chatbot' requests are better served by automation that works invisibly — auto-drafted replies, auto-routed tickets, auto-filled records. When a conversational interface is right (customer support, internal knowledge access), we build it with retrieval over your real documentation so it answers accurately or escalates to a human.",
      },
      {
        question: "Can you work with our existing software and tools?",
        answer:
          "That's the default assumption. AI automation only delivers value when it plugs into the systems you already run — your CRM, helpdesk, ERP, spreadsheets, and email. We integrate via official APIs wherever they exist and build reliable bridges where they don't.",
      },
    ],
  },
  {
    slug: "web-applications",
    code: "WEBAPP_SYSTEMS",
    title: "Web Application & SaaS Development",
    metaTitle: "Custom Web Application Development — SaaS & Enterprise Systems",
    metaDescription:
      "Custom web application and SaaS development for startups and SMEs in the US, UK, Canada, and Europe. Next.js, Node.js, PostgreSQL — senior engineering at offshore rates from Codeeee Labs.",
    tagline: "Scalable enterprise logic and SaaS platforms, engineered to survive success.",
    intro: [
      "We design and build full-stack web applications: multi-tenant SaaS platforms, internal operations systems, customer portals, marketplaces, and the custom tools that off-the-shelf software can't be bent into. Our standard stack — Next.js, TypeScript, Node.js, and PostgreSQL — is chosen for longevity: it's what a future in-house team can hire for easily, in any market.",
      "Clients in the US, UK, Canada, and Europe typically come to us in one of two situations: a startup that needs to go from validated idea to production platform without a Bay Area budget, or an established business drowning in spreadsheets that needs real software built around its actual workflow. In both cases the engagement is the same — senior engineers, your repository, your infrastructure, working software every week.",
    ],
    deliverables: [
      { label: "SAAS_PLATFORMS", description: "Multi-tenant architecture, subscription billing, team accounts, and admin planes — the full anatomy of a commercial software product." },
      { label: "INTERNAL_SYSTEMS", description: "Operations dashboards, approval workflows, and data pipelines that replace spreadsheet chaos with a single source of truth." },
      { label: "CUSTOMER_PORTALS", description: "Secure client-facing portals for orders, documents, statements, and support — the self-service layer your customers expect." },
      { label: "API_ENGINEERING", description: "Well-documented REST and GraphQL APIs, third-party integrations, and the plumbing between your systems." },
    ],
    process: [
      "Discovery sprint — workflows, data model, and a scoped roadmap with honest estimates",
      "Weekly shipping — working software in a staging environment every week, not a big reveal at the end",
      "Production launch — managed deployment, monitoring, and a documented handover",
      "Ongoing partnership — retained development capacity, or a clean handoff to your in-house team",
    ],
    faqs: [
      {
        question: "How do you work with clients in US, UK, and European time zones?",
        answer:
          "Karachi sits at UTC+5, which overlaps the European workday by four to six hours and US East Coast mornings by two to three. Standups and demos are scheduled inside that overlap; deep development work happens in your off-hours, so progress appears overnight. All communication runs through Slack, with weekly demo calls and a shared task board — you always know exactly what's in flight.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do, unambiguously and from the first commit. All work lives in your own GitHub organization, contracts assign full intellectual property to you, and there is no proprietary framework lock-in — any competent team can take over the codebase, which is precisely what makes clients stay by choice rather than necessity.",
      },
      {
        question: "How much does a custom web application cost?",
        answer:
          "A focused MVP typically runs $15,000–$40,000 over two to four months; a full multi-tenant SaaS platform usually lands between $40,000 and $120,000 depending on scope. The same scope quoted by a US or UK agency commonly costs two to three times more. We provide fixed-scope quotes after a discovery sprint, so the number you sign is the number you pay.",
      },
      {
        question: "What technology stack do you use?",
        answer:
          "TypeScript end to end: Next.js and React on the frontend, Node.js on the backend, PostgreSQL for data, Redis where caching matters, and deployment on AWS or Vercel. We choose boring, hireable, battle-tested technology deliberately — your platform should outlive any single vendor, including us.",
      },
      {
        question: "Can you take over or rescue an existing project?",
        answer:
          "Yes — rescues are a significant share of our work. We start with a paid code audit that gives you an honest written assessment of what exists, what's salvageable, and what it will take to ship. Sometimes the answer is 'six weeks of fixes', sometimes it's 'rebuild the backend, keep the frontend'. You get the truth either way, and the audit report is yours regardless of whether we continue.",
      },
    ],
  },
  {
    slug: "mobile-apps",
    code: "MOBILE_APPS",
    title: "Mobile App Development — iOS & Android",
    metaTitle: "Mobile App Development Agency — Native iOS, Android & Cross-Platform",
    metaDescription:
      "Mobile app development for clients in the US, UK, Canada, and Europe: native iOS and Android, React Native cross-platform, and progressive web apps — from Codeeee Labs, Karachi.",
    tagline: "Immersive native experiences for iOS and Android — or one codebase that covers both.",
    intro: [
      "We build mobile applications across the full strategy spectrum: fully native iOS and Android when performance and platform depth demand it, React Native when one codebase should cover both stores, and progressive web apps when the app store itself is the obstacle. The first conversation we have with every client is which of these actually fits — because the wrong platform choice is the most expensive mistake in mobile, and it's made before a single line of code.",
      "For startups and businesses in North America, the UK, and Europe, we deliver the entire lifecycle: product design, development, App Store and Play Store submission (including the review-process battle scars), analytics, crash monitoring, and the ongoing releases that keep an app alive after launch.",
    ],
    deliverables: [
      { label: "NATIVE_DEVELOPMENT", description: "Swift and Kotlin applications for experiences that demand full platform power — graphics, hardware access, background processing." },
      { label: "CROSS_PLATFORM", description: "React Native apps sharing one codebase across iOS and Android, cutting build and maintenance cost roughly in half." },
      { label: "PROGRESSIVE_WEB_APPS", description: "Installable, offline-capable web apps that skip the app stores entirely — ideal for internal tools and rapid distribution." },
      { label: "LAUNCH_AND_BEYOND", description: "Store submission, review compliance, analytics, crash monitoring, and a release cadence that keeps ratings healthy." },
    ],
    process: [
      "Platform strategy — native vs cross-platform vs PWA, decided on evidence, not fashion",
      "Design & prototype — clickable prototype validated with real users before full development",
      "Build & beta — TestFlight / Play Console beta tracks with weekly builds",
      "Launch & iterate — store submission, monitoring, and data-driven release cycles",
    ],
    faqs: [
      {
        question: "Native, React Native, or PWA — which should we choose?",
        answer:
          "Default to React Native when you need both stores on a constrained budget; go native when the app leans on heavy graphics, deep hardware integration, or platform-specific UX; choose a PWA when distribution speed matters more than store presence — internal tools and B2B utilities especially. We'll tell you honestly which fits, including when the cheapest option is the right one.",
      },
      {
        question: "How much does mobile app development cost?",
        answer:
          "A focused single-purpose app typically runs $10,000–$25,000; a full-featured product with accounts, payments, and a backend usually lands between $25,000 and $80,000. Cross-platform development keeps you at the lower end by sharing one codebase. These figures are generally 40–60% below equivalent quotes from US, UK, or Western European agencies.",
      },
      {
        question: "Do you handle App Store and Google Play submission?",
        answer:
          "Yes, end to end — store listings, screenshots, privacy declarations, review compliance, and the inevitable back-and-forth with Apple's review team. We've shipped through rejections and know the guidelines well enough to avoid most of them in advance.",
      },
      {
        question: "Do you build the backend too?",
        answer:
          "Almost every serious mobile app is half backend — accounts, sync, push notifications, payments. We build the full system: the API in Node.js/TypeScript with PostgreSQL, the mobile clients, and the infrastructure they run on, so there's one accountable team instead of a seam between two vendors.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Mobile apps decay without maintenance — OS updates break things, store policies change, users find edge cases. We offer monthly maintenance retainers covering updates, monitoring, and small improvements, or a documented handover if you're taking it in-house. Either way, you're not stranded at version 1.0.",
      },
    ],
  },
  {
    slug: "custom-crm",
    code: "CUSTOM_CRMS",
    title: "Custom CRM & Business Management Systems",
    metaTitle: "Custom CRM Development — Bespoke Business Management Software",
    metaDescription:
      "Custom CRM and business management systems built around your actual workflow — for SMEs in the US, UK, Canada, and Europe that have outgrown spreadsheets and off-the-shelf software. Codeeee Labs.",
    tagline: "A data-driven management core, built around how your business actually works.",
    intro: [
      "Off-the-shelf CRMs are built for an average company that doesn't exist. If your business runs on workflows that Salesforce or HubSpot can only approximate — logistics operations with multi-reference tracking, agencies with project-based billing, distributors with credit cycles and route plans — you end up paying enterprise licensing fees to fight your own software. A custom CRM inverts that: the system is shaped around your operation, your vocabulary, and your reports.",
      "We've built management systems for logistics, trading, services, and retail businesses serving clients across the US, UK, Europe, and the Gulf. The pattern is consistent: a business that runs on spreadsheets and memory gets a single system where every customer, job, and payment lives — and the owner finally sees the whole company on one screen.",
    ],
    deliverables: [
      { label: "OPERATIONS_CORE", description: "Customers, jobs, orders, and pipelines modelled on your actual workflow — not a template's idea of it." },
      { label: "FINANCE_LAYER", description: "Invoicing, payment tracking, receivables aging, and per-job profitability — computed from real data, not month-end guesswork." },
      { label: "ROLES_AND_AUDIT", description: "Role-based access so staff see only what they should, with a full audit trail of who changed what, when." },
      { label: "REPORTS_AND_DASHBOARDS", description: "The owner's dashboard: cash position, outstanding balances, team performance, and the numbers you check every morning." },
    ],
    process: [
      "Workflow mapping — we sit with your team (remotely or on-site) and document how work actually flows",
      "Data model & prototype — the system's skeleton, validated against real scenarios before full build",
      "Phased rollout — core modules first, with your team using the system while we build the rest",
      "Data migration & training — your spreadsheet history imported, your staff trained, no big-bang cutover",
    ],
    faqs: [
      {
        question: "Why build a custom CRM instead of using Salesforce or HubSpot?",
        answer:
          "If a mainstream CRM fits your workflow, use it — we'll tell you so in the first call. Custom wins when your operation has domain-specific structure (shipments, projects, batches, routes) that generic pipelines can't model, or when per-seat licensing for your team exceeds the cost of owning software outright. Most of our CRM clients tried an off-the-shelf product first and hit exactly those walls.",
      },
      {
        question: "How long does a custom CRM take to build?",
        answer:
          "A core system — customers, jobs, invoicing, and reports — typically ships in eight to twelve weeks, with further modules phased in while your team is already using it. We deliberately avoid year-long big-bang projects: you should be getting value from the system within the first quarter.",
      },
      {
        question: "Can you migrate our existing spreadsheets and data?",
        answer:
          "Yes — data migration is a standard phase of every CRM project. We import your spreadsheet history, clean duplicates and inconsistencies in the process, and reconcile totals with your team before cutover so nothing is lost and nobody re-types anything.",
      },
      {
        question: "What does a custom CRM cost compared to SaaS licensing?",
        answer:
          "A typical build runs $15,000–$50,000 depending on scope. Compare that with a 15-person team on an enterprise CRM tier at $100+ per seat per month — roughly $18,000+ every year, forever, for software that still doesn't fit. Custom systems usually reach break-even against licensing within one to two years, and you own the asset.",
      },
      {
        question: "Will our non-technical staff be able to use it?",
        answer:
          "That's the design constraint everything else bends around. Your fastest data-entry person sets the bar: screens are built for keyboard-speed entry, search works across every reference number your team actually uses, and we train staff during the phased rollout. Software that operations teams hate gets abandoned — so we build for them, not for the demo.",
      },
    ],
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
