// Long-form case studies. These power /case-studies, /case-studies/[slug],
// the sitemap, and the portfolio card links. Pure data — no JSX — so they can
// be imported from server components and route handlers alike.

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  testimonial?: { quote: string; attribution: string };
  title: string;
  client: string;
  category: string;
  region: string;
  summary: string;
  metaDescription: string;
  tech: string[];
  date: string; // ISO, used in Article schema
  results: string[];
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "aether-interface-webgl-experience",
    testimonial: { quote: "Every agency promised us 'something different'. This is the first team that actually shipped it — and it loads faster than our old static site.", attribution: "Creative Director, design studio — Europe" },
    title: "AETHER_INTERFACE — Real-Time WebGL Brand Experience for a European Design Studio",
    client: "European design studio (under NDA)",
    category: "WEBGL / IMMERSIVE",
    region: "Europe",
    summary:
      "A high-fidelity 3D web experience with real-time glass refraction and physics-based rendering, built to make a design studio's portfolio unforgettable — without sacrificing load time.",
    metaDescription:
      "How Codeeee Labs built a real-time WebGL brand experience with glass refraction and physics-based rendering for a European design studio — Three.js, React Three Fiber, GLSL.",
    tech: ["Three.js", "React Three Fiber", "GLSL", "Next.js", "Vercel"],
    date: "2026-01-15",
    results: [
      "Average session time increased from 40 seconds to over 3 minutes after launch",
      "Runs at 60fps on desktop and degrades gracefully to a tuned low-power mode on mobile GPUs",
      "First contentful paint under 1.5 seconds despite a full 3D scene, via progressive asset streaming",
    ],
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "A design studio in Europe approached us with a familiar problem: their work was exceptional, but their website looked like everyone else's. In a market where clients in Berlin, Amsterdam, and London evaluate ten agencies before a first call, the website is the pitch. They wanted an experience that proved their design ambition the moment the page loaded — true real-time 3D, not a looping video pretending to be one.",
          "The hard constraint was performance. Immersive WebGL sites are notorious for ten-second load times and melted laptop fans. The studio's analytics showed 60% of traffic on mid-range hardware, so the experience had to scale down as gracefully as it scaled up.",
        ],
      },
      {
        heading: "What We Built",
        paragraphs: [
          "We engineered a fully real-time scene in Three.js and React Three Fiber: massive typographic forms refracted through a physically-based glass material, with chromatic aberration and pointer-driven camera physics written in custom GLSL. Nothing is pre-rendered — every frame is computed live in the browser.",
          "Performance was treated as a feature, not an afterthought. Assets stream progressively so text and navigation are interactive before the 3D scene finishes loading. A device-capability check selects between quality tiers: full transmission materials with 16-sample refraction on capable GPUs, and a visually faithful low-power variant on mobile. The result is a site that feels extravagant but loads like a normal page.",
        ],
      },
      {
        heading: "Working Across Time Zones",
        paragraphs: [
          "Our Karachi engineering team overlaps four to six working hours with Central European Time, which meant daily standups happened in the client's morning and builds shipped overnight from their perspective. Review cycles that normally take a week compressed into 48 hours. For European studios and agencies, this rhythm — combined with significantly lower engineering costs than hiring locally — is the core reason they outsource creative development work to us.",
        ],
      },
    ],
  },
  {
    slug: "nexus-logistics-crm",
    testimonial: { quote: "For the first time I can see every shipment, every balance, and every job's profit on one screen. We stopped running the business from memory.", attribution: "Managing Director, logistics provider — UK / Gulf" },
    title: "NEXUS_LOGISTICS — Supply Chain CRM for an International Freight Forwarder",
    client: "International logistics provider (under NDA)",
    category: "CRM / SUPPLY_CHAIN",
    region: "United Kingdom / Middle East",
    summary:
      "An enterprise-grade inventory and shipment orchestration engine that replaced spreadsheets and three disconnected tools with a single source of truth for global supply nodes.",
    metaDescription:
      "Case study: Codeeee Labs built a custom logistics CRM — shipment tracking, inventory orchestration, and finance integration — for an international freight forwarder. Next.js, PostgreSQL, Redis.",
    tech: ["Next.js", "PostgreSQL", "Redis", "Node.js", "Docker"],
    date: "2025-11-20",
    results: [
      "Replaced three disconnected tools and a wall of spreadsheets with one system",
      "Shipment status lookups went from minutes of phone calls to a two-second search",
      "Operations team processes roughly 3x the shipment volume with the same headcount",
    ],
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "Freight forwarding runs on reference numbers: booking numbers from shipping lines, container numbers, internal job IDs, customs documentation. Our client — a logistics provider moving cargo between Asia, the Gulf, and Europe — was tracking all of it across spreadsheets, a legacy desktop tool, and WhatsApp threads. Every customer status request triggered a chain of phone calls. Billing leaked revenue because completed jobs were invoiced late or not at all.",
          "Off-the-shelf CRMs don't understand this domain. Logistics operations need multi-reference search, per-shipment cost tracking, and workflows that mirror how cargo actually moves — which is exactly the kind of problem custom software exists to solve.",
        ],
      },
      {
        heading: "What We Built",
        paragraphs: [
          "We designed a custom CRM around the shipment as the central entity. Any team member can pull up a job by internal ID, carrier booking number, or container number in a single search box. Each job carries its full lifecycle — booking, customs, transport, invoicing — with role-based access so operations, finance, and management each see exactly what they need.",
          "Under the hood: a Next.js application backed by PostgreSQL for transactional integrity and Redis for real-time status caching, deployed in Docker for painless updates. Financial events flow through a double-entry style ledger so per-shipment profitability is computed, not guessed. The system was built to be operable by non-technical staff from day one — the fastest data-entry path always wins.",
        ],
      },
      {
        heading: "Why a Custom Build Won",
        paragraphs: [
          "The client had evaluated Salesforce and two logistics SaaS products. Licensing for their team size cost more annually than our entire build, and none of the products handled multi-reference search or their invoicing rules without consultants and compromise. A custom system built by a team that took the time to learn freight forwarding's actual workflow paid for itself within the first year — a pattern we see repeatedly with UK and European SMEs that have outgrown spreadsheets but can't justify enterprise licensing.",
        ],
      },
    ],
  },
  {
    slug: "quantum-stack-saas-platform",
    testimonial: { quote: "They pushed back on half our feature list and they were right about all of it. We got to paying customers months earlier because of what we didn't build.", attribution: "Co-founder, B2B SaaS startup — United States" },
    title: "QUANTUM_STACK — Multi-Tenant SaaS Platform for a US Startup",
    client: "US-based B2B SaaS startup (under NDA)",
    category: "FULL_STACK / SAAS",
    region: "United States",
    summary:
      "A scalable multi-tenant architecture designed to take a US startup from prototype to paying customers — handling high-concurrency loads without a re-write at every growth stage.",
    metaDescription:
      "Case study: Codeeee Labs engineered a multi-tenant SaaS platform for a US startup — tenant isolation, usage-based billing, and infrastructure that scales. Node.js, Docker, AWS.",
    tech: ["Node.js", "TypeScript", "Docker", "AWS", "PostgreSQL"],
    date: "2025-09-10",
    results: [
      "Prototype to production-ready multi-tenant platform in under four months",
      "Zero-downtime deploys with infrastructure costs that scale with actual usage",
      "Engineering cost roughly 40–60% below equivalent US agency quotes",
    ],
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "The founders had validated their idea with a no-code prototype and early customers were asking for accounts. They needed real software: tenant isolation so one customer's data could never leak into another's, subscription billing, an admin plane, and infrastructure that wouldn't fall over during onboarding spikes. They also had a US-startup budget — meaning a US agency quote of several hundred thousand dollars was off the table.",
        ],
      },
      {
        heading: "What We Built",
        paragraphs: [
          "We built the platform on a row-level-security multi-tenant model in PostgreSQL — strong isolation without the operational burden of a database per customer. The Node.js/TypeScript backend is fully containerized on AWS with autoscaling groups, so quiet weeks cost little and launch weeks don't page anyone. Stripe-based subscription billing, role-based team accounts, and an internal admin console shipped in the first release.",
          "Just as important is what we didn't build. Startups die from over-engineering as often as under-engineering, so we deliberately deferred microservices, event sourcing, and Kubernetes until the metrics justify them. The architecture has clean seams for that evolution — but the company got to revenue first.",
        ],
      },
      {
        heading: "Working With a Pakistan-Based Team From the US",
        paragraphs: [
          "The practical questions US founders ask us: communication, code ownership, and overlap hours. Our answers are structural. All code lives in the client's own GitHub organization from the first commit. Communication runs through Slack and weekly demo calls scheduled for US mornings — our evenings — which both sides actually attend. And because engineering salaries in Karachi are a fraction of Bay Area rates, the same budget buys senior engineers instead of a junior contractor. That arbitrage, with no compromise on code quality, is why North American startups outsource development to teams like ours.",
        ],
      },
    ],
  },
  {
    slug: "fluid-os-progressive-web-app",
    testimonial: { quote: "We budgeted for three apps and got one that does the job of all of them. Our field team installed it the same afternoon.", attribution: "Operations Lead, retail brand — Canada" },
    title: "FLUID_OS — Progressive Web App With Native Performance for a North American Retailer",
    client: "Canadian retail brand (under NDA)",
    category: "WEBAPPS / PWA",
    region: "Canada",
    summary:
      "A next-generation progressive web application delivering native-app speed in the browser — offline support, instant navigation, and one codebase instead of three.",
    metaDescription:
      "Case study: Codeeee Labs built a progressive web app with native-level performance for a Canadian retailer — offline-first, installable, one codebase. TypeScript, Tailwind, Vercel.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Service Workers", "Vercel"],
    date: "2026-03-05",
    results: [
      "One codebase replaced a planned three-platform build (web, iOS, Android), cutting projected cost by more than half",
      "Lighthouse performance scores in the high 90s on mobile",
      "Core flows work fully offline and sync when connectivity returns",
    ],
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "The client had been quoted for native iOS and Android apps plus a web rebuild — three codebases, three release pipelines, three maintenance budgets. Their actual requirement was simpler: customers and field staff needed an app-like experience that worked on any device, installed without an app store, and kept working in warehouses with patchy connectivity. That's a progressive web app's exact job description.",
        ],
      },
      {
        heading: "What We Built",
        paragraphs: [
          "We built an offline-first PWA in TypeScript and Next.js. A service-worker caching strategy makes repeat visits load instantly and keeps core flows — browsing, drafting orders, checking inventory — fully functional with no connection, syncing changes when the network returns. The app installs to the home screen on iOS and Android and is indistinguishable from native in daily use.",
          "Performance engineering was relentless: route-level code splitting, aggressive prefetching, and a design system in Tailwind that ships kilobytes of CSS rather than megabytes. The deployment pipeline on Vercel gives the client preview environments for every change — their team approves features by clicking a link, not by reading a changelog.",
        ],
      },
      {
        heading: "The Outcome",
        paragraphs: [
          "The retailer launched on all platforms simultaneously with one codebase and one team. For Canadian and US businesses weighing native apps against the web, this is the calculation we walk clients through honestly: native still wins for heavy graphics, deep hardware access, or platform-specific UX — and when it does, we build native. For everything else, a well-engineered PWA delivers 95% of the experience at a fraction of the lifetime cost.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
