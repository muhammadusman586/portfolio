import { useEffect, useState, type MouseEvent } from 'react';
import Buddy from './components/Buddy';
import CaseStudy from './components/CaseStudy';
import { GitHubIcon, LinkedInIcon, MailIcon, ResumeIcon } from './components/LinkIcons';
import Presence from './components/Presence';
import SpringyName from './components/SpringyName';
import { Experience, Projects } from './components/Timeline';
import { LINKS, PROJECTS, type Project } from './data';
import { say } from './say';

const HI = ['hi! hire usman?', 'he builds AI teammates', 'try dragging the M', 'ok bye 👋'];

// Follows the system theme; the button overrides it for this visit only.
function ThemeButton() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const os = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => setDark(os.matches);
    os.addEventListener('change', sync);
    return () => os.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  const toggle = () => setDark((d) => !d);
  return (
    <button type="button" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={toggle}>
      {dark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

export default function App() {
  const [open, setOpen] = useState<Project | null>(null);
  const show = (p: Project) => {
    setOpen(p);
    say('main', p.say);
  };
  const caseLink = (id: string) => ({
    href: `#${id}`,
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      show(PROJECTS.find((p) => p.id === id)!);
    },
  });

  return (
    <main>
      <header className="hero">
        <SpringyName />
        <Buddy id="main" className="hero-buddy" lines={HI} />
        <p className="meta tagline">
          Software & AI engineer · Agents · Full-stack products
          <br />
          RipeSeed, Lahore
        </p>
      </header>

      <p className="bio">
        I build AI products that connect models to real tools and workflows: <a {...caseLink('ai-teammates')}>agents with their own computers</a>{' '}
        and <a {...caseLink('clarityhero')}>AI briefing pipelines</a> that turn business data into decisions. At{' '}
        <a href="https://ripeseed.io">RipeSeed</a>, I work across LLM pipelines, integrations and full-stack development
        with TypeScript, Next.js and Node.js.
      </p>

      <nav className="meta links" aria-label="Links">
        <a href={`mailto:${LINKS.email}`}>
          <MailIcon />
          Email
        </a>
        <a href={LINKS.github}>
          <GitHubIcon />
          GitHub
        </a>
        <a href={LINKS.linkedin}>
          <LinkedInIcon />
          LinkedIn
        </a>
        <a href={LINKS.resume}>
          <ResumeIcon />
          Résumé
        </a>
      </nav>

      <Experience />
      <Projects onOpen={show} />
      <Presence />

      <footer className="meta">
        <span>© {new Date().getFullYear()} Muhammad Usman</span>
        <ThemeButton />
      </footer>

      <CaseStudy project={open} onClose={() => setOpen(null)} />
    </main>
  );
}
