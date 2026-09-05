import Link from "next/link";
import { ArrowUpRight, MapPin, Users, Code2, Globe2, ShieldCheck, GitBranch } from "lucide-react";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";

const SITE_URL = "https://codeeee.com";

const facts = [
  { icon: MapPin, label: "Karachi, Pakistan", sub: "UTC+5 · overlaps US & EU hours" },
  { icon: Globe2, label: "Clients worldwide", sub: "US, UK, Canada, Europe & the Gulf" },
  { icon: Code2, label: "Est. 2026", sub: "Senior engineering studio" },
  { icon: GitBranch, label: "You own the code", sub: "Your repo, full IP, no lock-in" },
];

const values = [
  {
    icon: Users,
    title: "Senior-only teams",
    body: "No junior hand-offs and no outsourcing chain. The engineers who scope your project are the ones who write the code and stand behind it.",
  },
  {
    icon: ShieldCheck,
    title: "Honesty over upsell",
    body: "If an off-the-shelf tool fits your problem, we'll tell you in the first call. We only take work where custom engineering genuinely pays for itself.",
  },
  {
    icon: Code2,
    title: "Boring, durable tech",
    body: "TypeScript, Next.js, Node.js, PostgreSQL. We choose hireable, battle-tested tools on purpose — your platform should outlive any single vendor, us included.",
  },
  {
    icon: GitBranch,
    title: "Weekly, visible progress",
    body: "Working software in a staging environment every week. You always know exactly what's in flight — no black boxes, no big-reveal surprises.",
  },
];

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden />
      <div className="absolute top-0 inset-x-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.16),transparent_65%)] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 pt-32 pb-24">
        {/* Breadcrumb */}
        <nav className="mb-10 text-[10px] font-mono uppercase tracking-widest text-gray-600">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-purple-600">/</span>
          <span className="text-gray-400">About</span>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-5">Who we are</span>
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight leading-[0.9] mb-6">
            A Karachi software house, built for serious engineering
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Codeeee Labs is a software development studio in Karachi, Pakistan. We build custom web applications, AI
            automation, mobile apps, and CRM systems for startups and businesses across the US, UK, Canada, Europe, and the
            Gulf — pairing senior engineering with offshore economics.
          </p>
        </header>

        {/* Facts strip */}
        <section className="mb-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/10">
          {facts.map((f) => (
            <div key={f.label} className="bg-[#0a0a0a] p-6">
              <f.icon size={18} className="text-purple-500 mb-4" />
              <p className="text-sm font-bold text-white leading-snug mb-1">{f.label}</p>
              <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500 leading-relaxed">{f.sub}</p>
            </div>
          ))}
        </section>

        {/* Story */}
        <section className="mb-16 space-y-5">
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-6">
            Why we exist
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            Most businesses looking abroad for software have been burned once already — by a body-shop that shipped
            unmaintainable code, missed every deadline, and vanished after launch. That reputation is earned, and it's exactly
            what we set out to break. Codeeee Labs runs the opposite way: a small team of senior engineers, working directly in
            your repository and on your infrastructure, shipping software you can review every single week.
          </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            The cost advantage is real, but it comes from where we sit — not from cutting corners. A US or UK agency prices in
            San Francisco or London overheads; we don't. That gap lets a validated startup reach production without a venture
            budget, and lets an established business finally replace the spreadsheets holding its operations together — both at
            40–60% below equivalent Western quotes, for the same quality of work.
          </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            We're deliberately small. We'd rather do a handful of projects properly than run an assembly line, which is why every
            engagement gets senior attention from the first call to the final handover.
          </p>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-8">
            How we work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-7 hover:border-purple-500/40 transition-colors">
                <v.icon size={20} className="text-purple-500 mb-4" />
                <h3 className="text-base font-display font-semibold tracking-tight text-white mb-3">{v.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we do → services */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-tight mb-6">
            What we build
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6">
            Four core practices, one accountable team: <Link href="/services/web-applications" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">web &amp; SaaS applications</Link>,{" "}
            <Link href="/services/ai-automation" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">AI automation &amp; LLM integration</Link>,{" "}
            <Link href="/services/mobile-apps" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">iOS &amp; Android mobile apps</Link>, and{" "}
            <Link href="/services/custom-crm" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">custom CRM &amp; business systems</Link>.
            See our <Link href="/case-studies" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">case studies</Link> for real projects and results.
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-3xl border border-purple-500/30 bg-purple-600/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-display font-semibold tracking-tight text-white mb-2">Work with us</h2>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Free consultation · info@codeeee.com · +92 336 1287518
            </p>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-4 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors shrink-0"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">Start a project</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
