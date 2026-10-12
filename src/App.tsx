import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import MetroRail from './components/MetroRail';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import HowIShip from './components/HowIShip';
import Contact from './components/Contact';
import RushHour from './components/RushHour';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      {/* pb-14: room for the mobile bottom rail */}
      <div className="relative min-h-screen overflow-x-clip pb-14 lg:pb-0">
        <Navbar />
        <MetroRail />
        <main className="mx-auto max-w-[1400px]">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <HowIShip />
          <Contact />
        </main>
        <footer className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 border-t-[3px] border-fg px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:pr-32">
          <p className="max-w-xs font-mono text-xs text-fg/60">
            Every train, ticket and stamp on this page is drawn in code. Psst: try typing “usman”.
          </p>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="grid h-9 w-9 place-items-center border-[3px] border-ink bg-accent font-display text-sm text-ink shadow-hard-sm">MU</span>
            © {new Date().getFullYear()} Muhammad Usman Ramzan
          </div>
        </footer>
        <RushHour />
      </div>
    </MotionConfig>
  );
}

export default App;
