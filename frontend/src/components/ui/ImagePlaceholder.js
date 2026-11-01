import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { WORKERS, AVATARS, Person, Face } from './PlaceholderArt';

/**
 * Illustrated placeholder that is swapped for a real photo automatically:
 * if /public/images/<file> exists it is rendered with next/image, otherwise an
 * inline SVG illustration is shown. See README for the expected file names.
 */
export default function ImagePlaceholder({
  file,
  variant = 'plumber',
  kind = 'worker',
  alt = '',
  width = 400,
  height = 520,
  className = '',
  priority = false,
  index = 0,
}) {
  let exists = false;
  if (file) {
    try {
      exists = fs.existsSync(path.join(process.cwd(), 'public', 'images', file));
    } catch {}
  }
  if (exists) {
    return (
      <Image
        src={`/images/${file}`}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`ph-img ${className}`}
      />
    );
  }
  const label = alt || undefined;
  if (kind === 'avatar') {
    const skin = AVATARS[index % AVATARS.length];
    return (
      <span className={`ph ph-avatar ${className}`} role={label ? 'img' : undefined} aria-label={label}>
        <Face skin={skin} hair="#2b1d17" female={variant === 'female'} />
      </span>
    );
  }
  const v = WORKERS[variant] || WORKERS.plumber;
  return (
    <span className={`ph ph-worker ${className}`} role={label ? 'img' : undefined} aria-label={label} data-file={file}>
      <Person v={v} id={`${variant}-${index}`} />
    </span>
  );
}
