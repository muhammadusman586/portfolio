import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { SAY, say, type SayDetail } from '../say';

const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

type Props = { id: string; className?: string; style?: CSSProperties; lines?: string[] };

export default function Buddy({ id, className = '', style, lines }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pupils = useRef<(SVGCircleElement | null)[]>([]);
  const [bubble, setBubble] = useState('');
  const [talking, setTalking] = useState(false);
  const [blink, setBlink] = useState(false);
  const [squish, setSquish] = useState(false);
  const n = useRef(0);

  useEffect(() => {
    const look = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
      const d = Math.min(5, Math.hypot(e.clientX - r.left, e.clientY - r.top) / 40);
      pupils.current.forEach((p, i) => {
        p?.setAttribute('cx', String([36, 64][i] + Math.cos(a) * d));
        p?.setAttribute('cy', String(44 + Math.sin(a) * d));
      });
    };
    let hide = 0;
    const onSay = (e: Event) => {
      const { who, text, ms } = (e as CustomEvent<SayDetail>).detail;
      if (who !== id) return;
      setBubble(text);
      setTalking(true);
      setSquish(true);
      setTimeout(() => setSquish(false), 180);
      clearTimeout(hide);
      hide = window.setTimeout(() => setTalking(false), ms);
    };
    let blinkT = 0;
    const blinkLoop = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      blinkT = window.setTimeout(blinkLoop, 2500 + Math.random() * 3000);
    };
    if (!still()) blinkT = window.setTimeout(blinkLoop, 1800);
    addEventListener('pointermove', look);
    addEventListener(SAY, onSay);
    return () => {
      removeEventListener('pointermove', look);
      removeEventListener(SAY, onSay);
      clearTimeout(hide);
      clearTimeout(blinkT);
    };
  }, [id]);

  const talk = () => lines && say(id, lines[n.current++ % lines.length]);
  const onKey = (e: KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), talk());
  const interactive = lines ? { role: 'button', tabIndex: 0, 'aria-label': 'Say hi', onClick: talk, onKeyDown: onKey } : { 'aria-hidden': true };

  return (
    <div ref={ref} className={`buddy ${blink ? 'blink' : ''} ${squish ? 'squish' : ''} ${talking ? 'talk' : ''} ${className}`} style={style} {...interactive}>
      <span className="bubble" aria-live="polite">{bubble}</span>
      <svg viewBox="0 0 100 90" aria-hidden="true">
        <path className="body" d="M10 80C2 50 18 8 50 8s48 42 40 72c-2 8-78 8-80 0Z" />
        {[36, 64].map((cx, i) => (
          <g key={cx}>
            <circle className="eye" cx={cx} cy="44" r="11" />
            <circle ref={(el) => {
                pupils.current[i] = el;
              }} className="pupil" cx={cx} cy="44" r="5" />
            <rect className="lid" x={cx - 12} y="32" width="24" height="24" rx="12" />
          </g>
        ))}
        <path d="M44 64q6 5 12 0" fill="none" stroke="#15161a" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
