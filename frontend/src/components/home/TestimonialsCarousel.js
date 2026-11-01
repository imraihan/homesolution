'use client';
import { Children, useRef, useState } from 'react';

// Client-side scroll-snap carousel with dots. Cards are server-rendered children.
export default function TestimonialsCarousel({ children }) {
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);
  const track = useRef(null);

  const go = (i) => {
    setActive(i);
    const t = track.current;
    const el = t?.children[i];
    if (el) t.scrollTo({ left: el.offsetLeft - t.offsetLeft, behavior: 'smooth' });
  };
  const onScroll = (e) => {
    const t = e.currentTarget;
    const w = t.children[0]?.offsetWidth || 1;
    const i = Math.min(items.length - 1, Math.round(t.scrollLeft / (w + 16)));
    if (i !== active) setActive(i);
  };

  return (
    <>
      <div className="hs-testi hs-scroll" ref={track} onScroll={onScroll}>{items}</div>
      <div className="hs-dots" role="tablist" aria-label="Testimonials">
        {items.map((_, i) => (
          <button key={i} type="button" role="tab" aria-selected={i === active} aria-label={`Show testimonial ${i + 1}`} className={i === active ? 'is-active' : ''} onClick={() => go(i)} />
        ))}
      </div>
    </>
  );
}
