import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TerminalWindow from './TerminalWindow';

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'FAST National University of Computer and Emerging Sciences, Lahore',
    year: '2021 — 2025',
    location: 'Lahore, Pakistan',
  },
  {
    degree: 'Intermediate in Pre Engineering',
    institution: 'Government College University',
    year: '2019 — 2021',
    location: 'Lahore, Pakistan',
  },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <SectionHeader
          prompt="cat ~/ABOUT_ME.md"
          title="about_me"
          inView={inView}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="relative mx-auto w-56 h-56 rounded-2xl overflow-hidden border border-border shadow-term group">
              <img
                src="/images/Usman.jpg"
                alt="Muhammad Usman"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/20 rounded-2xl" />
              <div className="absolute bottom-2 left-2 right-2 font-mono text-[10px] text-muted bg-bg/70 backdrop-blur rounded-md px-2 py-1 flex items-center justify-between">
                <span>usman.jpg</span>
                <span className="text-accent">● online</span>
              </div>
            </div>

            <div className="mt-4 font-mono text-xs text-muted text-center space-y-1">
              <div>
                <span className="text-accent">→</span> based in Lahore, PK
              </div>
              <div>
                <span className="text-accent">→</span> open to opportunities
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            <TerminalWindow
              title="ABOUT_ME.md"
              prompt="vim ABOUT_ME.md"
              motionProps={{
                initial: { opacity: 0, y: 20 },
                animate: inView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.5, delay: 0.15 },
              }}
            >
              <div className="space-y-5 text-muted leading-relaxed">
                <div>
                  <div className="text-accent"># Hello, world.</div>
                </div>
                <p>
                  I&apos;m a passionate Full Stack Developer with a strong foundation in
                  modern web technologies. I love creating elegant solutions to complex
                  problems and am dedicated to writing clean, efficient code.
                </p>
                <p>
                  With experience in both front-end and back-end development, I enjoy
                  building full-stack applications that are not only functional but also
                  provide an excellent user experience. I&apos;m constantly learning and
                  staying up-to-date with the latest technologies and best practices in
                  web development.
                </p>
                <div className="pt-2 border-t border-border/60 flex flex-wrap gap-2 text-xs">
                  {['#react', '#typescript', '#node', '#mongodb', '#tailwind'].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-elevated border border-border text-accent/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          <TerminalWindow title="EDUCATION.yaml" prompt="cat EDUCATION.yaml">
            <ul className="space-y-5">
              {education.map((edu, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                  className="group"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 text-accent">-</span>
                    <div className="flex-1 space-y-1">
                      <div>
                        <span className="text-muted">degree:</span>{' '}
                        <span className="text-body">{edu.degree}</span>
                      </div>
                      <div>
                        <span className="text-muted">institution:</span>{' '}
                        <span className="text-body">{edu.institution}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1">
                        <span>
                          <span className="text-muted">period:</span>{' '}
                          <span className="text-accent">{edu.year}</span>
                        </span>
                        <span>
                          <span className="text-muted">location:</span>{' '}
                          <span className="text-body">{edu.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeader = ({
  prompt,
  title,
  inView,
}: {
  prompt: string;
  title: string;
  inView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.4 }}
    className="space-y-2"
  >
    <div className="font-mono text-xs text-muted flex items-center gap-2">
      <span className="text-accent">$</span>
      <span>{prompt}</span>
    </div>
    <h2 className="font-mono text-3xl sm:text-4xl font-bold text-body">
      <span className="text-accent">#</span> {title}
    </h2>
  </motion.div>
);

export default About;
