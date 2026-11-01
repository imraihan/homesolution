'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsCalendar3, BsGeoAlt, BsPerson, BsStarFill, BsStar } from 'react-icons/bs';
import { PageHeader, Tabs, StatusBadge, Modal, ConfirmModal, FormField, EmptyState } from '../ui';
import ServiceThumb from '../../ui/ServiceThumb';
import { userBookingStatus, userBookingReschedule, userBookingReviewed, showToast } from '@/store/slices/panelSlice';
import { formatDate, money, isoFromToday } from '@/lib/format';
import { TIME_SLOTS } from '@/data/services';
import { REVIEW_TAGS } from '@/data/userPanel';

const TABS = ['All', 'Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

export default function UserBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((s) => s.panel.user.bookings);
  const [tab, setTab] = useState('All');
  const [cancel, setCancel] = useState(null);
  const [resched, setResched] = useState(null);
  const [rs, setRs] = useState({ date: '', time: TIME_SLOTS[0] });
  const [review, setReview] = useState(null);
  const [rv, setRv] = useState({ rating: 5, comment: '', tags: [] });

  const list = bookings.filter((b) => tab === 'All' || b.status === tab);
  const tabs = TABS.map((t) => ({ value: t, label: t, count: t === 'All' ? bookings.length : bookings.filter((b) => b.status === t).length }));

  const openResched = (b) => {
    setRs({ date: b.date, time: b.time });
    setResched(b);
  };
  const openReview = (b) => {
    setRv({ rating: 5, comment: '', tags: [] });
    setReview(b);
  };

  return (
    <>
      <PageHeader title="My Bookings" subtitle="Track, reschedule or review your service bookings." actions={<Link href="/services" className="pn-btn pn-btn--primary">Book a service</Link>} />
      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      <div className="pn-bookings">
        {list.map((b) => (
          <article key={b.id} className="pn-booking">
            <span className="pn-booking__thumb"><ServiceThumb category={b.category} alt="" sizes="84px" /></span>
            <div className="pn-booking__body">
              <header>
                <div>
                  <h3>{b.service}</h3>
                  <small>{b.id}</small>
                </div>
                <StatusBadge status={b.status} />
              </header>
              <ul className="pn-meta">
                <li><BsCalendar3 aria-hidden="true" /> {formatDate(b.date)}, {b.time}</li>
                <li><BsGeoAlt aria-hidden="true" /> {b.area}, {b.city}</li>
                <li><BsPerson aria-hidden="true" /> {b.provider}</li>
              </ul>
            </div>
            <footer className="pn-booking__foot">
              <strong>{money(b.price)}</strong>
              <div className="pn-booking__acts">
                {b.status === 'Upcoming' && (
                  <>
                    <button type="button" className="pn-btn pn-btn--ghost pn-btn--sm" onClick={() => openResched(b)}>Reschedule</button>
                    <button type="button" className="pn-btn pn-btn--danger-ghost pn-btn--sm" onClick={() => setCancel(b)}>Cancel</button>
                  </>
                )}
                {b.status === 'Completed' && (b.reviewed
                  ? <span className="pn-done"><BsStarFill aria-hidden="true" /> Reviewed</span>
                  : <button type="button" className="pn-btn pn-btn--primary pn-btn--sm" onClick={() => openReview(b)}>Leave a review</button>)}
                {b.status === 'Ongoing' && <span className="pn-done pn-done--info">Provider is on the job</span>}
              </div>
            </footer>
          </article>
        ))}
        {list.length === 0 && <EmptyState title={`No ${tab === 'All' ? '' : tab.toLowerCase() + ' '}bookings`} text="Nothing to show for this filter." />}
      </div>

      <ConfirmModal
        open={!!cancel}
        danger
        title="Cancel this booking?"
        text={cancel ? `${cancel.service} on ${formatDate(cancel.date)} will be cancelled. Refunds follow our refund policy.` : ''}
        confirmLabel="Yes, cancel booking"
        onClose={() => setCancel(null)}
        onConfirm={() => { dispatch(userBookingStatus({ id: cancel.id, status: 'Cancelled' })); dispatch(showToast('Booking cancelled')); }}
      />

      <Modal
        open={!!resched}
        title="Reschedule booking"
        onClose={() => setResched(null)}
        size="sm"
        footer={
          <>
            <button type="button" className="pn-btn pn-btn--ghost" onClick={() => setResched(null)}>Close</button>
            <button type="button" className="pn-btn pn-btn--primary" disabled={!rs.date} onClick={() => { dispatch(userBookingReschedule({ id: resched.id, ...rs })); dispatch(showToast('Booking rescheduled')); setResched(null); }}>Save new time</button>
          </>
        }
      >
        <div className="pn-form pn-form--1">
          <FormField label="New date" type="date" min={isoFromToday(0)} value={rs.date} onChange={(e) => setRs({ ...rs, date: e.target.value })} />
          <FormField label="Time slot" type="select" options={TIME_SLOTS} value={rs.time} onChange={(e) => setRs({ ...rs, time: e.target.value })} />
        </div>
      </Modal>

      <Modal
        open={!!review}
        title={review ? `Review: ${review.service}` : 'Review'}
        onClose={() => setReview(null)}
        size="sm"
        footer={
          <>
            <button type="button" className="pn-btn pn-btn--ghost" onClick={() => setReview(null)}>Close</button>
            <button type="button" className="pn-btn pn-btn--primary" onClick={() => { dispatch(userBookingReviewed(review.id)); dispatch(showToast('Thanks for your review')); setReview(null); }}>Submit review</button>
          </>
        }
      >
        <div className="pn-form pn-form--1">
          <div className="pn-rate" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" role="radio" aria-checked={rv.rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} onClick={() => setRv({ ...rv, rating: n })}>
                {n <= rv.rating ? <BsStarFill size={28} /> : <BsStar size={28} />}
              </button>
            ))}
          </div>
          <div className="pn-chips">
            {REVIEW_TAGS.map((t) => (
              <button key={t} type="button" className={rv.tags.includes(t) ? 'is-on' : ''} onClick={() => setRv({ ...rv, tags: rv.tags.includes(t) ? rv.tags.filter((x) => x !== t) : [...rv.tags, t] })}>{t}</button>
            ))}
          </div>
          <FormField label="Comment (optional)" type="textarea" value={rv.comment} onChange={(e) => setRv({ ...rv, comment: e.target.value })} placeholder="Tell others about your experience" />
        </div>
      </Modal>
    </>
  );
}
