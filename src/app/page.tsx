import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Clock, Code2, Zap, Ship, Truck, Smartphone, Globe2 } from "lucide-react";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";
import { HeroBot3D } from "@/components/ui/hero-bot-3d";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";

const SITE_URL = "https://codeeee.com";

const industries = [
  {
    icon: Ship,
    sector: "Freight forwarding",
    text: "Custom ERP systems for freight forwarders in the UK and Pakistan — shipments, documentation, and finance in one place.",
  },
  {
    icon: Truck,
    sector: "Trucking & logistics",
    text: "An operations platform for a Pakistani trucking company: automated truck assignment and automated handling of incoming job queries.",
  },
  {
    icon: Smartphone,
    sector: "Marketplace apps",
    text: "A tailor marketplace mobile app for a US company — connecting customers with tailors end to end.",
  },
  {
    icon: Globe2,
    sector: "Freight & logistics web",
    text: "A fast, modern marketing website for a freight company, built to win trust and inbound enquiries.",
  },
];

const homeFaqs = [
  {
    question: "What does Codeeee Labs do?",
    answer:
      "Codeeee Labs is a software house that builds custom web applications, AI automation, mobile apps, and bespoke CRM systems. We work with startups and established businesses across the US, UK, Canada, Europe, and the Gulf, delivering senior engineering at offshore rates.",
  },
  {
    question: "Where is Codeeee Labs based?",
    answer:
      "Our engineering team is based in Karachi, Pakistan (UTC+5), which overlaps the European workday and US East Coast mornings. We work remotely with clients worldwide over Slack, weekly demo calls, and a shared task board.",
  },
  {
    question: "How much does custom software cost?",
    answer:
      "A focused MVP or AI pilot typically starts around $5,000–$15,000, a full web application runs $15,000–$40,000, and larger SaaS or CRM platforms scale from there. Because our team is in Karachi, these figures are usually 40–60% below equivalent US or UK agency quotes for the same scope.",
  },
  {
    question: "Do I own the code and intellectual property?",
    answer:
      "Yes — unambiguously, from the first commit. All work lives in your own GitHub organization, contracts assign full IP to you, and there is no proprietary framework lock-in. Any competent team can take over the codebase.",
  },
  {
    question: "How do you work across US, UK, and European time zones?",
    answer:
      "Karachi (UTC+5) overlaps the European workday by four to six hours and US East Coast mornings by two to three. Standups and demos happen inside that overlap; deep development runs in your off-hours, so progress appears overnight.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start a free consultation — tell us the problem you're trying to solve and we'll come back with an honest scope, timeline, and fixed-scope estimate. Email info@codeeee.com or use the contact form.",
  },
];

const stats = [
  { icon: Zap, label: "40–60% below US/UK agency rates", sub: "Offshore senior engineering" },
  { icon: Code2, label: "You own 100% of the code", sub: "Your repo, full IP, no lock-in" },
  { icon: Clock, label: "Working software every week", sub: "Staging demos, not a big reveal" },
  { icon: ShieldCheck, label: "UTC+5 · overlaps US & EU", sub: "Real-time collaboration hours" },
];

const processSteps = [
  { code: "01", title: "Discovery", text: "We map your workflow, data model, and goals, then return a scoped roadmap with honest estimates." },
  { code: "02", title: "Weekly shipping", text: "Working software in a staging environment every week — you always see exactly what's in flight." },
  { code: "03", title: "Launch", text: "Managed deployment, monitoring, and a documented handover on your own infrastructure." },
  { code: "04", title: "Partnership", text: "Retained development capacity, or a clean handoff to your in-house team. Your choice." },
];

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Codeeee Labs",
    url: SITE_URL,
    publisher: { "@type": "Organization", name: "Codeeee Labs", url: SITE_URL },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const featuredCases = caseStudies;

  return (
    <main className="bg-[#030303] text-white selection:bg-purple-600/40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LiquidNavBar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex items-end">
        {/* Server-rendered backdrop — paints instantly, keeps the purple glow */}
        <div className="absolute inset-0 z-0 bg-[#030303]" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.10),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        {/* SVG robot everywhere; a real WebGL coding robot on machines that can spare it */}
        <HeroBot3D className="absolute z-[2] pointer-events-none right-1/2 translate-x-1/2 sm:right-6 sm:translate-x-0 md:right-10 xl:right-20 top-[23%] sm:top-[34%] xl:top-[46%] -translate-y-1/2 w-[62vw] max-w-[230px] sm:max-w-[340px] md:max-w-[430px] xl:max-w-[540px] opacity-80 sm:opacity-100 [@media(max-height:480px)]:hidden" />

        <div className="absolute inset-0 border border-white/5 pointer-events-none z-[5] m-4 md:m-6" aria-hidden />

        {/* Foreground content — real, crawlable text */}
        <div className="relative z-10 w-full p-6 md:p-16 pt-28 md:pt-36 pb-12">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-purple-400 mb-6">
              Software House · Karachi → Worldwide
            </p>
            <p aria-hidden className="font-hero text-5xl sm:text-7xl lg:text-[110px] font-black italic uppercase leading-[0.85] tracking-tighter mb-6">
              CODEEEE <span className="inline-block pr-[0.12em] -mr-[0.12em] text-transparent bg-clip-text bg-gradient-to-t from-gray-600 to-white">LABS</span>
            </p>
            <h1 className="text-base md:text-xl font-normal text-gray-300 leading-relaxed max-w-2xl mb-8">
              We build <strong className="text-white font-semibold">custom web applications, AI automation, mobile apps, and CRM systems</strong> for
              startups and businesses in the US, UK, Canada, and Europe — senior engineering from Karachi at offshore rates.
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-3 px-7 py-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors pointer-events-auto"
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase">Start a project</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-3 px-7 py-4 rounded-full border border-white/15 hover:border-purple-500/50 hover:bg-white/5 transition-all pointer-events-auto"
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-300">View services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="relative border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#050505] p-6 md:p-8">
              <s.icon size={18} className="text-purple-500 mb-4" />
              <p className="text-sm font-bold text-white leading-snug mb-1">{s.label}</p>
              <p className="text-[11px] font-mono uppercase tracking-wider text-gray-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="relative py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <header className="mb-14 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">What we build</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95] mb-4">
              Custom software, engineered to last
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Four core practices, one accountable team. We choose boring, hireable, battle-tested technology on purpose —
              your platform should outlive any single vendor, including us.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 md:p-9 hover:border-purple-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">{svc.code}</span>
                  <ArrowUpRight size={18} className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white mb-3">{svc.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{svc.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">Why outsource to Codeeee</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95] mb-6">
              Bay Area engineering, without the Bay Area invoice
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-5">
              Offshore software development gets a bad reputation from body-shops that ship unmaintainable code. We work the
              opposite way: senior engineers, your repository, your infrastructure, and working software you can review every
              single week. The savings come from where we sit — not from cutting corners.
            </p>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Whether you're a US startup going from validated idea to production, a UK business drowning in spreadsheets, or a
              European team that needs to rescue a stalled project — the engagement is the same: honest scope, fixed-scope
              quotes, and code you own outright.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { h: "Senior-only teams", p: "No junior hand-offs. The engineers who scope your project are the ones who build it." },
              { h: "Fixed-scope quotes", p: "The number you sign after a discovery sprint is the number you pay." },
              { h: "Full IP ownership", p: "Your GitHub org, your infrastructure, full intellectual property from commit one." },
              { h: "Timezone overlap", p: "UTC+5 gives you live overlap with both European and US East Coast working hours." },
            ].map((c) => (
              <div key={c.h} className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
                <h3 className="text-sm font-display font-semibold tracking-tight text-purple-400 mb-2">{c.h}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS (server text + lazy visual) ================= */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-14 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">How we work</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95] mb-4">
              From first call to production
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              A predictable, transparent process. No year-long big-bang projects — you get value inside the first quarter.
            </p>
          </header>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((s) => (
              <li key={s.code} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 md:p-7">
                <span className="text-purple-500/60 font-mono text-2xl font-semibold block mb-4">{s.code}</span>
                <h3 className="text-base font-display font-semibold tracking-tight text-white mb-2">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= INDUSTRIES SERVED ================= */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <header className="mb-14 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-purple-500 block mb-4">Industries we&apos;ve served</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95] mb-4">
              Real systems, real operations
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              A sample of the businesses we&apos;ve built for — from logistics operators to consumer
              marketplaces, across Pakistan, the UK, and the US.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map((ind) => (
              <div key={ind.sector} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 md:p-8 flex gap-5">
                <div className="shrink-0 w-11 h-11 rounded-xl border border-purple-500/30 bg-purple-600/10 flex items-center justify-center">
                  <ind.icon size={20} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-display font-semibold tracking-tight text-white mb-2">{ind.sector}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{ind.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-mono uppercase tracking-widest text-gray-600">— and many more</p>
        </div>
      </section>

      {/* ================= SELECTED WORK ================= */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <header className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">Selected work</span>
              <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95]">
                Systems we&apos;ve shipped
              </h2>
            </div>
            <Link href="/case-studies" className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-purple-400 transition-colors">
              All case studies <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredCases.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 hover:border-purple-500/40 transition-colors flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400">{c.category}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">{c.region}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug mb-3">{c.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{c.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95]">
              Common questions
            </h2>
          </header>
          <div className="flex flex-col gap-4">
            {homeFaqs.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-white/10 bg-[#0a0a0a] open:border-purple-500/40 transition-colors">
                <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-white">{f.question}</h3>
                  <span className="text-purple-500 font-mono text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="px-6 pb-6 text-sm text-gray-400 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative py-20 md:py-28 px-6 md:px-16 border-t border-white/5 bg-[#050505]">
        <div className="max-w-5xl mx-auto rounded-3xl border border-purple-500/30 bg-purple-600/5 p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95] mb-5">
            Let&apos;s scope your build
          </h2>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl mx-auto mb-8">
            Tell us the problem. We&apos;ll come back with an honest scope, a realistic timeline, and a fixed-scope estimate —
            no obligation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="group flex items-center gap-3 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">Start a free consultation</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <a href="mailto:info@codeeee.com" className="text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-purple-400 transition-colors">
              info@codeeee.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
