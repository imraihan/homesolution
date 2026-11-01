import fs from 'node:fs';
import path from 'node:path';
import { SERVICES } from '@/data/services';

// Server-only: photos are optional. Drop files into public/images/services/ and they are picked up:
//   <slug>.jpg|png|webp        card / cart thumbnail (and first gallery image)
//   <slug>-2.jpg ... <slug>-5.jpg   extra gallery images
const EXTS = ['jpg', 'jpeg', 'png', 'webp'];
const dir = () => path.join(process.cwd(), 'public', 'images', 'services');

const find = (base) => {
  for (const e of EXTS) {
    try {
      if (fs.existsSync(path.join(dir(), `${base}.${e}`))) return `/images/services/${base}.${e}`;
    } catch {}
  }
  return null;
};

export const serviceImage = (slug) => find(slug);

/** { [slug]: url | null } for the listing page */
export const serviceImageMap = () => Object.fromEntries(SERVICES.map((s) => [s.slug, find(s.slug)]));

/** Gallery of 5 slots: url or null (null renders an illustrated placeholder). */
export const serviceGallery = (slug) => [find(slug), ...[2, 3, 4, 5].map((n) => find(`${slug}-${n}`))];
