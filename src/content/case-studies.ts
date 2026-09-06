// Long-form case studies. These power /case-studies, /case-studies/[slug],
// the sitemap, and the portfolio card links. Pure data — no JSX — so they can
// be imported from server components and route handlers alike.

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
}

export interface CaseStudy {
  slug: string;
  /** Internal codename, kept as a small display label only. Never the H1,
   *  the <title> or the URL — buyers search problems, not codenames. */
  code: string;
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

// ─────────────────────────────────────────────────────────────────────────────
// VERIFY BEFORE PUBLISHING ANY NUMBER HERE.
//
// Three case studies (AETHER_INTERFACE, QUANTUM_STACK, FLUID_OS) were removed
// on 2026-09-06: they described a European design studio, a US SaaS startup
// and a North American retailer, none of which correspond to work Codeeee has
// done. They carried invented client identities, performance metrics and
// attributed testimonials.
//
// What remains describes real projects. Outcome claims and testimonials have
// been reduced to what can be stated without a measurement to back it. If you
// have evidence for a figure — a real before/after, a real quote from a real
// named person — put it back. Do not add one otherwise: these pages are the
// basis of directory profiles and press outreach.
// ─────────────────────────────────────────────────────────────────────────────

export const caseStudies: CaseStudy[] = [
  {
    slug: "freight-forwarding-erp",
    code: "FREIGHT_ERP",
    title: "A Custom ERP for a Freight Forwarding Company",
    client: "Freight forwarding company",
    category: "ERP / FREIGHT FORWARDING",
    region: "United Kingdom & Pakistan",
    summary:
      "A custom ERP built around the shipment as the central record — bookings, customs documentation, transport and invoicing in one system instead of spreadsheets and disconnected tools.",
    metaDescription:
      "Case study: Codeeee Labs built a custom ERP for a freight forwarding company — multi-reference shipment search, document handling, and per-job financials. Next.js, PostgreSQL, Redis.",
    tech: ["Next.js", "PostgreSQL", "Redis", "Node.js", "Docker"],
    date: "2025-11-20",
    results: [
      "One system in place of spreadsheets and separate disconnected tools",
      "Shipments findable by internal job ID, carrier booking number or container number from a single search",
      "Per-shipment cost and revenue tracked in the system rather than reconstructed afterwards",
    ],
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "Freight forwarding runs on reference numbers: booking numbers from shipping lines, container numbers, internal job IDs, customs documentation. Our client was tracking all of it across spreadsheets, a legacy desktop tool, and messaging threads. Every customer status request triggered a chain of phone calls, and billing leaked because completed jobs were invoiced late or not at all.",
          "Off-the-shelf CRMs do not understand this domain. Logistics operations need multi-reference search, per-shipment cost tracking, and workflows that mirror how cargo actually moves — which is exactly the kind of problem custom software exists to solve.",
        ],
      },
      {
        heading: "What We Built",
        paragraphs: [
          "We designed the system around the shipment as the central entity. Any team member can pull up a job by internal ID, carrier booking number, or container number from a single search box. Each job carries its full lifecycle — booking, customs, transport, invoicing — with role-based access so operations, finance, and management each see what they need.",
          "Under the hood: a Next.js application backed by PostgreSQL for transactional integrity and Redis for status caching, deployed in Docker for straightforward updates. Financial events flow through a double-entry style ledger so per-shipment profitability is computed rather than estimated. The system was built to be operable by non-technical staff from day one — the fastest data-entry path always wins.",
        ],
      },
      {
        heading: "Why a Custom Build",
        paragraphs: [
          "Generic CRM licensing for a team of this size is a recurring cost, and the products still do not handle multi-reference search or forwarding-specific invoicing rules without consultants and compromise. For an SME that has outgrown spreadsheets but cannot justify enterprise licensing and its implementation overhead, a custom system built by a team that took the time to learn the workflow is usually the cheaper answer over any multi-year horizon.",
        ],
      },
    ],
  },
  {
    slug: "road-transport-erp",
    code: "TRANSPORT_ERP",
    title: "An ERP for a Road Transport Company, With Automated Truck Assignment",
    client: "Road transport and trucking operator",
    category: "ERP / ROAD TRANSPORT",
    region: "Pakistan",
    summary:
      "An operations platform for a road transport company: incoming job queries handled automatically, and trucks assigned to jobs by the system rather than by a dispatcher working from memory.",
    metaDescription:
      "Case study: Codeeee Labs built an ERP and operations platform for a road transport company — automated truck assignment and automated handling of incoming job queries.",
    tech: ["Next.js", "Node.js", "PostgreSQL"],
    date: "2026-09-06",
    results: [
      "Incoming job queries captured and processed automatically instead of manually re-keyed",
      "Truck assignment driven by the system rather than by a dispatcher's recall of who is where",
      "Jobs, vehicles and drivers held in one operational record",
    ],
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "Road transport dispatch is a matching problem that most operators solve from memory: which trucks are free, where they are, which are due for maintenance, and which driver can legally take the next job. That knowledge tends to live with one or two experienced dispatchers, which makes the operation hard to scale and fragile when those people are unavailable.",
          "Incoming work arrived as unstructured enquiries that had to be read, understood and manually entered before anything could be assigned — the slowest step in the chain, and the one where jobs get lost.",
        ],
      },
      {
        heading: "What We Built",
        paragraphs: [
          "We built an operations platform that automates both ends of that process. Incoming job queries are captured and turned into structured jobs without manual re-keying, and truck assignment is handled by the system against the current state of the fleet rather than by a dispatcher's recall.",
          "The platform holds jobs, vehicles and drivers as one operational record, so the state of the fleet is something the whole business can see rather than something a single person carries.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
