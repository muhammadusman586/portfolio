/** Side-view metro car, nose pointing right. Drawn in code, no assets. */
const Train = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 204 70" className={className} aria-hidden="true">
    <path
      d="M10 8h146c24 0 38 16 44 34v12c0 4-3 6-6 6H10c-5 0-8-3-8-8V16c0-5 3-8 8-8z"
      fill="#F7F6F1"
      stroke="#111"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path d="M3 40h194v9H3z" style={{ fill: 'rgb(var(--accent))' }} />
    <path d="M3 40h194M3 49h196" stroke="#111" strokeWidth="2" />
    {[16, 50, 84, 118].map((x) => (
      <rect key={x} className="train-win" x={x} y="16" width="26" height="16" rx="3" style={{ fill: 'rgb(var(--sky))' }} stroke="#111" strokeWidth="2.5" />
    ))}
    {/* driver in the cab window */}
    <path d="M152 16h8c12 0 22 7 26 16h-34z" style={{ fill: 'rgb(var(--sky))' }} stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="164" cy="26" r="5" fill="#111" />
    <path d="M158 32c0-4 3-6 6-6s6 2 6 6" style={{ fill: 'rgb(var(--signal))' }} stroke="#111" strokeWidth="2" />
    <path d="M146 14v40" stroke="#111" strokeWidth="2" />
    <circle cx="194" cy="44" r="4" style={{ fill: 'rgb(var(--signal))' }} stroke="#111" strokeWidth="2" />
    <text x="60" y="58" fontFamily="IBM Plex Mono, monospace" fontSize="7" fontWeight="700" fill="#111">
      MU · LINE 01
    </text>
    {[28, 56, 140, 168].map((x) => (
      <g key={x}>
        <circle cx={x} cy="62" r="7" fill="#111" />
        <circle cx={x} cy="62" r="2.5" style={{ fill: 'rgb(var(--signal))' }} />
      </g>
    ))}
  </svg>
);

export default Train;
