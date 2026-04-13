import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TerminalWindow from './TerminalWindow';

const stack: Record<string, string[]> = {
  frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  tools: ['Git', 'GitHub', 'Docker'],
};

const keyPadding = Math.max(...Object.keys(stack).map((k) => k.length));

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span className="text-accent">$</span>
            <span>cat TECH_STACK.json</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-body">
            <span className="text-accent">#</span> tech_stack
          </h2>
        </motion.div>

        <div className="mt-10">
          <TerminalWindow
            title="TECH_STACK.json"
            motionProps={{
              initial: { opacity: 0, y: 20 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.5, delay: 0.15 },
            }}
          >
            <pre className="text-sm leading-7 whitespace-pre-wrap">
              <span className="json-bracket">{'{'}</span>
              {'\n'}
              {Object.entries(stack).map(([key, items], i) => {
                const paddedKey = key.padEnd(keyPadding);
                const isLast = i === Object.keys(stack).length - 1;
                return (
                  <motion.span
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.12 }}
                    className="block"
                  >
                    {'  '}
                    <span className="json-key">&quot;{paddedKey}&quot;</span>
                    <span className="json-punc">: </span>
                    <span className="json-bracket">[</span>
                    {items.map((item, j) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + i * 0.12 + j * 0.05,
                        }}
                      >
                        <span className="json-string">&quot;{item}&quot;</span>
                        {j < items.length - 1 && <span className="json-punc">, </span>}
                      </motion.span>
                    ))}
                    <span className="json-bracket">]</span>
                    {!isLast && <span className="json-punc">,</span>}
                  </motion.span>
                );
              })}
              <span className="json-bracket">{'}'}</span>
            </pre>
          </TerminalWindow>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="mt-6 font-mono text-xs text-muted flex items-center gap-2"
        >
          <span className="text-accent">→</span>
          <span>always learning, currently exploring:</span>
          <span className="text-accent">system design · rust · cloud infra</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
