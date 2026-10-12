import { motion } from 'framer-motion';
import { Command, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { haptic, setNight, usePrefs } from '../prefs';
import { play, setSound } from '../sound';
import ThemePicker from './ThemePicker';

const Navbar = () => {
  const { night, sound } = usePrefs();

  const toggleNight = () => (setNight(!night), haptic());
  const toggleSound = () => {
    setSound(!sound);
    if (!sound) play('chime');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-bg/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#home" className="focus-ring font-mono text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.15em]">
          Muhammad Usman <span className="text-accent">/</span> <span className="hidden sm:inline">Portfolio</span>
        </a>
        <div className="flex items-center gap-2 lg:mr-20">
          <span className="hidden items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-signal md:flex">
            <span className="h-2 w-2 animate-blink rounded-full bg-signal" />
            Now boarding: software engineer roles
          </span>

          <button
            onClick={() => window.dispatchEvent(new Event('commandmenu'))}
            aria-label="Open ticket machine (command menu)"
            title="Ticket machine (Ctrl/⌘ K)"
            className="focus-ring hidden h-9 items-center gap-1 border-2 border-ink bg-paper px-2 font-mono text-[11px] font-bold text-ink shadow-hard-sm md:flex"
          >
            <Command size={14} /> K
          </button>

          <ThemePicker />

          <button
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? 'Mute station sounds' : 'Play station sounds'}
            title={sound ? 'Sound on' : 'Sound off'}
            className="focus-ring grid h-9 w-9 place-items-center border-2 border-ink bg-paper text-ink shadow-hard-sm"
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={toggleNight}
            role="switch"
            aria-checked={night}
            aria-label="Night service"
            title={night ? 'Night service' : 'Day service'}
            className="focus-ring relative flex h-9 w-[68px] items-center border-2 border-ink bg-paper px-1 shadow-hard-sm"
          >
            <span className="absolute left-2 text-ink"><Sun size={14} /></span>
            <span className="absolute right-2 text-ink"><Moon size={14} /></span>
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`relative z-10 grid h-6 w-7 place-items-center border-2 border-ink ${night ? 'ml-auto bg-deep text-signal' : 'bg-signal text-ink'}`}
            >
              {night ? <Moon size={12} /> : <Sun size={12} />}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
