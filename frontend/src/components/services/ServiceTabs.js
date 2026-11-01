'use client';
import { useId, useState } from 'react';
import { BsCheckCircleFill, BsShieldCheck, BsStarFill, BsInfoCircle } from 'react-icons/bs';
import Accordion from '../ui/Accordion';
import Stars from '../ui/Stars';

const TABS = ['Overview', "What's Included", 'FAQs', 'Reviews'];

export default function ServiceTabs({ service, reviews }) {
  const [tab, setTab] = useState(0);
  const uid = useId();
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setTab((t) => (t + 1) % TABS.length);
    if (e.key === 'ArrowLeft') setTab((t) => (t + TABS.length - 1) % TABS.length);
  };
  const label = (t, i) => (i === 3 ? `Reviews (${service.reviews})` : t);
  // Illustrative distribution derived from the average (mock data).
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, pct: Math.max(0, Math.round(100 - Math.abs(service.rating - n) * 38 - (n < 3 ? 10 : 0))) }));

  return (
    <div className="hs-tabs">
      <div className="hs-tabs__list" role="tablist" aria-label="Service information" onKeyDown={onKey}>
        {TABS.map((t, i) => (
          <button key={t} type="button" role="tab" id={`${uid}-t${i}`} aria-selected={tab === i} aria-controls={`${uid}-p${i}`} tabIndex={tab === i ? 0 : -1} className={tab === i ? 'is-active' : ''} onClick={() => setTab(i)}>
            {label(t, i)}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-p${tab}`} aria-labelledby={`${uid}-t${tab}`} className="hs-tabs__panel" tabIndex={0}>
        {tab === 0 && (
          <div className="hs-overview">
            <div>
              <p className="hs-overview__lead">{service.desc}</p>
              <p>{service.long}</p>
              <ul className="hs-checks">
                {service.included.map((x) => (
                  <li key={x}><BsCheckCircleFill color="#10b981" aria-hidden="true" /> {x}</li>
                ))}
              </ul>
            </div>
            <div className="hs-warranty">
              <BsShieldCheck size={32} color="#f97316" aria-hidden="true" />
              <div>
                <strong>Service Warranty</strong>
                <span>{service.warranty}</span>
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <ul className="hs-incl">
              {service.included.map((x) => (
                <li key={x}><BsCheckCircleFill color="#10b981" aria-hidden="true" /> <span>{x}</span></li>
              ))}
            </ul>
            <p className="hs-note"><BsInfoCircle aria-hidden="true" /> Spare parts, if needed, are charged separately and agreed with you before work starts.</p>
          </div>
        )}

        {tab === 2 && <Accordion items={service.faqs} defaultOpen={0} />}

        {tab === 3 && (
          <div className="hs-reviews">
            <div className="hs-reviews__sum">
              <div className="hs-reviews__score"><b>{service.rating.toFixed(1)}</b><Stars value={service.rating} size={15} color="#f5a623" /><small>{service.reviews} reviews</small></div>
              <ul>
                {dist.map((d) => (
                  <li key={d.n}><span>{d.n} <BsStarFill size={10} color="#f5a623" aria-hidden="true" /></span><i><em style={{ width: `${d.pct}%` }} /></i></li>
                ))}
              </ul>
            </div>
            <ul className="hs-reviews__list">
              {reviews.map((r) => (
                <li key={r.name}>
                  <div className="hs-reviews__top"><strong>{r.name}</strong><small>{r.date}</small></div>
                  <Stars value={r.rating} size={13} color="#f5a623" />
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
