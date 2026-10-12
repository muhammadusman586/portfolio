import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { isSoundOn, play, setSound } from '../sound';

/** Slim top bar: name, availability pill, night-service switch and sound toggle. */
const Navbar = () => {
  const [night, setNight] = useState(() => document.documentElement.classList.contains('dark'));
  const [sound, setSoundState] = useState(isSoundOn);

  const toggleNight = () => {
    const next = !night;
    setNight(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage blocked: choice lasts this visit only */
    }
  };

  const toggleSound = () => {
    setSound(!sound);
    setSoundState(!sound);
    if (!sound) play('chime');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-bg/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#home" className="focus-ring font-mono text-xs font-bold uppercase tracking-[0.15em]">
          Muhammad Usman <span className="text-pink">/</span> <span className="hidden sm:inline">Portfolio</span>
        </a>
        <div className="flex items-center gap-2 lg:mr-20">
          <span className="hidden items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-lime md:flex">
            <span className="h-2 w-2 animate-blink rounded-full bg-lime" />
            Now boarding: software engineer roles
          </span>

          <button
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? 'Mute station sounds' : 'Play station sounds'}
            title={sound ? 'Sound on' : 'Sound off'}
            className="focus-ring grid h-9 w-9 place-items-center border-2 border-ink bg-paper text-ink shadow-hard-sm"
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* light-switch styled toggle */}
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
              className={`relative z-10 grid h-6 w-7 place-items-center border-2 border-ink ${night ? 'ml-auto bg-blue text-lime' : 'bg-lime text-ink'}`}
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
