import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LiquidNavBar } from "@/components/ui/liquid-navbar";
import { blogPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Insights — Guides on Custom Software, Mobile & Outsourcing",
  description:
    "Practical guides from Codeeee Labs: what custom software really costs, PWA vs native decisions, and how to outsource development without getting burned. Written for founders and operators.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Insights — Codeeee Labs",
    description:
      "Practical guides on custom software costs, mobile strategy, and outsourcing — for founders and operators.",
    url: "/blog",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-20">
          <h1 className="text-[11vw] md:text-[5.5vw] font-display font-semibold leading-[0.95] tracking-tight text-white">
            Software Development Insights
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-[1px] w-20 bg-purple-600" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Guides for founders &amp; operators
            </span>
          </div>
          <p className="mt-8 max-w-2xl text-sm text-gray-400 leading-relaxed">
            Practical guides for founders and operators deciding how to build software —
            honest costs, real trade-offs, and the questions worth asking before a budget
            is spent.
          </p>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-3xl border border-white/10 bg-[#0a0a0a] hover:border-purple-500/50 transition-all p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 flex-wrap text-purple-500 mb-3">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono uppercase tracking-widest">{t}</span>
                  ))}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                    · {formatDate(post.date)} · {post.readMinutes} min
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white group-hover:text-purple-100 transition-colors mb-4">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-400 font-mono leading-relaxed border-l-2 border-purple-500/20 pl-4 group-hover:border-purple-500 transition-colors">
                  {post.excerpt}
                </p>
              </div>
              <div className="shrink-0 p-3 rounded-full border border-white/10 bg-white/5 text-gray-400 group-hover:text-white group-hover:border-purple-500/50 transition-colors self-start md:self-center">
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
