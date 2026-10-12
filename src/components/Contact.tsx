import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ArrowUpRight, Check, FileText, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { LINKS } from '../data';
import { StationHeader } from './ui';

const ROWS = [
  { Icon: Mail, label: 'Email', value: LINKS.email, copy: true },
  { Icon: Phone, label: 'Phone', value: LINKS.phone, href: `tel:${LINKS.phone.replace(/\s/g, '')}` },
  { Icon: Linkedin, label: 'LinkedIn', value: 'muhammadusman586', href: LINKS.linkedin },
  { Icon: Github, label: 'GitHub', value: 'muhammadusman586', href: LINKS.github },
  { Icon: FileText, label: 'Résumé', value: 'View PDF', href: LINKS.resume },
];

const CONFETTI = ['rgb(var(--accent))', 'rgb(var(--signal))', 'rgb(var(--deep))', 'rgb(var(--sky))', '#111111'];

/** One-shot confetti burst; remount (via key) to fire again. */
const Confetti = () => (
  <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 z-30">
    {Array.from({ length: 48 }, (_, i) => {
      const angle = (i / 48) * Math.PI * 2;
      const dist = 140 + Math.random() * 260;
      return (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist * 0.6 + 220,
            opacity: 0,
            rotate: Math.random() * 720 - 360,
          }}
          transition={{ duration: 1.6 + Math.random() * 0.8, ease: [0.2, 0.6, 0.4, 1] }}
          style={{ background: CONFETTI[i % CONFETTI.length] }}
          className="absolute h-3 w-1.5"
        />
      );
    })}
  </div>
);

const LocalTime = () => {
  const fmt = () =>
    new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: 'numeric', minute: '2-digit' });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span className="border-2 border-paper/50 px-2 py-0.5 font-mono text-xs text-paper">UTC+5 · {time}</span>;
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setStatus(null);
    try {
      await emailjs.sendForm('service_ip9n0e7', 'template_d1u3qzb', formRef.current, 'Czzp5xYYvbGvfYqIq');
      setStatus('success');
      setBurst((b) => b + 1);
      formRef.current.reset();
    } catch {
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  return (
    <section id="contact" className="relative px-4 pb-16 pt-24 sm:px-6 lg:pr-32">
      <StationHeader num="06" title="Contact" tag="terminus">
        Hiring a software engineer, or building something ambitious? Tell me what you’re working on.
      </StationHeader>

      <motion.div
        initial={{ opacity: 0, y: 60, rotate: 1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setBurst((b) => b || 1)}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="relative"
      >
        {burst > 0 && <Confetti key={burst} />}

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: -4 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.4 }}
          className="relative z-20 mx-auto -mb-6 w-fit border-b-[5px] border-r-[5px] border-accent bg-ink px-6 py-3 text-center"
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-paper">Station #06 · end of the line</p>
          <p className="bg-gradient-to-r from-accent via-signal to-sky bg-clip-text font-display text-3xl uppercase text-transparent sm:text-4xl">
            Terminus!
          </p>
        </motion.div>

        {/* board with marquee bulbs */}
        <div className="relative border-[6px] border-[#e9dfc4] bg-board p-5 pt-10 shadow-hard-lg sm:p-8 sm:pt-12">
          <div aria-hidden className="absolute inset-x-6 -top-3 flex justify-between">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                style={{ animationDelay: `${(i % 2) * 0.6}s` }}
                className="h-4 w-4 animate-blink rounded-full border-2 border-ink bg-amber shadow-[0_0_10px_#FFB938]"
              />
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:divide-x-2 lg:divide-dashed lg:divide-paper/30">
            <div className="min-w-0 lg:pr-10">
              <span className="inline-block -rotate-2 border-[3px] border-ink bg-signal px-3 py-1 font-display text-xl text-ink shadow-hard-sm">
                Reach me →
              </span>
              <ul className="mt-6 space-y-3">
                {ROWS.map(({ Icon, label, value, href, copy }) => (
                  <li key={label} className="group flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink bg-paper text-ink transition-transform group-hover:-rotate-6">
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-bold text-paper">{label}</p>
                      <p className="truncate font-mono text-xs text-paper/70">{value}</p>
                    </div>
                    {copy ? (
                      <button onClick={copyEmail} className="focus-ring min-w-[76px] border-2 border-ink bg-[#e9dfc4] text-ink px-2 py-1 font-mono text-[11px] font-bold uppercase">
                        {copied ? <span className="inline-flex items-center gap-1"><Check size={12} />Copied</span> : 'Copy'}
                      </button>
                    ) : (
                      <a
                        href={href}
                        target={href!.startsWith('http') || href!.endsWith('.pdf') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex items-center gap-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-paper hover:text-signal"
                      >
                        Open <ArrowUpRight size={12} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-sans text-xs font-extrabold uppercase tracking-[0.3em] text-paper/70">Based in</p>
              <p className="mt-2 flex flex-wrap items-center gap-3 font-mono text-paper">
                <MapPin size={16} /> Lahore, Pakistan <LocalTime />
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 lg:pl-10">
              <p className="font-marker text-2xl text-signal">↪ Send a message</p>
              {[
                { name: 'name', label: 'Name', type: 'text', ph: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', ph: 'you@company.com' },
              ].map((f) => (
                <label key={f.name} className="block border-[3px] border-ink bg-[#f3ead2] px-3 py-2 text-ink focus-within:outline focus-within:outline-[3px] focus-within:outline-accent">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                    {f.label} <span className="text-accent">*</span>
                  </span>
                  <input name={f.name} type={f.type} required placeholder={f.ph} className="block w-full bg-transparent font-mono text-sm outline-none placeholder:text-ink/40" />
                </label>
              ))}
              <label className="block border-[3px] border-ink bg-[#f3ead2] px-3 py-2 text-ink focus-within:outline focus-within:outline-[3px] focus-within:outline-accent">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                  Message <span className="text-accent">*</span>
                </span>
                <textarea name="message" required rows={4} placeholder="What are you building?" className="block w-full resize-y bg-transparent font-mono text-sm outline-none placeholder:text-ink/40" />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <AnimatePresence mode="wait">
                  {status && (
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      className={`font-mono text-xs font-bold uppercase ${status === 'success' ? 'text-signal' : 'text-accent'}`}
                    >
                      {status === 'success' ? '✓ Delivered. I’ll reply soon.' : '✗ Send failed. Please retry.'}
                    </motion.p>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={sending} className="btn focus-ring ml-auto bg-signal normal-case tracking-normal disabled:cursor-wait disabled:opacity-60">
                  <Send size={16} /> {sending ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <span className="absolute -bottom-5 left-4 -rotate-3 border-[3px] border-ink bg-accent text-ink px-4 py-2 font-display text-lg shadow-hard sm:text-2xl">
          Let’s build something!
        </span>
      </motion.div>
    </section>
  );
};

export default Contact;
