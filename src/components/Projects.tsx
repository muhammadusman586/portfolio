import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Lock } from 'lucide-react';
import TerminalWindow from './TerminalWindow';

type Project = {
  title: string;
  filename: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  status: 'live' | 'coming_soon';
};

const projects: Project[] = [
    {
    title: 'Connect Devs',
    filename: 'connect_devs.ts',
    description: 'A developer social networking platform — discover developers, swipe to connect, and build your network.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: '/images/ConnectDevs.jpeg',
    github: 'https://github.com/muhammadusman586/ConnectDevs',
    demo: 'https://connectdevs.vercel.app/',
    status: 'live',
  },
  {
    title: 'Pizza Ordering Application',
    filename: 'pizzeria.tsx',
    description:
      'A full-stack web application for ordering pizzas with cart, auth, and an admin dashboard — built end-to-end on the MERN stack.',
    image: '/images/pizza.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/muhammadusman586/Pizzeria',
    demo: 'https://pizzeria-murex.vercel.app/',
    status: 'live',
  },
  {
    title: 'project_03',
    filename: 'project_03.ts',
    description: 'Something new is brewing. Check back soon.',
    technologies: ['—'],
    status: 'coming_soon',
  },
];

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span className="text-accent">$</span>
            <span>ls ./projects</span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-body">
            <span className="text-accent">#</span> featured_work
          </h2>
          <p className="text-muted text-sm max-w-2xl">
            A curated set of applications I&apos;ve built — shipping code, breaking things,
            learning in public.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.filename}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) => {
  const isLive = project.status === 'live';
  return (
    <TerminalWindow
      title={project.filename}
      className={`flex flex-col ${!isLive ? 'opacity-70' : ''}`}
      bodyClassName="p-0"
      motionProps={{
        initial: { opacity: 0, y: 24 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.5, delay: index * 0.12 },
      }}
    >
      <div className="aspect-[16/9] bg-elevated border-b border-border overflow-hidden relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-sm text-muted">
            <div className="flex flex-col items-center gap-2">
              <Lock size={20} className="text-muted/60" />
              <span>
                <span className="text-accent/80">&gt;</span> {project.filename}:
                status=<span className="text-accent">COMING_SOON</span>
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-2 left-2 font-mono text-[10px] px-2 py-0.5 rounded-md bg-bg/70 backdrop-blur border border-border">
          {isLive ? (
            <span className="text-accent">● live</span>
          ) : (
            <span className="text-muted">○ pending</span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-mono text-base font-semibold text-body">
          {isLive ? (
            <>
              <span className="text-accent">&gt; </span>
              {project.title}
            </>
          ) : (
            <span className="text-muted">// {project.title}</span>
          )}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
          {project.description}
        </p>

        {isLive && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-mono rounded-md border border-border bg-elevated text-accent/90"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 pt-4 border-t border-border/60">
          {isLive ? (
            <>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-border text-body hover:border-accent hover:text-accent transition-colors focus-ring"
              >
                <Github size={14} />
                <span>./code</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-accent text-bg hover:bg-accent-dim transition-colors focus-ring"
              >
                <ExternalLink size={14} />
                <span>./live</span>
              </a>
            </>
          ) : (
            <span className="font-mono text-xs text-muted">
              <span className="text-accent">$</span> permission denied
            </span>
          )}
        </div>
      </div>
    </TerminalWindow>
  );
};

export default Projects;
