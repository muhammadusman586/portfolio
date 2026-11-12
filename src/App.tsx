import { useEffect, useState, type MouseEvent } from 'react';
import Buddy from './components/Buddy';
import CaseStudy from './components/CaseStudy';
import { GitHubIcon, LinkedInIcon, MailIcon, ResumeIcon } from './components/LinkIcons';
import Presence from './components/Presence';
import SpringyName from './components/SpringyName';
import { Experience, Projects } from './components/Timeline';
import { LINKS, PROJECTS, type Project } from './data';
import { say } from './say';

const HI = ['hi! hire usman?', 'he builds webhooks', 'try dragging the M', 'ok bye 👋'];

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
          Software engineer · Integrations · AI pipelines
          <br />
          RipeSeed, Lahore
        </p>
      </header>

      <p className="bio">
        I build the parts of products that move data around: <a {...caseLink('clarityhero')}>AI briefing pipelines</a>,{' '}
        <a {...caseLink('dialpad-quickbase')}>webhook integrations</a> that don’t drop events, and the{' '}
        <a {...caseLink('roofing-platform')}>Next.js frontends</a> on top. Engineer at <a href="https://ripeseed.io">RipeSeed</a>;
        before that Laravel and React at Sixlogics, and a CS degree from FAST.
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
