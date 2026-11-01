// Pure SVG illustrations (no fs access), safe to use in client components.
export const WORKERS = {
  plumber: { skin: '#f0b48c', hair: '#3a2a22', cap: '#0b3fa8', shirt: '#ffffff', body: '#1f4fc4', tool: '#c0392b', female: false },
  electrician: { skin: '#e9a67c', hair: '#3a2a22', cap: '#f5b800', shirt: '#2a3f6b', body: '#1d3157', tool: '#f5b800', female: false, helmet: true },
  carpenter: { skin: '#d99a70', hair: '#2b1d17', cap: null, shirt: '#8a4b2a', body: '#2a2a2e', tool: '#b9824a', female: false, beard: true },
  cleaner: { skin: '#f2bf98', hair: '#2b1d17', cap: '#0b3fa8', shirt: '#ffffff', body: '#2a63d6', tool: '#ff8bb0', female: true },
  hero: { skin: '#f0b48c', hair: '#3a2a22', cap: '#0b3fa8', shirt: '#ffffff', body: '#1f4fc4', tool: '#c0392b', female: false },
  rider: { skin: '#f0b48c', hair: '#3a2a22', cap: '#f5b800', shirt: '#2a63d6', body: '#1f4fc4', tool: '#ffffff', female: false, helmet: true },
};
export const AVATARS = ['#f0b48c', '#e9a67c', '#f2bf98', '#d99a70'];

export function Person({ v, id }) {
  return (
    <svg viewBox="0 0 200 260" role="img" aria-hidden="true" className="ph-svg" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,.0)" />
          <stop offset="1" stopColor="rgba(0,0,0,.08)" />
        </linearGradient>
      </defs>
      {/* torso */}
      <path d="M20 260 C20 190 50 150 100 150 C150 150 180 190 180 260 Z" fill={v.shirt} />
      {/* overalls / apron */}
      <path d="M45 260 L52 175 L148 175 L155 260 Z" fill={v.body} />
      <rect x="62" y="150" width="14" height="40" fill={v.body} />
      <rect x="124" y="150" width="14" height="40" fill={v.body} />
      <rect x="78" y="205" width="44" height="26" rx="4" fill="rgba(255,255,255,.14)" />
      {/* arms crossed */}
      <path d="M32 215 C60 190 140 190 168 215 L162 238 C130 215 70 215 38 238 Z" fill={v.shirt} />
      <rect x="150" y="150" width="9" height="70" rx="4" fill={v.tool} transform="rotate(18 150 150)" />
      {/* neck + head */}
      <rect x="88" y="128" width="24" height="28" rx="8" fill={v.skin} />
      {v.female && <path d="M58 90 C50 150 62 160 70 160 L130 160 C140 150 150 150 142 90 Z" fill={v.hair} />}
      <ellipse cx="100" cy="98" rx="33" ry="38" fill={v.skin} />
      {v.beard && <path d="M69 104 C72 140 128 140 131 104 C120 120 80 120 69 104Z" fill={v.hair} />}
      {!v.cap && !v.female && <path d="M67 90 C66 58 134 58 133 90 C120 72 80 72 67 90Z" fill={v.hair} />}
      {/* cap / helmet */}
      {v.cap && (
        <>
          <path d={v.helmet ? 'M64 90 C62 44 138 44 136 90 Z' : 'M65 88 C64 52 136 52 135 88 C120 80 80 80 65 88Z'} fill={v.cap} />
          <rect x="58" y={v.helmet ? 88 : 84} width="84" height="7" rx="3.5" fill={v.cap} />
        </>
      )}
      {/* face */}
      <circle cx="87" cy="100" r="3" fill="#2b1d17" />
      <circle cx="113" cy="100" r="3" fill="#2b1d17" />
      <path d="M86 116 Q100 128 114 116" stroke="#8a3b2a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Face({ skin, hair, female }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="ph-svg">
      <rect width="100" height="100" fill="#dfe9ff" />
      <path d="M10 100 C10 70 30 62 50 62 C70 62 90 70 90 100Z" fill="#2a3f6b" />
      {female && <path d="M26 48 C20 80 28 84 34 84 L66 84 C72 80 80 78 74 48Z" fill={hair} />}
      <ellipse cx="50" cy="46" rx="18" ry="21" fill={skin} />
      {!female && <path d="M32 42 C32 22 68 22 68 42 C60 32 40 32 32 42Z" fill={hair} />}
      {female && <path d="M32 44 C32 22 68 22 68 44 C60 30 40 30 32 44Z" fill={hair} />}
    </svg>
  );
}


export function WorkerArt({ variant = 'plumber', id = 'x', className = '', label }) {
  const v = WORKERS[variant] || WORKERS.plumber;
  return (
    <span className={`ph ph-worker ${className}`} role={label ? 'img' : undefined} aria-label={label}>
      <Person v={v} id={`${variant}-${id}`} />
    </span>
  );
}
