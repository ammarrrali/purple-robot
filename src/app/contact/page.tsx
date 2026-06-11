'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LiquidNavBar } from '@/components/ui/liquid-navbar';
import { Mail, Smartphone, Instagram, Copy, Terminal, Send, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- CONTACT DATA ---
const contactMethods = [
  {
    id: "phone",
    label: "SECURE_UPLINK",
    value: "+92 336 1287518",
    action: "tel:+923361287518",
    icon: Smartphone,
    status: "Active",
  },
  {
    id: "email",
    label: "PACKET_RELAY",
    value: "info@codeeee.com",
    action: "mailto:info@codeeee.com",
    icon: Mail,
    status: "Idle",
  },
  {
    id: "insta",
    label: "VISUAL_FEED",
    value: "@codeeeelabs",
    action: "https://instagram.com/codeeeelabs",
    icon: Instagram,
    status: "Live",
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

  const [sendState, setSendState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendState !== 'idle') return;
    setSendState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('send failed');
      setSendState('sent');
    } catch {
      // Backend unavailable (e.g. email service not configured) — fall back
      // to the visitor's own mail client so the message is never lost.
      const subject = encodeURIComponent(`Project inquiry from ${name || 'website visitor'}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`);
      window.location.href = `mailto:info@codeeee.com?subject=${subject}&body=${body}`;
      setSendState('idle');
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
            <h1 className="text-[12vw] lg:text-[6vw] font-black leading-[0.8] tracking-tighter uppercase italic text-white mb-6">
              INITIATE <br /> <span className="text-purple-600">CONNECTION</span>
            </h1>
            <p className="text-sm font-mono text-gray-400 max-w-md leading-relaxed border-l-2 border-purple-500/30 pl-4">
              Our neural network is listening. Establish a secure handshake via the endpoints below for project inquiries or architectural consultation.
            </p>
          </motion.div>

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
                      {method.label} // <span className={cn("text-green-500", method.status === "Idle" && "text-yellow-500")}>{method.status}</span>
                    </span>
                    <a href={method.action} className="text-lg font-bold font-mono text-white group-hover:text-purple-200 transition-colors">
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
                <label htmlFor="contact-name" className="text-purple-500 text-xs uppercase tracking-wider mb-1 opacity-80">{`// ENTER_IDENTITY`}</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Input.Name('Guest')"
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="contact-email" className="text-purple-500 text-xs uppercase tracking-wider mb-1 opacity-80">{`// RETURN_ADDRESS`}</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Input.Email('guest@domain.com')"
                  className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="contact-message" className="text-purple-500 text-xs uppercase tracking-wider mb-1 opacity-80">{`// MESSAGE_PAYLOAD`}</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Console.log('Project details...')"
                  className="w-full h-full min-h-[150px] bg-white/[0.02] border border-white/5 rounded-lg p-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-700 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sendState !== 'idle'}
                className="group w-full py-4 bg-white text-black font-black uppercase italic tracking-wider hover:bg-purple-600 hover:text-white transition-all rounded-lg flex items-center justify-center gap-2 disabled:opacity-80"
              >
                {sendState === 'sent' ? (
                  <>
                    <span>Transmission_Confirmed</span>
                    <CheckCircle2 size={16} className="text-green-600" />
                  </>
                ) : (
                  <>
                    <span>{sendState === 'sending' ? 'Transmitting...' : 'Execute_Send'}</span>
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