import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PROJECTS, ROLES, type Project, type Role } from '../data';
import { say } from '../say';
import Art from './Art';
import Buddy from './Buddy';

type Stop = { key: string; say: string; body: ReactNode };

function Line({ id, title, stops }: { id: string; title: string; stops: Stop[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [here, setHere] = useState(-1);
  const [top, setTop] = useState(0);
  const [hop, setHop] = useState(0);

  useEffect(() => {
    const items = [...list.current!.querySelectorAll<HTMLLIElement>(':scope > li')];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)?.target as HTMLLIElement | undefined;
        if (!hit) return;
        const i = items.indexOf(hit);
        setHere(i);
        setTop(hit.offsetTop - 6);
        setHop((h) => h + 1);
        say(id, stops[i].say, 2600);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    items.forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [id, stops]);

  return (
    <section className="section" aria-labelledby={`${id}-h`}>
      <h2 className="meta muted" id={`${id}-h`}>
        {title}
      </h2>
      <div className="line-wrap">
        {/* Alternating two identical keyframes restarts the hop on every move without remounting. */}
        <Buddy id={id} className={`walker ${hop ? `hop${hop % 2}` : ''}`} style={{ translate: `0 ${top}px`, opacity: here < 0 ? 0 : 1 }} />
        <ol className="line" ref={list}>
          {stops.map((s, i) => (
            <li key={s.key} className={i === here ? 'here' : ''}>
              {s.body}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const roleStop = (r: Role): Stop => ({
  key: r.id,
  say: r.say,
  body: (
    <>
      <span className="meta muted">{r.when}</span>
      <h3>
        {r.title}, {r.link ? <a href={r.link}>{r.org}</a> : r.org}
      </h3>
      <div className="role">
        <img className="logo" src={r.logo} alt={`${r.org} logo`} width={44} height={44} loading="lazy" />
        <div>
          <b>{r.where}</b>
          <ul>
            {r.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  ),
});

const projectStop = (p: Project, onOpen: (p: Project) => void): Stop => ({
  key: p.id,
  say: p.say,
  body: (
    <>
      <span className="meta muted">
        {p.year} · {p.kind} · {p.where}
      </span>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <button type="button" className="proj" onClick={() => onOpen(p)}>
        <Art art={p.art} label={`Illustration of ${p.title}`} />
        <span className="meta cta">
          <span>Read case study</span>
          <span aria-hidden="true">↗</span>
        </span>
      </button>
    </>
  ),
});

const ROLE_STOPS = ROLES.map(roleStop);

export function Experience() {
  return <Line id="walker-exp" title="Experience" stops={ROLE_STOPS} />;
}

export function Projects({ onOpen }: { onOpen: (p: Project) => void }) {
  // Stable list so the observer effect doesn't re-run on every render.
  const [stops] = useState(() => PROJECTS.map((p) => projectStop(p, onOpen)));
  return <Line id="walker-proj" title="Projects" stops={stops} />;
}
