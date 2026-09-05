import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

const SITE_URL = "https://codeeee.com";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.metaDescription,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      title: cs.title,
      description: cs.metaDescription,
      url: `/case-studies/${cs.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.metaDescription,
    datePublished: cs.date,
    author: { "@type": "Organization", name: "Codeeee Labs", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Codeeee Labs", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/case-studies/${cs.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE_URL}/case-studies` },
      { "@type": "ListItem", position: 3, name: cs.title.split(" — ")[0], item: `${SITE_URL}/case-studies/${cs.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <article className="pt-32 pb-20 px-6 md:px-16 max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-10 text-[10px] font-mono uppercase tracking-widest text-gray-600">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-purple-600">/</span>
          <Link href="/case-studies" className="hover:text-white transition-colors">Case_Studies</Link>
          <span className="mx-2 text-purple-600">/</span>
          <span className="text-gray-400">{cs.title.split(" — ")[0]}</span>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 text-purple-500 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest">{cs.category}</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">{cs.region}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95] text-white mb-6">
            {cs.title}
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-purple-500/30 pl-4 max-w-2xl">
            {cs.summary}
          </p>
          <div className="flex gap-2 flex-wrap mt-6">
            {cs.tech.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] text-gray-300 uppercase tracking-wider font-bold">
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Results */}
        <section className="mb-16 rounded-3xl border border-white/10 bg-[#0a0a0a] p-8">
          <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-purple-500 pl-3">
            Mission_Outcomes
          </h2>
          <ul className="space-y-4">
            {cs.results.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Body sections */}
        {cs.sections.map((section) => (
          <section key={section.heading} className="mb-14">
            <h2 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white mb-6">
              
              {section.heading}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-gray-400 leading-relaxed mb-5">
                {p}
              </p>
            ))}
          </section>
        ))}

        {/* Testimonial */}
        {cs.testimonial && (
          <figure className="mt-16 rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10 relative overflow-hidden">
            <span className="absolute top-4 left-6 text-7xl font-semibold text-purple-600/20 select-none" aria-hidden>
              &ldquo;
            </span>
            <blockquote className="relative z-10 text-base md:text-lg text-gray-200 leading-relaxed">
              {cs.testimonial.quote}
            </blockquote>
            <figcaption className="mt-6 text-[10px] font-mono uppercase tracking-widest text-purple-400">
              — {cs.testimonial.attribution}
            </figcaption>
          </figure>
        )}

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-purple-500/30 bg-purple-600/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-display font-semibold tracking-tight text-white mb-2">
              Have a similar mission?
            </h2>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              We work with clients across the US, UK, Canada, Europe &amp; the Gulf.
            </p>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all shrink-0"
          >
            <span className="text-xs font-mono text-gray-400 group-hover:text-purple-400 uppercase tracking-widest">
              Initiate_Connection
            </span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </article>
    </main>
  );
}
