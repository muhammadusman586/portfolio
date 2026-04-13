import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, ExternalLink } from 'lucide-react';
import TerminalWindow from './TerminalWindow';

type Role = {
  company: string;
  title: string;
  type: string;
  period: string;
  current?: boolean;
  location?: string;
  summary?: string;
  bullets?: string[];
  stack?: string[];
  link?: string;
};

const roles: Role[] = [
  {
    company: 'RipeSeed',
    title: 'Associate Software Engineer',
    type: 'Full-time',
    period: 'Aug 2025 — Present',
    current: true,
    summary:
      'RipeSeed is an engineering-excellence firm building SaaS products for global clients.',
    bullets: [
      'Delivered full-stack features on client products using Next.js, React, Node.js, and MongoDB/PostgreSQL.',
      'Shipped merged PRs to open-source projects — Google\u2019s Gemini CLI and Open Mercato — resolving cross-platform bugs, validation flows, and authorization handling.',
      'Worked end-to-end: schema design, API layer, UI, and deploy.',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'TypeScript'],
    link: 'https://ripeseed.io',
  },
  {
    company: 'Sixlogics',
    title: 'Associate Software Engineer',
    type: 'Full-time · On-site',
    period: 'Mar 2025 — Aug 2025',
    bullets: [
      'Built and maintained full-stack web applications as part of a product engineering team.',
      'Collaborated across frontend and backend on feature delivery and code reviews.',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
];

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span className="text-accent">$</span>
            <span>tail -f EXPERIENCE.log</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-body">
            <span className="text-accent">#</span> experience
          </h2>
          <p className="text-muted text-sm max-w-2xl">
            Shipping full-stack products, leaning into open source, and obsessing
            over engineering quality.
          </p>
        </motion.div>

        <div className="mt-10">
          <TerminalWindow
            title="EXPERIENCE.log"
            motionProps={{
              initial: { opacity: 0, y: 20 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.15 },
            }}
          >
            <ol className="relative">
              <div className="absolute left-[9px] top-2 bottom-2 w-px bg-border" />

              {roles.map((role, i) => (
                <motion.li
                  key={`${role.company}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.15 }}
                  className="relative pl-9 pb-8 last:pb-0"
                >
                  <span
                    className={`absolute left-0 top-1 flex items-center justify-center w-5 h-5 rounded-full border ${
                      role.current
                        ? 'bg-accent/10 border-accent text-accent'
                        : 'bg-elevated border-border text-muted'
                    }`}
                  >
                    <Briefcase size={10} />
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-base font-semibold text-body">
                      {role.title}
                    </h3>
                    <span className="text-muted">@</span>
                    {role.link ? (
                      <a
                        href={role.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4"
                      >
                        {role.company}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-accent">{role.company}</span>
                    )}
                    {role.current && (
                      <span className="ml-1 inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded-md border border-accent/40 bg-accent/10 text-accent">
                        <span className="h-1 w-1 rounded-full bg-accent animate-pulse-dot" />
                        current
                      </span>
                    )}
                  </div>

                  <div className="mt-0.5 text-xs text-muted">
                    {role.type} <span className="text-border">·</span> {role.period}
                  </div>

                  {role.summary && (
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {role.summary}
                    </p>
                  )}

                  {role.bullets && (
                    <ul className="mt-3 space-y-1.5 text-sm text-muted">
                      {role.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2 leading-relaxed">
                          <span className="text-accent mt-0.5">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {role.stack && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {role.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[11px] rounded-md border border-border bg-elevated text-accent/90"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.li>
              ))}
            </ol>
          </TerminalWindow>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-6 font-mono text-xs text-muted flex flex-wrap items-center gap-2"
        >
          <span className="text-accent">→</span>
          <span>
            open-source work: <span className="text-accent">11 PRs opened · 9 merged</span>{' '}
            across Gemini CLI + Open Mercato
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
