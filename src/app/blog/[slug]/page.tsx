import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";
import { blogPosts, getBlogPost } from "@/content/blog";
import { getService } from "@/content/services";

const SITE_URL = "https://codeeee.com";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedService = getService(post.relatedService);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Codeeee Labs", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Codeeee Labs", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
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

      <article className="pt-32 pb-20 px-6 md:px-16 max-w-3xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-10 text-[10px] font-mono uppercase tracking-widest text-gray-600">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2 text-purple-600">/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Insights</Link>
        </nav>

        {/* Header */}
        <header className="mb-14">
          <div className="flex items-center gap-3 flex-wrap text-purple-500 mb-4">
            {post.tags.map((t) => (
              <span key={t} className="text-[10px] font-mono uppercase tracking-widest">{t}</span>
            ))}
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
              · {formatDate(post.date)} · {post.readMinutes} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight leading-[1] text-white">
            {post.title}
          </h1>
        </header>

        {/* Body */}
        {post.sections.map((section) => (
          <section key={section.heading} className="mb-12">
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

        {/* Related service CTA */}
        {relatedService && (
          <div className="mt-16 rounded-3xl border border-purple-500/30 bg-purple-600/5 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-500 block mb-2">
                Related_Capability
              </span>
              <h2 className="text-xl font-display font-semibold tracking-tight text-white">
                {relatedService.title}
              </h2>
            </div>
            <Link
              href={`/services/${relatedService.slug}`}
              className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-white/5 transition-all shrink-0"
            >
              <span className="text-xs font-mono text-gray-400 group-hover:text-purple-400 uppercase tracking-widest">
                Access_Brief
              </span>
              <ArrowUpRight size={16} className="text-gray-400 group-hover:text-white transition-colors" />
            </Link>
          </div>
        )}
      </article>
    </main>
  );
}
