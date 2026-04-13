import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'home', id: 'home' },
  { label: 'about', id: 'about' },
  { label: 'skills', id: 'skills' },
  { label: 'projects', id: 'projects' },
  { label: 'contact', id: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const offset = window.scrollY + window.innerHeight * 0.35;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (offset >= top && offset < bottom) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('home')}
            className="font-mono text-sm flex items-center gap-2 focus-ring rounded-md px-1"
          >
            <span className="text-accent">$</span>
            <span className="text-body">usman</span>
            <span className="text-muted">@</span>
            <span className="text-body">portfolio</span>
            <span className="text-accent animate-blink">▋</span>
          </button>

          <div className="hidden md:flex items-center gap-1 font-mono text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1.5 rounded-md transition-colors focus-ring ${
                    isActive
                      ? 'text-accent'
                      : 'text-muted hover:text-body'
                  }`}
                >
                  <span className="text-muted/60">./</span>
                  {item.label}
                  {isActive && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-accent shadow-glow-sm" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'close menu' : 'open menu'}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted hover:text-accent focus-ring"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mx-4 mb-4 rounded-2xl bg-surface border border-border shadow-term overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 bg-elevated border-b border-border">
            <span className="h-2.5 w-2.5 rounded-full bg-term-red/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-term-yellow/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-term-green/90" />
            <span className="flex-1 text-center font-mono text-xs text-muted">menu.sh</span>
            <span className="w-8" />
          </div>
          <ul className="p-3 font-mono text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    active === item.id
                      ? 'text-accent bg-accent/5'
                      : 'text-muted hover:text-body hover:bg-elevated'
                  }`}
                >
                  <span className="text-accent mr-2">$</span>
                  cd ./{item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
