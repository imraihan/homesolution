import Link from 'next/link';

export default function Logo({ light = false }) {
  return (
    <Link href="/" className={`hs-logo ${light ? 'hs-logo--light' : ''}`} aria-label="Home Solution - home page">
      <svg width="46" height="42" viewBox="0 0 46 42" aria-hidden="true">
        <path d="M3 20 L23 3 L43 20" fill="none" stroke={light ? '#fff' : '#0b3fa8'} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 19 V38 H37 V19" fill="none" stroke={light ? '#fff' : '#2563eb'} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="17" cy="29" r="5" fill="#f97316" />
        <path d="M25 24 L35 35 M35 24 L25 35" stroke={light ? '#fff' : '#2563eb'} strokeWidth="3.5" strokeLinecap="round" />
      </svg>
      <span className="hs-logo__text">
        <span className="hs-logo__home">HOME</span>
        <span className="hs-logo__sol">SOLUTION</span>
      </span>
    </Link>
  );
}
