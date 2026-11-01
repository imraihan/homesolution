'use client';
import { useState } from 'react';
import ServiceThumb from '../ui/ServiceThumb';

// `images`: array of 5 urls/null (see lib/serviceImages.js). Null slots render varied illustrations.
export default function ServiceGallery({ category, name, images }) {
  const [active, setActive] = useState(0);
  return (
    <div className="hs-gallery">
      <div className="hs-gallery__main">
        <ServiceThumb key={active} category={category} src={images[active]} alt={`${name} photo ${active + 1}`} tone={active} priority={active === 0} sizes="(max-width: 992px) 100vw, 640px" />
      </div>
      <ul className="hs-gallery__thumbs" aria-label="Service photos">
        {images.map((src, i) => (
          <li key={i}>
            <button type="button" className={i === active ? 'is-active' : ''} aria-label={`Show photo ${i + 1}`} aria-pressed={i === active} onClick={() => setActive(i)}>
              <ServiceThumb category={category} src={src} alt="" tone={i} sizes="120px" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
