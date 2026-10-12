import { useEffect, useState } from 'react';
import { LINKS } from './data';

type Push = { repo: string; when: string };
type GhEvent = { type: string; repo: { name: string }; created_at: string };

export const ago = (iso: string) => {
  const m = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 60000));
  return m < 60 ? `${m}m ago` : m < 1440 ? `${Math.round(m / 60)}h ago` : `${Math.round(m / 1440)}d ago`;
};

// One shared request per page load: GitHub allows 60 unauthenticated requests/hour per IP.
let request: Promise<Push | null> | null = null;
const fetchLastPush = () =>
  (request ??= fetch(`https://api.github.com/users/${LINKS.github.split('/').pop()}/events/public?per_page=30`)
    .then((r) => (r.ok ? r.json() : []))
    .then((events: GhEvent[]) => {
      const e = events.find((ev) => ev.type === 'PushEvent');
      return e ? { repo: e.repo.name.split('/')[1], when: e.created_at } : null;
    })
    .catch(() => null));

export const useLastPush = () => {
  const [push, setPush] = useState<Push | null | undefined>(undefined);
  useEffect(() => void fetchLastPush().then(setPush), []);
  return push;
};
