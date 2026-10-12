import { Fragment, type ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Renders `**bold**` segments in content strings. */
export const Rich = ({ text }: { text: string }) => (
  <>
    {text.split('**').map((part, i) =>
      i % 2 ? <strong key={i} className="font-bold">{part}</strong> : <Fragment key={i}>{part}</Fragment>
    )}
  </>
);

type HeaderProps = { num: string; title: string; tag: string; children?: ReactNode };

export const StationHeader = ({ num, title, tag, children }: HeaderProps) => (
  <motion.header
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.4 }}
    className="mb-12"
  >
    <motion.span
      variants={{ hidden: { opacity: 0, x: -30, rotate: -6 }, show: { opacity: 1, x: 0, rotate: -2 } }}
      className="mb-3 inline-block bg-signal px-3 py-1 text-ink font-mono text-xs font-bold uppercase tracking-[0.2em]"
    >
      Station #{num}
    </motion.span>
    <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
      <h2 aria-label={title} className="poster text-[clamp(3.25rem,11vw,9rem)]">
        {title.split('').map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block"
            variants={{ hidden: { y: '0.6em', opacity: 0 }, show: { y: 0, opacity: 1 } }}
            transition={{ type: 'spring', stiffness: 500, damping: 28, delay: i * 0.035 }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        ))}
      </h2>
      <motion.span
        variants={{ hidden: { scale: 0, rotate: 20 }, show: { scale: 1, rotate: -4 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.35 }}
        className="sticker mb-3 text-xl sm:text-2xl"
      >
        {tag}
      </motion.span>
    </div>
    {children && (
      <motion.p
        variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
        transition={{ delay: 0.4 }}
        className="mt-5 max-w-xl text-lg leading-relaxed text-fg/70"
      >
        {children}
      </motion.p>
    )}
  </motion.header>
);
