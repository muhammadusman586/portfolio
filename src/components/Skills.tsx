import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import { LINES, PROJECTS, USED_IN, slug } from '../data';
import { flashTo } from '../dom';
import { StationHeader } from './ui';

const isProject = (name: string) => PROJECTS.some((p) => p.title === name);
const targetId = (name: string) => `${isProject(name) ? 'ticket' : 'role'}-${slug(name)}`;
// The deep line colour is dark in every theme, so its labels need light text.
const onDeep = (color: string) => (color.includes('--deep') || color === '#111111' ? 'text-paper' : '');

/** Tech stack drawn as a transit map: each line is a domain, each stop a tool. Click a stop to see where it was used. */
const Skills = () => {
  const [focus, setFocus] = useState<string | null>(null);
  const [picked, setPicked] = useState<{ stop: string; color: string } | null>(null);

  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 lg:pr-32">
      <StationHeader num="04" title="Stack" tag="line map">
        My tools as a transit map: every line a domain, every stop something I ship with. Click a stop to see where I used it.
      </StationHeader>

      <div className="space-y-6 border-[3px] border-ink bg-paper p-5 text-ink shadow-hard-lg sm:p-8">
        {LINES.map((line, li) => (
          <div
            key={line.name}
            onMouseEnter={() => setFocus(line.name)}
            onMouseLeave={() => setFocus(null)}
            className={`grid items-start gap-4 transition-opacity duration-300 sm:grid-cols-[200px_1fr] ${
              focus && focus !== line.name ? 'opacity-25' : ''
            }`}
          >
            <div className="flex items-center gap-3 pt-1">
              <motion.span
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{ background: line.color }}
                className={`${onDeep(line.color)} grid h-10 w-10 shrink-0 place-items-center rounded-full border-[3px] border-ink font-display text-lg`}
              >
                {line.code}
              </motion.span>
              <span className="font-sans text-sm font-extrabold uppercase tracking-[0.2em]">{line.name}</span>
            </div>

            <div className="relative pb-2 pt-3">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: li * 0.15, ease: [0.65, 0, 0.35, 1] }}
                style={{ background: line.color }}
                className="absolute left-2 right-2 top-[22px] h-3 origin-left border-y-[3px] border-ink"
              />
              {/* a little car looping along the line */}
              <motion.span
                animate={{ left: ['0%', '96%'] }}
                transition={{ duration: 6 + li, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="absolute top-[19px] h-[18px] w-7 rounded-sm border-[3px] border-ink bg-paper"
              />
              <ul className="relative flex justify-between">
                {line.stops.map((stop, si) => {
                  const on = picked?.stop === stop;
                  return (
                    <motion.li
                      key={stop}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.4 + li * 0.15 + si * 0.08 }}
                      className="w-16 sm:w-24"
                    >
                      <button
                        onClick={() => setPicked(on ? null : { stop, color: line.color })}
                        aria-pressed={on}
                        className="group focus-ring flex w-full flex-col items-center"
                      >
                        <span
                          className={`relative z-10 block h-6 w-6 rounded-full border-[4px] border-ink transition-transform duration-200 group-hover:scale-150 ${
                            on ? 'scale-150 bg-signal' : 'bg-paper group-hover:bg-signal'
                          }`}
                        />
                        <span
                          className={`mt-2 text-center text-[11px] font-bold leading-tight transition-colors group-hover:text-accent sm:text-sm ${
                            on ? 'text-accent' : ''
                          }`}
                        >
                          {stop}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}

        <div className="min-h-[72px] border-t-[3px] border-dashed border-ink pt-4" aria-live="polite">
          <AnimatePresence mode="wait">
            {picked ? (
              <motion.div
                key={picked.stop}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-wrap items-center gap-2"
              >
                <span style={{ background: picked.color }} className={`${onDeep(picked.color)} border-2 border-ink px-2 py-1 font-display text-lg leading-none`}>
                  {picked.stop}
                </span>
                {USED_IN[picked.stop]?.length ? (
                  <>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">used at →</span>
                    {USED_IN[picked.stop].map((name) => (
                      <button
                        key={name}
                        onClick={() => flashTo(targetId(name))}
                        className="focus-ring border-2 border-ink bg-paper px-2 py-1 font-mono text-xs font-bold uppercase shadow-hard-sm transition-transform hover:-translate-y-0.5 hover:bg-signal"
                      >
                        {isProject(name) ? 'Ticket · ' : 'Job · '}
                        {name}
                      </button>
                    ))}
                  </>
                ) : (
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">part of my everyday toolkit</span>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
              >
                <MousePointerClick size={14} /> Pick any stop to see where it was used
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
