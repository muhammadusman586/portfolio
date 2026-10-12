import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ExternalLink, Github, Server, Ticket as TicketIcon, X } from 'lucide-react';
import { PROJECTS, slug, type Project } from '../data';
import { play } from '../sound';
import { Rich, StationHeader } from './ui';

const BG: Record<Project['color'], string> = {
  pink: 'bg-pink',
  lime: 'bg-lime',
  cyan: 'bg-cyan',
  blue: 'bg-blue text-paper',
};

/** Full write-up in a native <dialog>: focus trap, Esc to close and backdrop come for free. */
const BuildNotes = ({ p, onClose }: { p: Project; onClose: () => void }) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => ref.current?.showModal(), []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-label={`${p.title} build notes`}
      className="m-auto max-h-[90vh] w-[min(92vw,760px)] overflow-y-auto border-[4px] border-ink bg-paper p-0 text-ink shadow-[12px_12px_0_#FF3EA5] backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <motion.div initial={{ opacity: 0, y: 40, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
        <header className={`flex items-center justify-between border-b-[3px] border-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] ${BG[p.color]}`}>
          <span>Build notes · {p.line}</span>
          <button onClick={() => ref.current?.close()} aria-label="Close" className="focus-ring grid h-8 w-8 place-items-center border-2 border-ink bg-paper">
            <X size={16} />
          </button>
        </header>
        <img src={p.image} alt={`${p.title} screenshot`} className="aspect-[16/8] w-full border-b-[3px] border-ink object-cover object-top" decoding="async" />
        <div className="space-y-6 p-5 sm:p-7">
          <h3 className="font-display text-4xl uppercase leading-none [text-shadow:3px_3px_0_#FF3EA5]">{p.title}</h3>
          <section>
            <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted">What it does</h4>
            <p className="text-lg leading-relaxed">{p.description}</p>
          </section>
          <section>
            <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted">What I built</h4>
            <ul className="list-disc space-y-1.5 pl-5 leading-relaxed marker:text-pink">
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
                  <li key={t} className="border-2 border-ink bg-lime px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase">{t}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4 className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted">Deployed on</h4>
              <p className="flex items-center gap-2 font-mono text-sm font-bold"><Server size={16} /> {p.host}</p>
            </section>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn focus-ring bg-pink"><ExternalLink size={16} /> Open live app</a>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn focus-ring bg-paper"><Github size={16} /> Read the code</a>
          </div>
        </div>
      </motion.div>
    </dialog>
  );
};

/** A transit ticket: punch it to swap the screenshot for links; open the build notes for the full story. */
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
              className="absolute inset-0 flex flex-col justify-between bg-board p-4 text-paper"
            >
              <p className="text-sm leading-relaxed">{p.description}</p>
              <div className="flex gap-2">
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1 border-2 border-paper bg-lime px-2 py-1 font-mono text-[11px] font-bold uppercase text-ink">
                  <ExternalLink size={12} /> Live
                </a>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1 border-2 border-paper px-2 py-1 font-mono text-[11px] font-bold uppercase">
                  <Github size={12} /> Code
                </a>
              </div>
            </motion.div>
          ) : (
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
          )}
        </AnimatePresence>
        <span className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-lime">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-lime" /> LIVE
        </span>
      </div>

      <div className="px-4 pb-4">
        <h3 className="font-display text-3xl uppercase leading-none [text-shadow:2px_2px_0_#FF3EA5]">{p.title}</h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">{p.line}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <li key={t} className="border-2 border-ink px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase">{t}</li>
          ))}
        </ul>
        <button
          onClick={() => setNotes(true)}
          className="focus-ring group mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider underline decoration-pink decoration-2 underline-offset-4 hover:text-pink"
        >
          <BookOpen size={14} /> Open the build notes
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* perforation with side notches */}
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
            onClick={() => (play('punch'), setPunched(!punched))}
            whileTap={{ scale: 0.9, rotate: -4 }}
            className="focus-ring inline-flex items-center gap-1.5 border-[3px] border-ink bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-lime"
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
      Things I built end to end. Punch a ticket for the build notes, the live app and the code.
    </StationHeader>
    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
      {PROJECTS.map((p, i) => (
        <Ticket key={p.title} p={p} i={i} />
      ))}
    </div>
  </section>
);

export default Projects;
