import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { ArrowDown, FileDown } from 'lucide-react';
import { LINKS } from '../data';
import { play } from '../sound';
import Train from './Train';

const DESTINATIONS = ['SOFTWARE ENGINEER', 'NEXT.JS + REACT', 'NODE + EXPRESS', 'OAUTH + WEBHOOKS', 'SAAS PRODUCTS'];
const WIDTH = 19;
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+.';

/** Split-flap board: characters scramble, then settle left to right. */
const SplitFlap = ({ text }: { text: string }) => {
  const target = text.padEnd(WIDTH).slice(0, WIDTH);
  const [shown, setShown] = useState(target);

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const next = [...target]
        .map((ch, i) => (frame > i + 4 || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join('');
      setShown(next);
      if (next === target) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex gap-[2px] sm:gap-[3px]">
      <span className="sr-only">{text}</span>
      {[...shown].map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="relative grid h-7 w-[0.875rem] place-items-center rounded-[2px] bg-[#222] font-mono text-sm font-bold text-amber after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-black/70 sm:h-9 sm:w-6 sm:text-lg"
        >
          {ch}
        </span>
      ))}
    </div>
  );
};

const ago = (iso: string) => {
  const m = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
  return m < 60 ? `${m}m ago` : m < 1440 ? `${Math.round(m / 60)}h ago` : `${Math.round(m / 1440)}d ago`;
};

/** Latest public push from GitHub, or null (rate-limited, offline, no recent pushes). */
const useLastPush = () => {
  const [push, setPush] = useState<{ repo: string; when: string } | null>(null);
  useEffect(() => {
    const user = LINKS.github.split('/').pop();
    fetch(`https://api.github.com/users/${user}/events/public?per_page=30`)
      .then((r) => (r.ok ? r.json() : []))
      .then((events: { type: string; repo: { name: string }; created_at: string }[]) => {
        const e = events.find((ev) => ev.type === 'PushEvent');
        if (e) setPush({ repo: e.repo.name.split('/')[1], when: e.created_at });
      })
      .catch(() => {});
  }, []);
  return push;
};

const Hero = () => {
  const [dest, setDest] = useState(0);
  const [toot, setToot] = useState(false);
  const train = useAnimationControls();
  const lastPush = useLastPush();
  const clicks = useRef<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => setDest((d) => (d + 1) % DESTINATIONS.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    train.start({ x: 0, transition: { duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] } });
  }, [train]);

  // Click the train: it departs right and the next one pulls in from the left.
  const depart = async () => {
    // five clicks within 3s = rush hour easter egg
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < 3000), now];
    if (clicks.current.length >= 5) {
      clicks.current = [];
      window.dispatchEvent(new Event('rushhour'));
    }
    play('toot');
    setToot(true);
    await train.start({ x: '120vw', transition: { duration: 0.9, ease: [0.7, 0, 0.84, 0] } });
    train.set({ x: '-120vw' });
    setToot(false);
    await train.start({ x: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } });
  };

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:pr-32">
      {/* skyline silhouette */}
      <svg aria-hidden viewBox="0 0 1200 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[28%] h-48 w-full text-fg/[0.07]">
        <path
          fill="currentColor"
          d="M0 200V120h60V80h40v40h50V50h30v-20h20v20h30v150h40V90h70v110h30V60h50v-30h20v30h30v140h40V100h60v100h30V40h40v160h50V110h60V70h30v130h40V90h50v110h40V60h30v-20h20v20h30v140h50V120h60v80h40V80h40v120z"
        />
      </svg>

      <div className="relative">
        <motion.ul
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          {['Software engineer', 'Integrations & APIs', 'TypeScript · Next.js'].map((c, i) => (
            <motion.li
              key={c}
              variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 } }}
              className={`label ${i === 1 ? 'bg-lime' : ''}`}
            >
              {c}
            </motion.li>
          ))}
        </motion.ul>

        <div className="relative inline-block">
          <h1 className="poster text-[clamp(4.5rem,19vw,15rem)]" aria-label="Muhammad Usman">
            {'USMAN'.split('').map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block"
                initial={{ y: '-1.2em', rotate: -10, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 16, delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -14, rotate: i % 2 ? 6 : -6, transition: { type: 'spring', stiffness: 600, damping: 10 } }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <motion.span
            aria-hidden
            initial={{ scale: 0, rotate: 30 }}
            animate={{ scale: 1, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.7 }}
            style={{ x: '25%' }}
            className="absolute -top-8 right-0 border-[3px] border-ink bg-pink text-ink px-3 py-1 font-display text-[clamp(1rem,3vw,2.25rem)] leading-none shadow-hard sm:-top-14"
          >
            MUHAMMAD
          </motion.span>
        </div>

        {/* track + train */}
        <div className="relative mt-2 h-16">
          <div className="absolute inset-x-0 bottom-3 h-[6px] bg-fg" />
          <div className="absolute inset-x-0 bottom-0 h-3 bg-[repeating-linear-gradient(90deg,rgb(var(--fg))_0_6px,transparent_6px_22px)] opacity-60" />
          <motion.button
            initial={{ x: '-120vw' }}
            animate={train}
            onClick={depart}
            onHoverStart={() => setToot(true)}
            onHoverEnd={() => setToot(false)}
            className="focus-ring absolute bottom-[14px] right-0 w-44 sm:w-56"
            aria-label="Send the train off" title="Click me (try five times)"
          >
            <Train className="w-full animate-bob" />
            <AnimatePresence>
              {toot && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.4, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  className="absolute -top-10 right-2 rotate-6 whitespace-nowrap border-2 border-ink bg-lime px-2 py-0.5 font-marker text-sm text-ink"
                >
                  toot toot!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <p className="max-w-xl text-xl leading-relaxed sm:text-2xl">
              I’m a software engineer building full-stack products in TypeScript,{' '}
              <span className="hl">from the data model to the UI</span>. At <strong>RipeSeed</strong> I own the
              integration-heavy parts:{' '}
              <span className="hl">OAuth, webhooks and background jobs that keep working when a third-party API doesn’t</span>.
            </p>
            <a href="#about" className="mt-6 inline-flex -rotate-3 items-center gap-1 font-marker text-lg text-pink">
              scroll to board <ArrowDown size={18} className="animate-bounce" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 4, y: 30 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 18 }}
            className="lg:justify-self-end"
          >
            <div className="border-[3px] border-ink bg-board p-4 shadow-hard">
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-paper/70">
                <span>Next departure</span>
                <span className="text-lime">Platform 1</span>
              </div>
              <SplitFlap text={DESTINATIONS[dest]} />
              {lastPush && (
                <a
                  href={`${LINKS.github}/${lastPush.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-3 flex items-center gap-2 border-t border-dashed border-paper/30 pt-3 font-mono text-[11px] uppercase tracking-wider text-paper/80 hover:text-lime"
                >
                  <span className="h-2 w-2 animate-blink rounded-full bg-lime" />
                  Last departure: pushed to <span className="font-bold text-lime">{lastPush.repo}</span> · {ago(lastPush.when)}
                </a>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#projects" className="btn focus-ring bg-pink">See my work</a>
              <a href={LINKS.resume} download className="btn focus-ring bg-paper">
                <FileDown size={16} /> Résumé
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* marquee strip */}
      <div className="absolute inset-x-0 bottom-0 -rotate-1 overflow-hidden border-y-[3px] border-ink bg-lime py-2 text-ink">
        <div className="flex w-max animate-marquee font-mono text-sm font-bold uppercase tracking-[0.25em]">
          {Array.from({ length: 2 }, (_, k) => (
            <span key={k} aria-hidden={k === 1} className="flex shrink-0">
              {['Mind the gap', 'Now boarding', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript'].map((w) => (
                <span key={w} className="px-6">
                  {w} <span className="text-pink">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
