'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';
import { Mail, Smartphone, Instagram, Copy, Terminal, Send, CheckCircle2, MessageCircle, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { track, leadSource, type LeadEvent } from '@/lib/track';

// Set NEXT_PUBLIC_BOOKING_URL (Cal.com / Calendly) to switch on the
// "book a call" path. Until it is set, the button is simply not rendered —
// better no button than a broken one.
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

// Prefilled so the visitor does not have to compose an opener.
const WHATSAPP_URL =
  'https://wa.me/923361287518?text=' +
  encodeURIComponent("Hi Codeeee Labs — I'd like to discuss a software project.");

// --- CONTACT DATA ---
const contactMethods: {
  id: string; label: string; value: string; action: string;
  icon: typeof Mail; status: string; event: LeadEvent;
}[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Message us now",
    action: WHATSAPP_URL,
    icon: MessageCircle,
    status: "Fastest",
    event: "contact_whatsapp",
  },
  {
    id: "phone",
    label: "Phone",
    value: "+92 336 1287518",
    action: "tel:+923361287518",
    icon: Smartphone,
    status: "Active",
    event: "contact_phone",
  },
  {
    id: "email",
    label: "Email",
    value: "info@codeeee.com",
    action: "mailto:info@codeeee.com",
    icon: Mail,
    status: "Idle",
    event: "contact_email",
  },
  {
    id: "insta",
    label: "Instagram",
    value: "@codeeeelabs",
    action: "https://instagram.com/codeeeelabs",
    icon: Instagram,
    status: "Live",
    event: "contact_email",
  },
];

export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const mailtoFallback = `mailto:info@codeeee.com?subject=${encodeURIComponent(
    `Project inquiry from ${name || 'website visitor'}`,
  )}&body=${encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`)}`;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState === 'sending' || sendState === 'sent') return;
    setSendState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, ...leadSource() }),
      });
      if (!res.ok) throw new Error('send failed');
      setSendState('sent');
      track('generate_lead', leadSource());
    } catch {
      // Backend unavailable or errored — show a clear error and offer the
      // visitor's own mail client so the message is never lost.
      setSendState('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/40 overflow-hidden relative">
      <LiquidNavBar />

      {/* Background Grid Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="pt-32 pb-20 px-6 md:px-16 max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16">
        
        {/* LEFT COLUMN: HEADERS & INFO */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <h1 className="text-[11vw] lg:text-[5.5vw] font-display font-semibold leading-[0.95] tracking-tight text-white mb-6">
              Get a <br /> <span className="text-purple-500">Project Estimate</span>
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-md leading-relaxed border-l-2 border-purple-500/30 pl-4">
              Tell us what you&apos;re building. We&apos;ll reply within one business day with an honest
              scope, a realistic timeline, and a fixed-scope estimate — no obligation.
            </p>
          </motion.div>

          {BOOKING_URL && (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('booking_start', leadSource())}
              className="mb-6 flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                Book a 30-minute call
              </span>
            </a>
          )}

          <div className="flex flex-col gap-4">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 p-4 rounded-xl transition-all duration-300 flex items-center justify-between"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-purple-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-black/50 flex items-center justify-center border border-white/10 group-hover:border-purple-500 text-purple-400">
                    <method.icon size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                      {method.label} · <span className={cn("text-green-500", method.status === "Idle" && "text-yellow-500")}>{method.status}</span>
                    </span>
                    <a
                      href={method.action}
                      onClick={() => track(method.event, leadSource())}
                      {...(method.action.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="text-lg font-bold font-mono text-white group-hover:text-purple-200 transition-colors"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>

                <button 
                  onClick={() => handleCopy(method.value, method.id)}
                  className="p-2 text-gray-500 hover:text-white transition-colors relative z-10"
                >
                  {copied === method.id ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </motion.div>
            ))}
          </div>

          {/* What an international buyer is actually checking before they write */}
          <div className="mt-10 border-t border-white/10 pt-8 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-purple-400 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-white font-semibold">We reply within one business day.</span>{' '}
                Our team works UTC+5, which overlaps the UK and European workday by four to six
                hours and US East Coast mornings by two to three.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={16} className="text-purple-400 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-white font-semibold">You own the code and the IP</span> from
                the first commit — your repository, your infrastructure, no proprietary framework
                lock-in. NDA available before the first call.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: "TERMINAL" FORM */}
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full h-full min-h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <Terminal size={12} className="text-purple-400" />
                <span className="text-[10px] font-mono text-gray-400">guest@codeeee-shell ~ contact-form</span>
              </div>
            </div>

            {/* Terminal Body (Form) */}
            <form onSubmit={handleSend} className="p-6 md:p-8 flex-1 font-mono text-sm flex flex-col gap-6">

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-name" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-email" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="contact-message" className="text-purple-400 text-xs uppercase tracking-wider mb-1">Project details</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="What are you building? Rough scope, timeline, and budget if you have them."
                  className="w-full h-full min-h-[150px] bg-white/[0.02] border border-white/5 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600 resize-none"
                />
              </div>

              {sendState === 'error' && (
                <p role="alert" className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3 leading-relaxed">
                  Something went wrong sending your message. Please{" "}
                  <a href={mailtoFallback} className="underline text-red-200 hover:text-white">email us directly</a>{" "}
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
                    <span>Message sent — thank you</span>
                    <CheckCircle2 size={16} />
                  </>
                ) : (
                  <>
                    <span>{sendState === 'sending' ? 'Sending…' : 'Send message'}</span>
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

            </form>
          </motion.div>
        </div>

      </div>
    </main>
  );
}