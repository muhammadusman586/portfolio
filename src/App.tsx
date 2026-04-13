import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen bg-bg text-body font-sans">
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanline-overlay" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <footer className="border-t border-border/60 py-8 mt-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-muted">
            <span>
              <span className="text-accent">$</span> exit 0
            </span>
            <span>© {new Date().getFullYear()} muhammad usman ramzan — built with react + vite</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
