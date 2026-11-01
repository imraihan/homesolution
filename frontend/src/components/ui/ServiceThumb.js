import Image from 'next/image';
import { WorkerArt } from './PlaceholderArt';
import { getCategory } from '@/data/services';

// Client-safe image slot for services: real photo when `src` is provided, illustration otherwise.
// `tone` lets gallery thumbnails look different from each other when there are no photos yet.
const TINTS = { blue: '#dbe8ff', orange: '#ffe9d4', green: '#d9f3e5', purple: '#eadcfb' };

export default function ServiceThumb({ category, src, alt = '', tone = 0, sizes = '(max-width: 768px) 50vw, 25vw', priority = false, className = '' }) {
  const cat = getCategory(category) || { theme: 'blue', worker: 'plumber' };
  if (src) {
    return (
      <span className={`hs-thumb ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      </span>
    );
  }
  const flip = tone % 2 === 1;
  return (
    <span className={`hs-thumb hs-thumb--ph ${className}`} style={{ background: `linear-gradient(${135 + tone * 40}deg, #fff 0%, ${TINTS[cat.theme]} 100%)` }}>
      <WorkerArt variant={cat.worker} id={`t${tone}`} label={alt || undefined} className={flip ? 'is-flip' : ''} />
    </span>
  );
}
