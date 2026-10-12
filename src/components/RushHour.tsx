import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { play } from '../sound';
import Train from './Train';

const SECRET = 'usman';
const TRAINS = 12;

/** Fire from anywhere with `window.dispatchEvent(new Event('rushhour'))`. */
const startRushHour = () => window.dispatchEvent(new Event('rushhour'));

/** Easter egg: type "usman" (or click the hero train 5 times) and trains flood the screen. */
const RushHour = () => {
  const [run, setRun] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    let typed = '';
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest?.('input, textarea')) return;
      typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed === SECRET) startRushHour();
    };
    const onRush = () => {
      setRun((r) => r + 1);
      setOn(true);
      play('toot');
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('rushhour', onRush);
    return () => (window.removeEventListener('keydown', onKey), window.removeEventListener('rushhour', onRush));
  }, []);

  useEffect(() => {
    if (!on) return;
    const id = setTimeout(() => setOn(false), 4200);
    return () => clearTimeout(id);
  }, [on, run]);

  if (!on) return null;

  return (
    <div key={run} aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {Array.from({ length: TRAINS }, (_, i) => {
        const ltr = i % 2 === 0;
        return (
          <motion.div
            key={i}
            initial={{ x: ltr ? '-30vw' : '110vw' }}
            animate={{ x: ltr ? '110vw' : '-30vw' }}
            transition={{ duration: 1.6 + Math.random() * 1.4, delay: Math.random() * 1.6, ease: 'linear' }}
            style={{ top: `${(i / TRAINS) * 92 + 2}%`, scaleX: ltr ? 1 : -1 }}
            className="absolute left-0 w-40 sm:w-56"
          >
            <Train className="w-full drop-shadow-[3px_3px_0_#111]" />
          </motion.div>
        );
      })}
      <motion.p
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
        className="absolute left-1/2 top-1/2 -ml-[min(42vw,220px)] -mt-12 w-[min(84vw,440px)] border-[4px] border-ink bg-lime py-4 text-center font-display text-5xl text-ink shadow-[8px_8px_0_#FF3EA5] sm:text-6xl"
      >
        RUSH HOUR!
      </motion.p>
    </div>
  );
};

export default RushHour;
