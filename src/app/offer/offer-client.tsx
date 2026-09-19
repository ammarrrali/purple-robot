'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';
import {
  ArrowUpRight, Send, CheckCircle2, ShieldCheck, Clock, Sparkles,
  Search, PenTool, Rocket, Terminal, BadgeCheck,
} from 'lucide-react';
import { track, leadSource } from '@/lib/track';

// The intake is deliberately tiny — name, email, one goal, and free-text.
// Every extra required field costs conversions, so everything past the goal
// selector is optional.
const GOALS = [
  'Build my site first — pay only if I like it',
  'Free audit of my existing website',
  'Web app or MVP',
  'Not sure yet — advise me',
] as const;

const STEPS = [
  {
    icon: PenTool,
    title: 'Tell us what you need',
    body: 'A URL, a rough idea, or a sketch on a napkin — whatever you have. Two minutes on the form below is enough to start.',
  },
  {
    icon: Sparkles,
    title: 'We build it — on us',
    body: 'Our senior team designs and builds your homepage (or a working, clickable prototype). No deposit, no contract, no card.',
  },
  {
    icon: Rocket,
    title: 'Love it? We finish. If not, walk away',
    body: "You see the real thing before you spend a rupee. Keep going and we complete the build; not for you? You owe nothing.",
  },
];

export function OfferClient() {
  const [goal, setGoal] = useState<string>(GOALS[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const composedMessage =
    `Goal: ${goal}\n` +
    (website ? `Current website: ${website}\n` : '') +
    `\n${message || '(no additional details provided)'}`;

  const mailtoFallback = `mailto:info@codeeee.com?subject=${encodeURIComponent(
    `${goal} — from ${name || 'website visitor'}`,
  )}&body=${encodeURIComponent(`${composedMessage}\n\n— ${name}${email ? ` (${email})` : ''}`)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState === 'sending' || sendState === 'sent') return;
    setSendState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          website,
          offer: goal,
          message: composedMessage,
          ...leadSource(),
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setSendState('sent');
      track('generate_lead', { offer: goal, ...leadSource() });
    } catch {
      setSendState('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 overflow-hidden relative">
      <LiquidNavBar />

      {/* Background grid + glow */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">

        {/* ===== HERO ===== */}
        <section className="pt-36 md:pt-44 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-purple-300 border border-purple-500/30 bg-purple-500/10 rounded-full px-4 py-1.5 mb-8">
              <Sparkles size={12} /> Risk-free offer
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[76px] font-semibold leading-[0.95] tracking-tight mb-6">
              We build it first.<br />
              You pay only if you{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">love it</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mb-10">
              Most agencies ask for a deposit before you&apos;ve seen a thing. We flip it: our senior
              team designs and builds your homepage or a working prototype up front — free. If it&apos;s
              not right, you walk away and owe nothing. Already have a site?{' '}
              <span className="text-white font-semibold">Get a free audit</span> instead.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#start"
                className="group flex items-center gap-3 px-7 py-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors"
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase">Claim your free build</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#how"
                className="flex items-center gap-3 px-7 py-4 rounded-full border border-white/15 hover:border-purple-500/50 hover:bg-white/5 transition-all"
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-300">How it works</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how" className="py-16 border-t border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">How it works</span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-12 max-w-2xl">
            Three steps. Zero risk to you.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-3xl border border-white/10 bg-[#0a0a0a] p-7 md:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <s.icon size={20} />
                  </div>
                  <span className="font-mono text-xs text-gray-600">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== TWO OFFERS ===== */}
        <section className="py-16 border-t border-white/5">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">Pick your path</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Flagship */}
            <div className="relative rounded-3xl border border-purple-500/40 bg-gradient-to-b from-purple-500/[0.08] to-transparent p-8 md:p-10">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-purple-200 bg-purple-500/20 rounded-full px-3 py-1 mb-6">
                <Sparkles size={11} /> Most popular
              </span>
              <h3 className="text-2xl font-display font-semibold mb-3">See it before you pay</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                We build your homepage or a clickable prototype for free. You review the real,
                working thing — then decide whether to pay and continue. No deposit, no lock-in.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Free homepage or working prototype',
                  'No deposit, no card, no contract to start',
                  'You own the code and IP from day one',
                  'Delivered in days, not weeks',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#start" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors">
                Start my free build <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Audit */}
            <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 md:p-10">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 bg-white/5 rounded-full px-3 py-1 mb-6">
                <Search size={11} /> Already have a site
              </span>
              <h3 className="text-2xl font-display font-semibold mb-3">Free website audit</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Send us your URL and we&apos;ll send back an honest teardown — the speed, SEO, and
                conversion issues costing you customers, and exactly what we&apos;d fix first.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'Performance & Core Web Vitals check',
                  'SEO and indexation gaps',
                  'Conversion & UX leaks, prioritized',
                  'No obligation, no sales pressure',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-gray-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#start" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-200 hover:text-white transition-colors">
                Get my free audit <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* ===== INTAKE FORM ===== */}
        <section id="start" className="py-16 border-t border-white/5 scroll-mt-28 flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500 block mb-4">Claim your offer</span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-5 max-w-md">
              Tell us where to start
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md mb-10">
              Two minutes. We reply within one business day with next steps — no obligation, and
              nothing to pay to begin.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <BadgeCheck size={16} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="text-white font-semibold">Senior engineers, not juniors.</span>{' '}
                  The same people who build for US, UK, Canada, and EU clients build your preview.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={16} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="text-white font-semibold">Your code, your IP.</span>{' '}
                  Everything we build is yours from the first commit. NDA available before we talk.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span className="text-white font-semibold">One business day.</span>{' '}
                  We work UTC+5 — overlapping UK/EU afternoons and US East Coast mornings.
                </p>
              </div>
            </div>
          </div>

          {/* Terminal-style form, matching /contact */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex items-center gap-2 opacity-50">
                  <Terminal size={12} className="text-purple-400" />
                  <span className="text-[10px] font-mono text-gray-400">guest@codeeee-shell ~ claim-offer</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 font-mono text-sm flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="offer-goal" className="text-purple-400 text-xs uppercase tracking-wider mb-1">What do you want?</label>
                  <select
                    id="offer-goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-2.5 px-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    {GOALS.map((g) => (
                      <option key={g} value={g} className="bg-[#0a0a0a] text-white">{g}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="offer-name" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Your name</label>
                  <input
                    id="offer-name" type="text" required autoComplete="name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="offer-email" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Email address</label>
                  <input
                    id="offer-email" type="email" required autoComplete="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="offer-website" className="text-purple-400 text-xs uppercase tracking-wider mb-1">
                    Current website <span className="text-gray-600 normal-case tracking-normal">(optional — needed for an audit)</span>
                  </label>
                  <input
                    id="offer-website" type="text" inputMode="url" autoComplete="url"
                    value={website} onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yoursite.com"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="offer-message" className="text-purple-400 text-xs uppercase tracking-wider mb-1">
                    Anything else? <span className="text-gray-600 normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="offer-message"
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="What are you building, and what does success look like?"
                    className="w-full min-h-[110px] bg-white/[0.02] border border-white/5 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600 resize-none"
                  />
                </div>

                {sendState === 'error' && (
                  <p role="alert" className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3 leading-relaxed">
                    Something went wrong sending your request. Please{' '}
                    <a href={mailtoFallback} className="underline text-red-200 hover:text-white">email us directly</a>{' '}
                    and we&apos;ll get right back to you.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sendState === 'sending' || sendState === 'sent'}
                  className="group w-full py-4 bg-purple-600 text-white font-semibold uppercase tracking-wider hover:bg-purple-500 transition-all rounded-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {sendState === 'sent' ? (
                    <>
                      <span>Request received — talk soon</span>
                      <CheckCircle2 size={16} />
                    </>
                  ) : (
                    <>
                      <span>{sendState === 'sending' ? 'Sending…' : 'Claim my offer'}</span>
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-gray-600 leading-relaxed text-center">
                  No spam, no obligation. We only use your details to reply about your project.
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ===== CLOSING LINE ===== */}
        <section className="py-16 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500 mb-4">Prefer to talk first?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-display font-semibold text-white hover:text-purple-300 transition-colors">
            Reach the team on the contact page <ArrowUpRight size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}
