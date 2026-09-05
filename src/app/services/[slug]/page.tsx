import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";
import { services, getService } from "@/content/services";

const SITE_URL = "https://codeeee.com";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: {
      title: `${svc.title} — Codeeee Labs`,
      description: svc.metaDescription,
      url: `/services/${svc.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    description: svc.metaDescription,
    serviceType: svc.title,
    url: `${SITE_URL}/services/${svc.slug}`,
    provider: {
      "@type": "Organization",
      name: "Codeeee Labs",
      url: SITE_URL,
      email: "info@codeeee.com",
      telephone: "+923361287518",
    },
    areaServed: ["US", "GB", "CA", "DE", "FR", "NL", "AE", "AU", "CN", "PK"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <article className="pt-32 pb-20 px-6 md:px-16 max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-10 text-[10px] font-mono uppercase tracking-widest text-gray-600">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-purple-600">/</span>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <span className="mx-2 text-purple-600">/</span>
          <span className="text-gray-400">{svc.code}</span>
        </nav>

        {/* Header */}
        <header className="mb-14">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-500 block mb-4">
            {svc.code} · SERVICE_BRIEF
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-[0.95] text-white mb-6">
            {svc.title}
          </h1>
          <p className="text-sm font-mono text-gray-400 uppercase tracking-wide border-l-2 border-purple-500/30 pl-4">
            {svc.tagline}
          </p>
        </header>

        {/* Intro */}
        <section className="mb-16">
          {svc.intro.map((p, i) => (
            <p key={i} className="text-sm text-gray-400 leading-relaxed mb-5">
              {p}
            </p>
          ))}
        </section>

        {/* Deliverables */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white mb-8">
            
            What We Deliver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {svc.deliverables.map((d) => (
              <div
                key={d.label}
                className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 hover:border-purple-500/40 transition-colors"
              >
                <h3 className="text-sm font-display font-semibold tracking-tight text-purple-400 mb-3">
                  {d.label}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white mb-8">
            
            Engagement Protocol
          </h2>
          <ol className="space-y-5">
            {svc.process.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full border border-purple-500/40 bg-purple-600/10 flex items-center justify-center text-[10px] font-mono text-purple-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-gray-400 leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white mb-8">
            
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {svc.faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-white/10 bg-[#0a0a0a] open:border-purple-500/40 transition-colors"
              >
                <summary className="cursor-pointer list-none p-6 flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-white">{f.question}</h3>
                  <span className="text-purple-500 font-mono text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="px-6 pb-6 text-xs text-gray-400 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-3xl border border-purple-500/30 bg-purple-600/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-display font-semibold tracking-tight text-white mb-2">
              Scope your project
            </h2>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Free consultation · info@codeeee.com · +92 336 1287518
            </p>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all shrink-0"
          >
            <span className="text-xs font-mono text-gray-400 group-hover:text-purple-400 uppercase tracking-widest">
              Get_Estimate
            </span>
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </article>
    </main>
  );
}
