'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { BsGeoAlt, BsArrowRight, BsCheckCircleFill, BsClockHistory } from 'react-icons/bs';
import { Card, StatCard, Avatar, StatusBadge, EmptyState } from '../ui';
import ServiceThumb from '../../ui/ServiceThumb';
import { formatDate, money } from '@/lib/format';

export default function UserDashboard() {
  const { bookings, profile } = useSelector((s) => s.panel.user);
  const count = (st) => bookings.filter((b) => b.status === st).length;
  const spent = bookings.filter((b) => b.status === 'Completed' || b.status === 'Ongoing').reduce((n, b) => n + b.price, 0);
  const upcoming = [...bookings].filter((b) => b.status === 'Upcoming').sort((a, b) => a.date.localeCompare(b.date))[0];
  const recent = [...bookings].filter((b) => b.status === 'Completed').sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <section className="pn-welcome" data-reveal>
        <div>
          <small>Welcome Back,</small>
          <h1>{profile.name}</h1>
        </div>
        <Avatar name={profile.name} size={52} tone={0} />
      </section>

      <div className="pn-stats pn-stats--4">
        <StatCard label="Upcoming" value={count('Upcoming')} icon="calendar" tone="blue" />
        <StatCard label="Ongoing" value={count('Ongoing')} icon="jobs" tone="orange" />
        <StatCard label="Completed" value={count('Completed')} icon="shield" tone="green" />
        <StatCard label="Total Spent" value={money(spent)} icon="card" tone="purple" />
      </div>

      <div className="pn-grid pn-grid--2">
        <Card title="Upcoming Booking">
          {upcoming ? (
            <div className="pn-upcoming">
              <div className="pn-upcoming__main">
                <span className="pn-upcoming__thumb"><ServiceThumb category={upcoming.category} alt="" sizes="72px" /></span>
                <div>
                  <strong>{upcoming.service}</strong>
                  <p>{formatDate(upcoming.date)}, {upcoming.time}</p>
                  <small><BsGeoAlt aria-hidden="true" /> {upcoming.city}</small>
                </div>
                <StatusBadge status={upcoming.status} />
              </div>
              <div className="pn-assigned">
                <div>
                  <small>Assigned to</small>
                  <strong>{upcoming.provider}</strong>
                </div>
                <Avatar name={upcoming.provider} size={40} />
              </div>
            </div>
          ) : (
            <EmptyState title="No upcoming bookings" text="Book a service and it will show up here." action={<Link href="/services" className="pn-btn pn-btn--primary">Browse services</Link>} />
          )}
        </Card>

        <Card title="Recent Orders">
          <ul className="pn-list">
            {recent.map((b) => (
              <li key={b.id}>
                <span className="pn-list__icon pn-list__icon--green"><BsCheckCircleFill aria-hidden="true" /></span>
                <div>
                  <strong>{b.service}</strong>
                  <small>{b.status} - {formatDate(b.date)}</small>
                </div>
                <b>{money(b.price)}</b>
              </li>
            ))}
            {recent.length === 0 && <li><span className="pn-list__icon"><BsClockHistory aria-hidden="true" /></span><div><strong>No orders yet</strong></div></li>}
          </ul>
          <Link href="/dashboard/bookings" className="pn-link">View All Bookings <BsArrowRight aria-hidden="true" /></Link>
        </Card>
      </div>
    </>
  );
}
