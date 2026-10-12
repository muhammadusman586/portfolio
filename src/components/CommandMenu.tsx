import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Moon,
  Palette,
  Sun,
  TrainFront,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { LINKS, STATIONS } from '../data';
import { THEMES, getPalette, haptic, isNight, setNight, setPalette } from '../prefs';
import { isSoundOn, play, setSound } from '../sound';

type Action = { id: string; label: string; hint: string; icon: ReactNode; run: () => unknown; keep?: boolean };

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

const buildActions = (setNote: (s: string) => void): Action[] => [
  ...STATIONS.map((s, i) => ({
    id: `go-${s.id}`,
    label: `Go to ${s.label}`,
    hint: `Station #${String(i).padStart(2, '0')}`,
    icon: <ArrowRight size={16} />,
    run: () => go(s.id),
  })),
  { id: 'express', label: 'Ride the express', hint: 'Auto-tour every station', icon: <TrainFront size={16} />, run: () => void window.dispatchEvent(new Event('express')) },
  {
    id: 'copy',
    label: 'Copy email address',
    hint: LINKS.email,
    icon: <Copy size={16} />,
    keep: true,
    run: async () => {
      try {
        await navigator.clipboard.writeText(LINKS.email);
        setNote('Email copied to clipboard');
      } catch {
        setNote(LINKS.email);
      }
    },
  },
  { id: 'resume', label: 'Download résumé', hint: 'PDF', icon: <FileDown size={16} />, run: () => open(LINKS.resume) },
  { id: 'github', label: 'Open GitHub', hint: 'muhammadusman586', icon: <Github size={16} />, run: () => open(LINKS.github) },
  { id: 'linkedin', label: 'Open LinkedIn', hint: 'muhammadusman586', icon: <Linkedin size={16} />, run: () => open(LINKS.linkedin) },
  isNight()
    ? { id: 'day', label: 'Switch to day service', hint: 'Light mode', icon: <Sun size={16} />, run: () => setNight(false) }
    : { id: 'night', label: 'Switch to night service', hint: 'Dark mode', icon: <Moon size={16} />, run: () => setNight(true) },
  ...THEMES.filter((t) => t.id !== getPalette()).map((t) => ({
    id: `theme-${t.id}`,
    label: `Change line: ${t.name}`,
    hint: t.note,
    icon: <Palette size={16} />,
    run: () => (setPalette(t.id), play('chime')),
  })),
  isSoundOn()
    ? { id: 'mute', label: 'Mute station sounds', hint: 'Sound off', icon: <VolumeX size={16} />, run: () => setSound(false) }
    : { id: 'unmute', label: 'Play station sounds', hint: 'Sound on', icon: <Volume2 size={16} />, run: () => (setSound(true), play('chime')) },
  { id: 'rush', label: 'Start rush hour', hint: 'Easter egg', icon: <Zap size={16} />, run: () => void window.dispatchEvent(new Event('rushhour')) },
];

const CommandMenu = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [note, setNote] = useState('');
  const actions = useMemo(() => buildActions(setNote), []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => `${a.label} ${a.hint}`.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  useEffect(() => ref.current?.showModal(), []);
  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    document.getElementById(`cmd-${shown[active]?.id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, shown]);

  const run = async (a: Action) => {
    haptic();
    await a.run();
    if (!a.keep) ref.current?.close();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (i + step + shown.length) % Math.max(1, shown.length));
    } else if (e.key === 'Enter' && shown[active]) {
      e.preventDefault();
      run(shown[active]);
    }
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-label="Ticket machine"
      className="m-auto mt-[12vh] w-[min(92vw,560px)] border-[4px] border-ink bg-paper p-0 text-ink shadow-[10px_10px_0_rgb(var(--accent))] backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}>
        <div className="flex items-center justify-between bg-signal px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
          <span>Ticket machine</span>
          <kbd className="border-2 border-ink bg-paper px-1.5">Esc</kbd>
        </div>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
          placeholder="Where to? Type a station or an action…"
          aria-label="Search actions"
          aria-controls="cmd-list"
          aria-activedescendant={shown[active] ? `cmd-${shown[active].id}` : undefined}
          role="combobox"
          aria-expanded
          className="block w-full border-b-[3px] border-ink bg-transparent px-4 py-3 font-mono text-sm outline-none placeholder:text-ink/40"
        />
        <ul id="cmd-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {shown.map((a, i) => (
            <li
              key={a.id}
              id={`cmd-${a.id}`}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => setActive(i)}
              onClick={() => run(a)}
              className={`flex cursor-pointer items-center gap-3 border-2 px-3 py-2 ${
                i === active ? 'border-ink bg-signal/50' : 'border-transparent'
              }`}
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center border-2 border-ink bg-paper">{a.icon}</span>
              <span className="flex-1 font-sans text-sm font-bold">{a.label}</span>
              <span className="hidden truncate font-mono text-[10px] uppercase text-muted sm:block">{a.hint}</span>
            </li>
          ))}
          {!shown.length && <li className="px-3 py-6 text-center font-mono text-xs uppercase text-muted">No train goes there.</li>}
        </ul>
        {note && <p role="status" className="border-t-[3px] border-ink bg-sky/40 px-4 py-2 font-mono text-xs font-bold">{note}</p>}
      </motion.div>
    </dialog>
  );
};

export default CommandMenu;
