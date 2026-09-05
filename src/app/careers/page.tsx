'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Send, CheckCircle2, Globe2, Code2, Clock } from 'lucide-react';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';

const perks = [
  { icon: Code2, title: 'Real ownership', body: 'Ship features end to end on production systems used by real international clients — not busywork.' },
  { icon: Globe2, title: 'Global exposure', body: 'Work directly with founders and teams in the US, UK, Canada, and Europe.' },
  { icon: Clock, title: 'Senior mentorship', body: 'Small team, senior engineers, honest code review. You will get better, fast.' },
];

export default function CareersPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const mailtoFallback = `mailto:info@codeeee.com?subject=${encodeURIComponent(
    `Job application${role ? ` — ${role}` : ''} from ${name || 'applicant'}`,
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nRole: ${role}\nPortfolio/LinkedIn: ${link}\n\n${message}`,
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState === 'sending' || sendState === 'sent') return;
    setSendState('sending');
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role, link, message }),
      });
      if (!res.ok) throw new Error('send failed');
      setSendState('sent');
    } catch {
      setSendState('error');
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-white/10 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600';

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 relative">
      <LiquidNavBar />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" aria-hidden />
      <div className="absolute top-0 inset-x-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.16),transparent_65%)] pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 pt-32 pb-24">
        {/* Breadcrumb */}
        <nav className="mb-10 text-[10px] font-mono uppercase tracking-widest text-gray-500">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="mx-2 text-purple-600">/</span>
          <span className="text-gray-400">Careers</span>
        </nav>

        {/* Header */}
        <header className="mb-14 max-w-2xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-purple-500 block mb-5">Careers</span>
          <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight leading-[0.9] mb-6">
            Build software that ships
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            We&apos;re a small, senior team in Karachi building custom web apps, AI automation, mobile apps,
            and CRM systems for clients around the world. If you care about writing software that real
            businesses depend on, we&apos;d like to hear from you — even if we&apos;re not actively hiring.
          </p>
        </header>

        {/* Perks */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {perks.map((p) => (
            <div key={p.title} className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6">
              <p.icon size={20} className="text-purple-500 mb-4" />
              <h2 className="text-base font-display font-semibold tracking-tight text-white mb-2">{p.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </section>

        {/* Application form */}
        <section className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 md:p-10 max-w-2xl">
          <h2 className="text-2xl font-display font-semibold tracking-tight text-white mb-2">Send your application</h2>
          <p className="text-sm text-gray-400 mb-8">
            Goes straight to <span className="text-purple-300">info@codeeee.com</span>. We reply to everyone.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="c-name" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Your name</label>
                <input id="c-name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="c-email" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Email address</label>
                <input id="c-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@email.com" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="c-role" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Role you&apos;re after</label>
                <input id="c-role" type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Full-stack engineer" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="c-link" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Portfolio / LinkedIn / GitHub</label>
                <input id="c-link" type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://…" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="c-message" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Tell us about yourself</label>
              <textarea
                id="c-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What you've built, what you want to work on, and why Codeeee Labs."
                className="w-full min-h-[150px] bg-white/[0.02] border border-white/5 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600 resize-none"
              />
            </div>

            {sendState === 'error' && (
              <p role="alert" className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3 leading-relaxed">
                Something went wrong sending your application. Please{' '}
                <a href={mailtoFallback} className="underline text-red-200 hover:text-white">email it to us directly</a>{' '}
                and we&apos;ll get back to you.
              </p>
            )}

            <button
              type="submit"
              disabled={sendState === 'sending' || sendState === 'sent'}
              className="group w-full py-4 bg-purple-600 text-white font-semibold uppercase tracking-wider hover:bg-purple-500 transition-all rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {sendState === 'sent' ? (
                <>
                  <span>Application sent — thank you</span>
                  <CheckCircle2 size={16} />
                </>
              ) : (
                <>
                  <span>{sendState === 'sending' ? 'Sending…' : 'Send application'}</span>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </section>

        {/* Fallback CTA */}
        <p className="mt-10 text-sm text-gray-400">
          Prefer email?{' '}
          <a href="mailto:info@codeeee.com" className="inline-flex items-center gap-1 text-purple-300 hover:text-purple-200">
            info@codeeee.com <ArrowUpRight size={14} />
          </a>
        </p>
      </div>
    </main>
  );
}
