'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';
import ServiceThumb from '../ui/ServiceThumb';
import { toggleWish } from '@/store/slices/wishlistSlice';
import { money } from '@/lib/format';

export default function ServiceCard({ service, image = null, index = 0, priority = false }) {
  const dispatch = useDispatch();
  const { slugs, hydrated } = useSelector((s) => s.wishlist);
  const wished = hydrated && slugs.includes(service.slug); // persisted state only after mount
  const href = `/services/${service.slug}`;

  return (
    <article className="hs-scard">
      <div className="hs-scard__media">
        <Link href={href} className="hs-scard__imglink" tabIndex={-1} aria-hidden="true">
          <ServiceThumb category={service.category} src={image} alt="" tone={index} priority={priority} />
        </Link>
        <button
          type="button"
          className={`hs-scard__heart ${wished ? 'is-on' : ''}`}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${service.name} from wishlist` : `Add ${service.name} to wishlist`}
          onClick={() => dispatch(toggleWish(service.slug))}
        >
          {wished ? <BsHeartFill size={15} aria-hidden="true" /> : <BsHeart size={15} aria-hidden="true" />}
        </button>
      </div>
      <div className="hs-scard__body">
        <h3><Link href={href}>{service.name}</Link></h3>
        <p className="hs-scard__price"><small>Starting from</small> <b>{money(service.price)}</b></p>
        <p className="hs-scard__rating">
          <BsStarFill color="#f5a623" size={12} aria-hidden="true" />
          <b>{service.rating.toFixed(1)}</b>
          <span>({service.reviews})</span>
        </p>
        <Link href={href} className="btn hs-btn hs-btn--primary hs-btn--block">Book Now</Link>
      </div>
    </article>
  );
}
