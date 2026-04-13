import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown, ArrowRight } from 'lucide-react';
import TerminalWindow from './TerminalWindow';

const lines: Array<{ cmd: string; out?: string }> = [
  { cmd: 'whoami', out: 'Muhammad Usman Ramzan' },
  { cmd: 'cat role.txt', out: 'Full-Stack Engineer · MERN · Next.js' },
  {
    cmd: 'echo $mission',
    out: 'Shipping SaaS products. Contributing to open source.',
  },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,255,127,0.10), transparent 60%)',
        }}
      />

      <div className="relative w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 font-mono text-xs text-muted flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span>currently @ RipeSeed</span>
          </span>
          <span className="hidden sm:inline text-border">·</span>
          <span>open-source contributor → Gemini CLI · Open Mercato</span>
        </motion.div>

        <TerminalWindow
          title="~/welcome.sh"
          accentGlow
          motionProps={{
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: 'easeOut' },
          }}
        >
          <div className="space-y-4 leading-relaxed">
            {lines.map((line, i) => (
              <motion.div
                key={line.cmd}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.25, duration: 0.35 }}
                className="space-y-1"
              >
                <div className="flex items-baseline gap-2 text-muted">
                  <span className="text-accent">$</span>
                  <span>{line.cmd}</span>
                </div>
                {line.out && (
                  <div
                    className={
                      i === 0
                        ? 'pl-4 text-2xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-body'
                        : i === 1
                        ? 'pl-4 text-base sm:text-lg text-accent'
                        : 'pl-4 text-sm text-muted'
                    }
                  >
                    {line.out}
                  </div>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.3 }}
              className="flex items-baseline gap-2 text-muted"
            >
              <span className="text-accent">$</span>
              <span className="text-accent animate-blink">▋</span>
            </motion.div>
          </div>
        </TerminalWindow>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-bg font-medium hover:bg-accent-dim transition-colors focus-ring"
          >
            <span>./view_projects</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href="/resume.pdf"
            download
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-body hover:border-accent hover:text-accent transition-colors focus-ring"
          >
            <FileDown size={16} />
            <span>./download_resume.pdf</span>
          </a>

          <div className="ml-auto flex items-center gap-2">
            <SocialChip
              href="https://github.com/muhammadusman586"
              label="gh"
              Icon={Github}
            />
            <SocialChip
              href="https://linkedin.com/in/muhammad-usman-ramzan-a97105247"
              label="in"
              Icon={Linkedin}
            />
            <SocialChip
              href="mailto:muhammadusmanramzan586@gmail.com"
              label="@"
              Icon={Mail}
              external={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

type ChipProps = {
  href: string;
  label: string;
  Icon: typeof Github;
  external?: boolean;
};

const SocialChip = ({ href, label, Icon, external = true }: ChipProps) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    aria-label={label}
    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent transition-colors focus-ring"
  >
    <Icon size={14} />
    <span className="text-xs">[{label}]</span>
  </a>
);

export default Hero;
