'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsHeartFill, BsStarFill } from 'react-icons/bs';
import { PageHeader, EmptyState } from '../ui';
import ServiceThumb from '../../ui/ServiceThumb';
import { toggleWish } from '@/store/slices/wishlistSlice';
import { showToast } from '@/store/slices/panelSlice';
import { getService } from '@/data/services';
import { money } from '@/lib/format';

export default function UserWishlist() {
  const dispatch = useDispatch();
  const { slugs, hydrated } = useSelector((s) => s.wishlist);
  const items = slugs.map(getService).filter(Boolean);

  return (
    <>
      <PageHeader title="Wishlist" subtitle="Services you saved for later." actions={<Link href="/services" className="pn-btn pn-btn--ghost">Browse services</Link>} />
      {hydrated && items.length === 0 && (
        <EmptyState title="Your wishlist is empty" text="Tap the heart on any service to save it here." action={<Link href="/services" className="pn-btn pn-btn--primary">Explore services</Link>} />
      )}
      <div className="pn-grid pn-grid--cards">
        {items.map((s) => (
          <article key={s.slug} className="pn-wish">
            <Link href={`/services/${s.slug}`} className="pn-wish__img" aria-label={s.name}><ServiceThumb category={s.category} alt="" sizes="320px" /></Link>
            <div className="pn-wish__body">
              <h3><Link href={`/services/${s.slug}`}>{s.name}</Link></h3>
              <p><BsStarFill color="#f59e0b" aria-hidden="true" /> {s.rating} <small>({s.reviews})</small></p>
              <div>
                <strong>{money(s.price)}</strong>
                <Link href={`/services/${s.slug}`} className="pn-btn pn-btn--primary pn-btn--sm">Book now</Link>
              </div>
            </div>
            <button type="button" className="pn-wish__heart" aria-label={`Remove ${s.name} from wishlist`} onClick={() => { dispatch(toggleWish(s.slug)); dispatch(showToast('Removed from wishlist')); }}><BsHeartFill aria-hidden="true" /></button>
          </article>
        ))}
      </div>
    </>
  );
}
