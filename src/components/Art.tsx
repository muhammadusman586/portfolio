import type { ReactElement } from 'react';
import type { ArtKey } from '../data';

const ART: Record<ArtKey, ReactElement> = {
  teammates: (
    <>
      <rect className="a-card" x="24" y="30" width="128" height="140" rx="12" />
      {[60, 100, 140].map((y, i) => (
        <g key={y}>
          <circle className="a-acc" style={{ opacity: i === 1 ? 0.55 : 1 }} cx="44" cy={y} r="10" />
          <circle fill="#fff" cx="41" cy={y - 1} r="2" />
          <circle fill="#fff" cx="47" cy={y - 1} r="2" />
          <rect className="a-mut" x="62" y={y - 8} width={[74, 60, 68][i]} height="7" rx="3.5" />
          <rect className="a-mut2" x="62" y={y + 3} width={[50, 64, 40][i]} height="6" rx="3" />
        </g>
      ))}
      <path className="a-wire" d="M156 100H176" />
      <path className="a-flow" d="M156 100H176" />
      <rect className="a-card" x="180" y="46" width="118" height="84" rx="8" />
      <rect className="a-mut" x="230" y="130" width="18" height="14" />
      <rect className="a-mut" x="214" y="144" width="50" height="6" rx="3" />
      <rect className="a-ink" x="190" y="58" width="44" height="6" rx="3" />
      <rect className="a-mut" x="190" y="72" width="70" height="5" rx="2.5" />
      <rect className="a-mut" x="190" y="84" width="56" height="5" rx="2.5" />
      <rect className="a-acc a-new" x="190" y="96" width="8" height="10" rx="1" />
      <path className="a-ink" d="M262 90v24l6-6 5 10 5-2-5-10h9z" />
    </>
  ),
  clarity: (
    <>
      <rect className="a-card" x="70" y="22" width="180" height="160" rx="12" />
      <rect className="a-ink" x="88" y="40" width="70" height="8" rx="4" />
      <rect className="a-mut" x="88" y="54" width="110" height="5" rx="2.5" />
      {[86, 118, 150].map((y, i) => (
        <g key={y} className="a-rank">
          <circle className="a-acc" style={{ opacity: 1 - i * 0.35 }} cx="98" cy={y} r="9" />
          <rect className="a-mut" x="114" y={y - 6} width={[110, 96, 104][i]} height="5" rx="2.5" />
          <rect className="a-mut" x="114" y={y + 3} width={[70, 80, 56][i]} height="5" rx="2.5" />
        </g>
      ))}
      <path className="a-acc a-spark" d="M262 34l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
    </>
  ),
  dialpad: (
    <>
      <rect className="a-card" x="30" y="44" width="62" height="112" rx="12" />
      <circle className="a-acc" cx="61" cy="86" r="14" />
      <path fill="#fff" d="M55 81c2 6 6 10 12 12l3-3 5 3-2 5c-10 0-21-11-21-21l5-2 3 5z" />
      <rect className="a-mut" x="44" y="112" width="34" height="5" rx="2.5" />
      <rect className="a-mut" x="48" y="122" width="26" height="5" rx="2.5" />
      <path className="a-wire" d="M100 100H206" />
      <path className="a-flow" d="M100 100H206" />
      <rect className="a-card" x="212" y="44" width="82" height="112" rx="10" />
      {[58, 76, 94, 112].map((y) => (
        <rect key={y} className="a-mut" x="222" y={y} width="62" height="10" rx="3" />
      ))}
      <rect className="a-acc a-new" x="222" y="130" width="62" height="10" rx="3" />
    </>
  ),
  roofing: (
    <>
      <path className="a-acc" d="M40 92l46-40 46 40h-14v44H54V92z" />
      <rect className="a-card" x="76" y="108" width="20" height="28" rx="3" />
      <rect className="a-card" x="148" y="34" width="146" height="132" rx="10" />
      {[50, 76, 102, 128].map((y, i) => (
        <g key={y}>
          <rect className="a-mut" x="160" y={y} width={[70, 56, 80, 62][i]} height="6" rx="3" />
          <rect className={i % 2 ? 'a-mut2' : 'a-acc'} style={{ opacity: i === 2 ? 0.6 : undefined }} x="250" y={y - 3} width="32" height="12" rx="6" />
        </g>
      ))}
      <rect className="a-mut" x="160" y="150" width="44" height="6" rx="3" />
    </>
  ),
  hirrd: (
    <>
      <rect className="a-card" x="30" y="22" width="260" height="168" rx="10" />
      {[44, 55, 66].map((cx) => (
        <circle key={cx} className="a-mut" cx={cx} cy="35" r="3.5" />
      ))}
      <image href="/images/hirrd.jpg" x="36" y="46" width="248" height="138" preserveAspectRatio="xMidYMin slice" />
    </>
  ),
};

export default function Art({ art, label, className = '' }: { art: ArtKey; label: string; className?: string }) {
  return (
    <svg className={`art ${className}`} viewBox="0 0 320 200" role="img" aria-label={label}>
      <rect className="a-bg" width="320" height="200" />
      {ART[art]}
    </svg>
  );
}
