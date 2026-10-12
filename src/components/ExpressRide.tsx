import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Square, TrainFront } from 'lucide-react';
import { STATIONS } from '../data';

const DWELL_MS = 2400;

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => (clearTimeout(id), reject(signal.reason)), { once: true });
  });

const ExpressRide = () => {
  const [stop, setStop] = useState<number | null>(null);
  const ctrl = useRef<AbortController | null>(null);

  useEffect(() => {
    const cancel = () => ctrl.current?.abort('cancelled');

    const ride = async () => {
      cancel();
      const ac = (ctrl.current = new AbortController());
      const { signal } = ac;
      // Real user input ends the ride; our own smooth scrolling doesn't fire these.
      for (const ev of ['wheel', 'touchstart', 'keydown'] as const) window.addEventListener(ev, cancel, { once: true, passive: true, signal });
      try {
        for (let i = 0; i < STATIONS.length; i++) {
          setStop(i);
          const el = document.getElementById(STATIONS[i].id)!;
          el.scrollIntoView({ behavior: 'smooth' });
          await wait(DWELL_MS, signal);
          if (el.offsetHeight > window.innerHeight * 1.3) {
            window.scrollBy({ top: window.innerHeight * 0.6, behavior: 'smooth' });
            await wait(DWELL_MS, signal);
          }
        }
      } catch {
        /* ignore */
      } finally {
        if (ctrl.current === ac) {
          ac.abort('done');
          setStop(null);
        }
      }
    };

    window.addEventListener('express', ride);
    return () => (window.removeEventListener('express', ride), cancel());
  }, []);

  return (
    <AnimatePresence>
      {stop !== null && (
        <motion.div
          role="status"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          style={{ x: '-50%' }}
          className="fixed bottom-20 left-1/2 z-50 flex w-max max-w-[92vw] items-center gap-3 border-[3px] border-ink bg-ink py-2 pl-4 pr-2 font-mono text-xs font-bold uppercase tracking-wider text-paper shadow-hard lg:bottom-6"
        >
          <TrainFront size={16} className="animate-bob text-signal" />
          <span>
            Express · now at <span className="text-signal">{STATIONS[stop].label}</span>
            <span className="text-paper/50"> ({stop + 1}/{STATIONS.length})</span>
          </span>
          <button
            onClick={() => ctrl.current?.abort('cancelled')}
            className="focus-ring inline-flex items-center gap-1 border-2 border-paper px-2 py-1 hover:bg-paper hover:text-ink"
          >
            <Square size={12} /> Stop
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpressRide;
