'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { BsArrowRight } from 'react-icons/bs';
import { PageHeader, Card, StatCard, StatusBadge } from '../ui';
import { LineChart, Donut } from '../charts';
import { ADMIN_STATS, BOOKINGS_OVERVIEW, BOOKINGS_BY_SERVICE } from '@/data/adminPanel';
import { formatDate, money } from '@/lib/format';

export default function AdminDashboard() {
  const bookings = useSelector((s) => s.panel.admin.bookings);
  const recent = bookings.slice(0, 5);
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Platform overview for today." />
      <div className="pn-stats pn-stats--4">
        {ADMIN_STATS.map(({ id, ...s }) => <StatCard key={id} {...s} />)}
      </div>

      <div className="pn-grid pn-grid--chart">
        <Card title="Bookings Overview">
          <LineChart data={BOOKINGS_OVERVIEW} label="Bookings per day" height={250} />
        </Card>
        <Card title="Bookings by Service">
          <Donut data={BOOKINGS_BY_SERVICE} label="Bookings by service" />
        </Card>
      </div>

      <Card title="Recent Bookings" action={<Link href="/admin/bookings" className="pn-link">View All Bookings <BsArrowRight aria-hidden="true" /></Link>} flush>
        <div className="pn-table"><div className="pn-table__scroll">
          <table>
            <thead><tr><th scope="col">ID</th><th scope="col">Service</th><th scope="col">Customer</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col" className="t-right">Amount</th></tr></thead>
            <tbody>
              {recent.map((b) => (
                <tr key={b.id}>
                  <td data-label="ID">{b.id}</td>
                  <td data-label="Service">{b.service}</td>
                  <td data-label="Customer">{b.customer}</td>
                  <td data-label="Date">{formatDate(b.date)}</td>
                  <td data-label="Status"><StatusBadge status={b.status} /></td>
                  <td data-label="Amount" className="t-right"><b>{money(b.amount)}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      </Card>
    </>
  );
}
