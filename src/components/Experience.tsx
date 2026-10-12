import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { JOURNEY, slug } from '../data';
import { Rich, StationHeader } from './ui';

/** Rubber stamp that thuds onto the row when it scrolls into view. */
const Stamp = ({ big, small, id }: { big: string; small: string; id: string }) => (
  <motion.svg
    viewBox="0 0 120 120"
    aria-label={`${big} ${small}`}
    initial={{ scale: 2.4, opacity: 0, rotate: -40 }}
    whileInView={{ scale: 1, opacity: 0.9, rotate: -14 }}
    viewport={{ once: true, amount: 1 }}
    transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.25 }}
    className="pointer-events-none absolute right-4 top-6 hidden w-28 text-pink md:block lg:right-8 lg:w-32"
  >
    <defs>
      <path id={id} d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
    </defs>
    <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="2" />
    <text fill="currentColor" fontFamily="IBM Plex Mono" fontSize="9" fontWeight="700" letterSpacing="3">
      <textPath href={`#${id}`}>MU METRO · JOURNEY LOG · MU METRO · JOURNEY LOG ·</textPath>
    </text>
    <text x="60" y="62" textAnchor="middle" fill="currentColor" fontFamily="Bowlby One" fontSize="20">{big}</text>
    <text x="60" y="76" textAnchor="middle" fill="currentColor" fontFamily="IBM Plex Mono" fontSize="7" fontWeight="700">
      {small.toUpperCase()}
    </text>
  </motion.svg>
);

const Experience = () => (
  <section id="experience" className="relative px-4 py-24 sm:px-6 lg:pr-32">
    <StationHeader num="02" title="Experience" tag="journey log">
      Every stop so far, and what I shipped there.
    </StationHeader>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="border-[3px] border-ink bg-paper text-ink shadow-hard-lg"
    >
      <div className="hidden grid-cols-[170px_260px_1fr] gap-6 border-b-[3px] border-dashed border-paper bg-ink px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper md:grid">
        <span>When</span>
        <span>Where</span>
        <span>What landed</span>
      </div>

      {JOURNEY.map((r, i) => (
        <motion.article
          key={r.org}
          id={`role-${slug(r.org)}`}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 * i }}
          className="group relative grid gap-4 border-b-[3px] border-dashed border-ink/80 px-6 py-7 transition-colors last:border-b-0 hover:bg-[#fffde8] md:grid-cols-[170px_260px_1fr] md:gap-6 md:pr-40 lg:pr-48"
        >
          <span className="absolute inset-y-0 left-0 w-0 bg-pink transition-all duration-200 group-hover:w-2" />
          <div className="font-mono text-sm font-semibold">
            {r.when}{' '}
            {r.current && <span className="ml-1 animate-blink bg-pink px-1.5 py-0.5 text-[10px] font-bold text-paper">NOW</span>}
          </div>
          <div>
            <h3 className="text-lg font-extrabold leading-tight">{r.title}</h3>
            {r.link ? (
              <a href={r.link} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-0.5 text-sm text-muted underline underline-offset-2 hover:text-pink">
                {r.org} <ArrowUpRight size={14} />
              </a>
            ) : (
              <p className="text-sm text-muted">{r.org}</p>
            )}
            <span className="mt-3 block w-fit border-2 border-ink bg-lime px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
              {r.tag}
            </span>
          </div>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed marker:text-pink">
            {r.bullets.map((b) => (
              <li key={b}><Rich text={b} /></li>
            ))}
          </ul>
          {r.stamp && <Stamp {...r.stamp} id={`stamp-${i}`} />}
        </motion.article>
      ))}
    </motion.div>
  </section>
);

export default Experience;
