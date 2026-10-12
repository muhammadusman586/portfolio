import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { StationHeader } from './ui';

const FACTS = [
  ['Home zone', 'Lahore, PK'],
  ['Line', 'Full-stack'],
  ['Stops at', 'TS · Next · Postgres'],
  ['Specialty', 'Integrations'],
];

/** Photo ID styled as a transit pass: tilts toward the cursor, click to flip. */
const MetroPass = () => {
  const [flipped, setFlipped] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const flip = useSpring(0, { stiffness: 140, damping: 18 });
  const rotateY = useTransform([mx, flip], ([x, f]: number[]) => x * 24 + f);
  const rotateX = useTransform(my, [-0.5, 0.5], [12, -12]);

  const toggle = () => {
    setFlipped(!flipped);
    flip.set(flipped ? 0 : 180);
  };

  return (
    <div className="[perspective:1200px]">
      <motion.button
        onClick={toggle}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => (mx.set(0), my.set(0))}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="focus-ring relative mx-auto block aspect-[3/4.2] w-full max-w-[320px] text-left"
        aria-label={flipped ? 'Show pass front' : 'Show pass back'}
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col border-[3px] border-ink bg-paper text-ink shadow-hard-lg [backface-visibility:hidden]">
          <div className="flex items-center justify-between bg-blue px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper">
            <span>MU Metro</span>
            <span>Monthly pass</span>
          </div>
          <div className="relative m-4 mb-3 flex-1 overflow-hidden border-[3px] border-ink">
            <img src="/images/Usman.jpg" alt="Muhammad Usman" loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_62%]" />
            <span className="absolute bottom-2 right-2 -rotate-12 border-2 border-pink px-2 font-display text-sm text-pink">VALID</span>
          </div>
          <div className="px-4 pb-4">
            <p className="font-display text-2xl leading-none">MUHAMMAD USMAN</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">Software engineer · Zone LHR</p>
            <div className="mt-3 h-6 bg-[repeating-linear-gradient(90deg,#111_0_2px,transparent_2px_4px,#111_4px_7px,transparent_7px_9px)]" />
          </div>
        </div>

        {/* back */}
        <div className="absolute inset-0 flex flex-col justify-between border-[3px] border-ink bg-lime p-5 text-ink shadow-hard-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]">Passenger details</p>
            <dl className="mt-4 space-y-3">
              {FACTS.map(([k, v]) => (
                <div key={k} className="border-b-2 border-dashed border-ink pb-2">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-ink/70">{k}</dt>
                  <dd className="font-display text-lg leading-tight">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="font-marker text-blue">valid for ambitious products →</p>
        </div>
      </motion.button>
      <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg/60">
        <RotateCw size={12} /> tap the pass to flip
      </p>
    </div>
  );
};

const About = () => (
  <section id="about" className="relative px-4 py-24 sm:px-6 lg:pr-32">
    <StationHeader num="01" title="About" tag="metro pass">
      Who’s riding, and where they’re headed.
    </StationHeader>

    <div className="grid items-center gap-14 lg:grid-cols-[340px_1fr]">
      <MetroPass />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 text-lg leading-relaxed"
      >
        <p className="text-2xl leading-snug">
          I’m a full-stack engineer working in{' '}
          <span className="hl">TypeScript, Next.js, React, Node.js and PostgreSQL</span>.
        </p>
        <p>
          Most of my experience is in <strong>integration-heavy work</strong>: OAuth flows, third-party APIs,
          webhooks and background jobs.
        </p>
        <p>
          I care about <strong>clean data models</strong>, <strong>typed code</strong> and systems that{' '}
          <strong>handle errors properly</strong> rather than only working on the happy path. I pick up new tools
          quickly and I’m comfortable owning a feature from the API design through to the UI.
        </p>
        <p>CS from FAST Lahore, 2025.</p>
        <div className="flex flex-wrap gap-3 pt-2">
          {[
            ['E2E', 'API design → UI'],
            ['FAST', 'CS · 2025'],
          ].map(([n, l], i) => (
            <motion.div
              key={l}
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.2 + i * 0.1 }}
              whileHover={{ rotate: 0, y: -4 }}
              className="border-[3px] border-ink bg-paper px-4 py-2 text-ink shadow-hard-sm"
            >
              <span className="font-display text-3xl">{n}</span>{' '}
              <span className="font-mono text-xs uppercase tracking-wider">{l}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
