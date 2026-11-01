'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsGeoAlt, BsArrowRight } from 'react-icons/bs';
import { PageHeader, Card, EmptyState, StatusBadge } from '../ui';
import ServiceThumb from '../../ui/ServiceThumb';
import { respondRequest, showToast } from '@/store/slices/panelSlice';
import { formatDate, money } from '@/lib/format';

const catOf = (service) => (/plumb|pipe|tap/i.test(service) ? 'plumbing' : /clean/i.test(service) ? 'cleaning' : /door|furniture|wood/i.test(service) ? 'carpenter' : 'electrician');

export function RequestList({ limit, showAll }) {
  const dispatch = useDispatch();
  const requests = useSelector((s) => s.panel.provider.requests);
  const list = (limit ? requests.filter((r) => r.status === 'Pending') : requests).slice(0, limit || undefined);
  const respond = (r, status) => {
    dispatch(respondRequest({ id: r.id, status }));
    dispatch(showToast(status === 'Accepted' ? `Accepted ${r.service}. Added to My Jobs.` : `Rejected ${r.service}`));
  };
  return (
    <>
      <ul className="pn-requests">
        {list.map((r) => (
          <li key={r.id}>
            <span className="pn-requests__thumb"><ServiceThumb category={catOf(r.service)} alt="" sizes="52px" /></span>
            <div className="pn-requests__info">
              <strong>{r.service}</strong>
              <small><BsGeoAlt aria-hidden="true" /> {r.area}</small>
            </div>
            <div className="pn-requests__when">{formatDate(r.date)}, {r.time}</div>
            <b className="pn-requests__amt">{money(r.amount)}</b>
            <div className="pn-requests__acts">
              {r.status === 'Pending' ? (
                <>
                  <button type="button" className="pn-btn pn-btn--primary pn-btn--sm" onClick={() => respond(r, 'Accepted')}>Accept</button>
                  <button type="button" className="pn-btn pn-btn--danger-ghost pn-btn--sm" onClick={() => respond(r, 'Rejected')}>Reject</button>
                </>
              ) : (
                <StatusBadge status={r.status} />
              )}
            </div>
          </li>
        ))}
      </ul>
      {list.length === 0 && <EmptyState title="No pending requests" text="New job requests will appear here." />}
      {showAll && <Link href="/provider/requests" className="pn-link">View All Requests <BsArrowRight aria-hidden="true" /></Link>}
    </>
  );
}

export default function ProviderRequests() {
  return (
    <>
      <PageHeader title="Job Requests" subtitle="Accept or reject new jobs near you." />
      <Card><RequestList /></Card>
    </>
  );
}
