'use client';
import { PageHeader, Card, Avatar } from '../ui';
import Stars from '../../ui/Stars';
import { PROVIDER_REVIEWS, PROVIDER_PROFILE } from '@/data/providerPanel';
import { formatDate } from '@/lib/format';

export default function ProviderReviews() {
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: PROVIDER_REVIEWS.filter((r) => r.rating === n).length }));
  return (
    <>
      <PageHeader title="Reviews" subtitle="What customers say about your work." />
      <div className="pn-grid pn-grid--support">
        <Card title="Your rating">
          <div className="pn-rating">
            <b>{PROVIDER_PROFILE.rating}</b>
            <Stars value={PROVIDER_PROFILE.rating} size={18} color="#f59e0b" />
            <small>{PROVIDER_PROFILE.jobsDone} completed jobs</small>
          </div>
          <ul className="pn-bars">
            {dist.map((d) => (
              <li key={d.n}><span>{d.n} star</span><i><em style={{ width: `${(d.c / PROVIDER_REVIEWS.length) * 100}%` }} /></i><b>{d.c}</b></li>
            ))}
          </ul>
        </Card>
        <Card title="Recent reviews">
          <ul className="pn-reviews">
            {PROVIDER_REVIEWS.map((r) => (
              <li key={r.id}>
                <Avatar name={r.customer} size={38} />
                <div>
                  <header><strong>{r.customer}</strong><small>{formatDate(r.date)}</small></header>
                  <Stars value={r.rating} size={13} color="#f59e0b" />
                  <p>{r.comment}</p>
                  <small className="pn-muted">{r.service}</small>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
