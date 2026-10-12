import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Send } from 'lucide-react';
import { SHIP_STEPS } from '../data';
import { play } from '../sound';
import { StationHeader } from './ui';
import Train from './Train';

const LAST = SHIP_STEPS.length - 1;
const STEP_MS = 1100;

const HowIShip = () => {
  const [at, setAt] = useState(-1); // last reached stop; -1 = not started
  const [run, setRun] = useState(0);
  const running = at >= 0 && at < LAST;

  useEffect(() => {
    if (!run) return;
    setAt(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setAt(i);
      if (i === LAST) {
        clearInterval(id);
        play('chime');
      }
    }, STEP_MS);
    return () => clearInterval(id);
  }, [run]);

  const dispatch = () => !running && setRun((r) => r + 1);

  return (
    <section id="ship" className="relative px-4 py-24 sm:px-6 lg:pr-32">
      <StationHeader num="05" title="Deploy" tag="service line">
        How my code gets from the editor to production. Dispatch the train and ride along.
      </StationHeader>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => at === -1 && !run && dispatch()}
        className="border-[3px] border-ink bg-paper p-5 text-ink shadow-hard-lg sm:p-8"
      >
        <div className="relative mx-2 mb-4 mt-14 sm:mx-6">
          <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 border-y-[3px] border-ink bg-[#B07CFF]" />
          <motion.div
            className="absolute inset-y-0 left-0 top-1/2 h-3 -translate-y-1/2 border-y-[3px] border-ink bg-signal"
            initial={{ width: '0%' }}
            animate={{ width: `${(Math.max(at, 0) / LAST) * 100}%` }}
            transition={{ duration: STEP_MS / 1000, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -top-14 z-10 w-20 sm:w-28"
            initial={{ left: '0%' }}
            animate={{ left: `${(Math.max(at, 0) / LAST) * 100}%` }}
            transition={{ duration: STEP_MS / 1000, ease: 'easeInOut' }}
            style={{ x: '-50%' }}
          >
            <Train className={`w-full ${running ? 'animate-bob' : ''}`} />
          </motion.div>
          <ol className="relative flex justify-between">
            {SHIP_STEPS.map((s, i) => {
              const reached = i <= at;
              return (
                <li key={s.stop} className="relative flex w-0 flex-col items-center">
                  <motion.span
                    animate={{ scale: i === at ? 1.4 : 1 }}
                    className={`relative z-10 block h-7 w-7 rounded-full border-[4px] border-ink transition-colors duration-300 ${
                      reached ? 'bg-signal' : 'bg-paper'
                    }`}
                  />
                </li>
              );
            })}
          </ol>
        </div>
        <ol className="mx-2 flex justify-between sm:mx-6">
          {SHIP_STEPS.map((s, i) => (
            <li key={s.stop} className="flex w-0 flex-col items-center">
              <span className={`whitespace-nowrap font-display text-sm uppercase sm:text-lg ${i <= at ? '' : 'opacity-40'}`}>{s.stop}</span>
              <span className="mt-1 hidden whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-wider text-muted sm:block">
                {s.tools.join(' · ')}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="min-h-[178px] border-[3px] border-ink bg-board p-4 font-mono text-xs leading-6 text-paper sm:text-sm" aria-live="polite">
            <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-paper/50">deploy.log</p>
            <AnimatePresence initial={false}>
              {SHIP_STEPS.slice(0, at + 1).map((s, i) => (
                <motion.p
                  key={`${run}-${s.stop}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === LAST ? 'text-signal' : ''}
                >
                  <span className="text-paper/40">[{String(i * 2).padStart(2, '0')}s]</span> {s.log}
                </motion.p>
              ))}
            </AnimatePresence>
            {at === -1 && <p className="text-paper/50">waiting at platform…</p>}
          </div>
          <button onClick={dispatch} disabled={running} className="btn focus-ring justify-center bg-signal disabled:cursor-wait disabled:opacity-60">
            {at === LAST ? <RotateCcw size={16} /> : <Send size={16} />}
            {running ? 'En route…' : at === LAST ? 'Ship it again' : 'Dispatch train'}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HowIShip;
