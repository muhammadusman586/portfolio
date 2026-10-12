import { motion } from 'framer-motion';
import { GitCommitHorizontal } from 'lucide-react';
import { LINKS, NOW } from '../data';
import { ago, useLastPush } from '../github';
import { StationHeader } from './ui';

const STATUS_CLASS: Record<string, string> = {
  Running: 'bg-signal text-ink',
  Arrived: 'bg-sky text-ink',
  Boarding: 'animate-blink bg-accent text-ink',
};

const Now = () => {
  const push = useLastPush();

  return (
    <section id="now" className="relative px-4 py-24 sm:px-6 lg:pr-32">
      <StationHeader num="06" title="Now" tag="live status">
        What’s on the board this month. Updated {NOW.updated}.
      </StationHeader>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="border-[3px] border-ink bg-board text-paper shadow-hard-lg"
      >
        <div className="hidden grid-cols-[140px_170px_1fr] gap-4 border-b-2 border-dashed border-paper/30 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper/60 sm:grid">
          <span>Status</span>
          <span>Service</span>
          <span>Destination</span>
        </div>
        <ul>
          {NOW.rows.map((r, i) => (
            <motion.li
              key={r.label}
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.18, duration: 0.45 }}
              className="grid gap-2 border-b-2 border-dashed border-paper/20 px-5 py-4 sm:grid-cols-[140px_170px_1fr] sm:items-center sm:gap-4"
            >
              <span className={`w-fit px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider ${STATUS_CLASS[r.status]}`}>{r.status}</span>
              <span className="font-mono text-sm font-bold uppercase tracking-wider text-amber">{r.label}</span>
              <span className="text-lg leading-snug">{r.text}</span>
            </motion.li>
          ))}
          <li className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_170px_1fr] sm:items-center sm:gap-4">
            <span className="w-fit bg-paper px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">Live</span>
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-amber">Last push</span>
            {push ? (
              <a
                href={`${LINKS.github}/${push.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 font-mono text-sm hover:text-signal"
              >
                <GitCommitHorizontal size={16} /> {push.repo} · {ago(push.when)}
              </a>
            ) : push === undefined ? (
              <span className="font-mono text-sm text-paper/50">checking GitHub…</span>
            ) : (
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="focus-ring font-mono text-sm hover:text-signal">
                See activity on GitHub →
              </a>
            )}
          </li>
        </ul>
      </motion.div>
    </section>
  );
};

export default Now;
