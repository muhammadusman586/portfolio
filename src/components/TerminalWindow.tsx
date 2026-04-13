import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type Props = {
  title: string;
  prompt?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  accentGlow?: boolean;
  motionProps?: HTMLMotionProps<'div'>;
};

const TerminalWindow = ({
  title,
  prompt,
  children,
  className = '',
  bodyClassName = '',
  accentGlow = false,
  motionProps,
}: Props) => {
  return (
    <motion.div
      {...motionProps}
      className={`group relative rounded-2xl bg-surface shadow-term overflow-hidden ${
        accentGlow ? 'ring-1 ring-accent/10' : ''
      } ${className}`}
    >
      {accentGlow && (
        <div className="pointer-events-none absolute -inset-20 -z-10 bg-accent/5 blur-3xl opacity-60" />
      )}

      <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-term-red/90" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-term-yellow/90" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-term-green/90" aria-hidden="true" />
        </div>
        <div className="flex-1 text-center font-mono text-xs text-muted tracking-wide">
          {title}
        </div>
        <div className="w-12" aria-hidden="true" />
      </div>

      <div className={`p-5 sm:p-6 font-mono text-sm ${bodyClassName}`}>
        {prompt && (
          <div className="mb-4 flex items-center gap-2 text-xs text-muted">
            <span className="text-accent">$</span>
            <span>{prompt}</span>
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
