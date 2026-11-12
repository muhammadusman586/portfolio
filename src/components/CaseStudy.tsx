import { useEffect, useRef } from 'react';
import type { Project } from '../data';
import Art from './Art';

export default function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (project && !ref.current?.open) ref.current?.showModal();
  }, [project]);

  return (
    <dialog ref={ref} className="case" onClose={onClose} onClick={(e) => e.target === ref.current && ref.current.close()} aria-labelledby="case-title">
      {project && (
        <article>
          <button type="button" className="x" aria-label="Close" onClick={() => ref.current?.close()}>
            ×
          </button>
          <Art art={project.art} label={`Illustration of ${project.title}`} />
          <div className="case-body">
            <p className="meta muted">
              {project.kind} · {project.where} · {project.year}
            </p>
            <h2 id="case-title">{project.title}</h2>
            <p className="sum">{project.summary}</p>
            <h3 className="meta muted">What I built</h3>
            <ul className="built">
              {project.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <ul className="chips" aria-label="Stack">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {project.links.length ? (
              <p className="case-links">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href}>
                    {l.label} ↗
                  </a>
                ))}
              </p>
            ) : (
              <p className="meta muted note">Client work, so no public link. Happy to walk you through it.</p>
            )}
          </div>
        </article>
      )}
    </dialog>
  );
}
