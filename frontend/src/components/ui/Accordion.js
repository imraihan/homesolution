'use client';
import { useId, useState } from 'react';
import { BsPlus, BsDash } from 'react-icons/bs';

/** items: [{ q, a }]. One panel open at a time. */
export default function Accordion({ items, defaultOpen = -1 }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <div className="hs-acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`hs-acc__item ${isOpen ? 'is-open' : ''}`}>
            <h3>
              <button type="button" id={`${uid}-b${i}`} aria-expanded={isOpen} aria-controls={`${uid}-p${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{it.q}</span>
                {isOpen ? <BsDash size={22} aria-hidden="true" /> : <BsPlus size={22} aria-hidden="true" />}
              </button>
            </h3>
            <div id={`${uid}-p${i}`} role="region" aria-labelledby={`${uid}-b${i}`} hidden={!isOpen}>
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
