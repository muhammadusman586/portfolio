import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ExternalLink, Github, Lock, Server, Ticket as TicketIcon, X } from 'lucide-react';
import { PROJECTS, slug, type Project } from '../data';
import { haptic } from '../prefs';
import { play } from '../sound';
import { Rich, StationHeader } from './ui';

const BG: Record<Project['color'], string> = {
  accent: 'bg-accent',
  signal: 'bg-signal',
  sky: 'bg-sky',
  deep: 'bg-deep text-paper',
};

const FlowCover = ({ p, big = false }: { p: Project; big?: boolean }) => (
  <div
    role="img"
    aria-label={`${p.title} data flow: ${p.flow!.join(' → ')}`}
    className={`flex flex-col justify-center bg-board text-paper ${big ? 'aspect-[16/7] border-b-[3px] border-ink' : 'absolute inset-0'}`}
  >
    <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/50">Route map</span>
    <div className="relative mx-10">
      <div className="absolute inset-x-0 top-[10px] h-2 bg-signal" />
      {/* CSS animation: the parent AnimatePresence initial={false} would freeze a Framer one */}
      <span className="absolute top-[5px] h-[18px] w-7 -translate-x-1/2 animate-shuttle rounded-sm border-[3px] border-ink bg-paper motion-reduce:animate-none" />
      <ol className="relative flex justify-between">
        {p.flow!.map((stop, i) => (
          <li key={stop} className="relative flex w-0 flex-col items-center">
            <span className="relative z-10 block h-7 w-7 shrink-0 rounded-full border-[4px] border-ink bg-paper" />
            <span
              className={`absolute w-20 text-center font-mono font-bold uppercase leading-tight ${big ? 'text-xs' : 'text-[10px]'} ${
                i % 2 ? 'top-9' : 'bottom-9'
              }`}
            >
              {stop}
            </span>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

const NoSource = () => (
  <p className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider opacity-70">
    <Lock size={12} /> Client work · source is private
  </p>
);

const BuildNotes = ({ p, onClose }: { p: Project; onClose: () => void }) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-label={`${p.title} build notes`}
      className="m-auto max-h-[90vh] w-[min(92vw,760px)] overflow-y-auto border-[4px] border-ink bg-paper p-0 text-ink shadow-[12px_12px_0_rgb(var(--accent))] backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <motion.div initial={{ opacity: 0, y: 40, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
        <header className={`flex items-center justify-between border-b-[3px] border-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] ${BG[p.color]}`}>
          <span>Build notes · {p.line}</span>
          <button onClick={() => ref.current?.close()} aria-label="Close" className="focus-ring grid h-8 w-8 place-items-center border-2 border-ink bg-paper">
            <X size={16} />
          </button>
        </header>
        {p.image ? (
          <img src={p.image} alt={`${p.title} screenshot`} className="aspect-[16/8] w-full border-b-[3px] border-ink object-cover object-top" decoding="async" />
        ) : (
          <div className="relative">
            <FlowCover p={p} big />
          </div>
        )}
        <div className="space-y-6 p-5 sm:p-7">
          <div>
            <h3 className="font-display text-4xl uppercase leading-none [text-shadow:3px_3px_0_rgb(var(--accent))]">{p.title}</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{p.meta}</p>
          </div>
          <section>
            <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted">What it does</h4>
            <p className="text-lg leading-relaxed">{p.description}</p>
          </section>
          <section>
            <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted">What I built</h4>
            <ul className="list-disc space-y-1.5 pl-5 leading-relaxed marker:text-accent">
              {p.built.map((b) => (
                <li key={b}><Rich text={b} /></li>
              ))}
            </ul>
          </section>
          <div className="grid gap-4 sm:grid-cols-2">
            <section>
              <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted">Stack</h4>
              <ul className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <li key={t} className="border-2 border-ink bg-signal px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase">{t}</li>
                ))}
              </ul>
            </section>
            {p.host && (
              <section>
                <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted">Deployed on</h4>
                <p className="flex items-center gap-2 font-mono text-sm font-bold"><Server size={16} /> {p.host}</p>
              </section>
            )}
          </div>
          {p.demo || p.github ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn focus-ring bg-accent"><ExternalLink size={16} /> Open live app</a>}
              {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn focus-ring bg-paper"><Github size={16} /> Read the code</a>}
            </div>
          ) : (
            <NoSource />
          )}
        </div>
      </motion.div>
    </dialog>
  );
};

const Ticket = ({ p, i }: { p: Project; i: number }) => {
  const [punched, setPunched] = useState(false);
  const [notes, setNotes] = useState(false);
  const tilt = i % 2 ? 2 : -2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 80, rotate: tilt * 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 160, damping: 18, delay: i * 0.12 }}
      whileHover={{ rotate: 0, y: -10 }}
      id={`ticket-${slug(p.title)}`}
      className="relative flex flex-col border-[3px] border-ink bg-paper text-ink shadow-hard-lg"
    >
      {notes && <BuildNotes p={p} onClose={() => setNotes(false)} />}
      <header className={`flex items-center justify-between border-b-[3px] border-ink px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${BG[p.color]}`}>
        <span>MU Metro</span>
        <span>Line {String(i + 1).padStart(2, '0')} · Admit one</span>
      </header>

      <div className="relative m-4 aspect-[16/10] overflow-hidden border-[3px] border-ink bg-ink">
        <AnimatePresence initial={false} mode="popLayout">
          {punched ? (
            <motion.div
              key="notes"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute inset-0 flex flex-col justify-between bg-board p-4 pt-10 text-paper"
            >
              <p className="text-sm leading-relaxed">{p.description}</p>
              {p.demo || p.github ? (
                <div className="flex gap-2">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1 border-2 border-paper bg-signal px-2 py-1 font-mono text-[11px] font-bold uppercase text-ink">
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1 border-2 border-paper px-2 py-1 font-mono text-[11px] font-bold uppercase">
                      <Github size={12} /> Code
                    </a>
                  )}
                </div>
              ) : (
                <NoSource />
              )}
            </motion.div>
          ) : p.image ? (
            <motion.img
              key="shot"
              src={p.image}
              alt={`${p.title} screenshot`}
              loading="lazy"
              decoding="async"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <motion.div
              key="flow"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute inset-0"
            >
              <FlowCover p={p} />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-signal">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" /> {p.demo ? 'LIVE' : 'IN PRODUCTION'}
        </span>
      </div>

      <div className="px-4 pb-4">
        <h3 className="font-display text-3xl uppercase leading-none [text-shadow:2px_2px_0_rgb(var(--accent))]">{p.title}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">{p.line} · {p.meta}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <li key={t} className="border-2 border-ink px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase">{t}</li>
          ))}
        </ul>
        <button
          onClick={() => setNotes(true)}
          className="focus-ring group mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
        >
          <BookOpen size={14} /> Open the build notes
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      <div className="relative mt-auto border-t-[3px] border-dashed border-ink">
        <span className="absolute -left-[15px] -top-[13px] h-6 w-6 rounded-full border-[3px] border-ink bg-bg [clip-path:inset(0_0_0_50%)]" />
        <span className="absolute -right-[15px] -top-[13px] h-6 w-6 rounded-full border-[3px] border-ink bg-bg [clip-path:inset(0_50%_0_0)]" />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="h-8 flex-1 bg-[repeating-linear-gradient(90deg,#111_0_3px,transparent_3px_5px,#111_5px_6px,transparent_6px_9px)]" />
        <div className="relative">
          <AnimatePresence>
            {punched && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -left-7 top-1/2 h-5 w-5 -mt-2.5 rounded-full border-2 border-ink bg-bg"
              />
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => (play('punch'), haptic(20), setPunched(!punched))}
            whileTap={{ scale: 0.9, rotate: -4 }}
            className="focus-ring inline-flex items-center gap-1.5 border-[3px] border-ink bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-signal"
            aria-pressed={punched}
          >
            <TicketIcon size={14} /> {punched ? 'Back' : 'Punch'}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="relative px-4 py-24 sm:px-6 lg:pr-32">
    <StationHeader num="03" title="Projects" tag="tickets">
      Production work from RipeSeed plus a personal build. Punch a ticket for the summary, or open the build notes for the full route.
    </StationHeader>
    <div className="grid gap-10 md:grid-cols-2">
      {PROJECTS.map((p, i) => (
        <Ticket key={p.title} p={p} i={i} />
      ))}
    </div>
  </section>
);

export default Projects;
