import { useEffect, useRef } from 'react';

type Letter = { el: HTMLSpanElement; x: number; y: number; vx: number; vy: number; grab: { sx: number; sy: number } | null };

export default function SpringyName() {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const L: Letter[] = [...root.current!.querySelectorAll<HTMLSpanElement>('.l')].map((el) => ({ el, x: 0, y: 0, vx: 0, vy: 0, grab: null }));
    let raf = 0;
    const step = () => {
      let moving = false;
      for (const l of L) {
        if (!l.grab) {
          l.vx = (l.vx - l.x * 0.08) * 0.82;
          l.vy = (l.vy - l.y * 0.08) * 0.82;
          l.x += l.vx;
          l.y += l.vy;
        }
        if (l.grab || Math.abs(l.x) + Math.abs(l.y) + Math.abs(l.vx) + Math.abs(l.vy) > 0.1) moving = true;
        else l.x = l.y = 0;
        l.el.style.transform = `translate(${l.x}px, ${l.y}px) rotate(${l.x * 0.15}deg)`;
      }
      raf = moving ? requestAnimationFrame(step) : 0;
    };
    const offs = L.map((l) => {
      const down = (e: PointerEvent) => {
        l.el.setPointerCapture(e.pointerId);
        l.grab = { sx: e.clientX - l.x, sy: e.clientY - l.y };
        if (!raf) raf = requestAnimationFrame(step);
      };
      const move = (e: PointerEvent) => {
        if (!l.grab) return;
        const nx = e.clientX - l.grab.sx;
        const ny = e.clientY - l.grab.sy;
        l.vx = nx - l.x;
        l.vy = ny - l.y;
        l.x = nx;
        l.y = ny;
      };
      const up = () => (l.grab = null);
      l.el.addEventListener('pointerdown', down);
      l.el.addEventListener('pointermove', move);
      l.el.addEventListener('pointerup', up);
      l.el.addEventListener('pointercancel', up);
      return () => {
        l.el.removeEventListener('pointerdown', down);
        l.el.removeEventListener('pointermove', move);
        l.el.removeEventListener('pointerup', up);
        l.el.removeEventListener('pointercancel', up);
      };
    });
    return () => {
      cancelAnimationFrame(raf);
      offs.forEach((off) => off());
    };
  }, []);

  const word = (w: string) => [...w].map((c, i) => <span key={i} className="l">{c}</span>);
  return (
    <h1 ref={root} className="name" aria-label="Muhammad Usman">
      <span aria-hidden="true">
        {word('Muhammad')}
        <br />
        {word('Usman')}
      </span>
    </h1>
  );
}
