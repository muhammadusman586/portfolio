import { useEffect, useState } from 'react';
import { ago, useLastPush } from '../github';

const lahore = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' });

export default function Presence() {
  const push = useLastPush();
  const [time, setTime] = useState(() => lahore.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(lahore.format(new Date())), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="presence meta" aria-label="Status">
      <li>
        <span className="ic"><span className="dot" /></span>Open to software engineer roles
      </li>
      <li>
        <span className="ic" aria-hidden="true">◷</span>Lahore · {time}
      </li>
      <li>
        <span className="ic" aria-hidden="true">↑</span>
        {push === undefined ? (
          'Checking GitHub…'
        ) : push ? (
          <a href={`https://github.com/${push.owner}/${push.repo}`}>
            Pushed to {push.repo} · {ago(push.when)}
          </a>
        ) : (
          'No public pushes lately'
        )}
      </li>
    </ul>
  );
}
