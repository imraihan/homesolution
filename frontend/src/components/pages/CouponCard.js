'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BsCopy, BsCheck2, BsArrowRight } from 'react-icons/bs';

export default function CouponCard({ offer }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
    } catch {
      // Clipboard API unavailable (insecure context / denied): fall back to a hidden textarea.
      try {
        const ta = document.createElement('textarea');
        ta.value = offer.code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      } catch {}
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className={`hs-offer hs-offer--${offer.theme}`}>
      <div className="hs-offer__badge">
        <strong>{offer.badge}</strong>
        <span>{offer.badgeSub}</span>
      </div>
      <div className="hs-offer__body">
        <h3>{offer.title}</h3>
        <p>{offer.text}</p>
        <div className="hs-offer__code">
          <code aria-label={`Coupon code ${offer.code}`}>{offer.code}</code>
          <button type="button" onClick={copy} aria-live="polite">
            {copied ? <><BsCheck2 aria-hidden="true" /> Copied</> : <><BsCopy aria-hidden="true" /> Copy</>}
          </button>
        </div>
        <div className="hs-offer__foot">
          <small>{offer.valid}</small>
          <Link href={offer.href}>Book Now <BsArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
