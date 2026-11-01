'use client';
import { PageHeader, Card, StatCard, StatusBadge } from '../ui';
import DataTable from '../DataTable';
import { USER_PAYMENTS } from '@/data/userPanel';
import { formatDate, money } from '@/lib/format';

const sum = (st) => USER_PAYMENTS.filter((p) => p.status === st).reduce((n, p) => n + p.amount, 0);

const COLUMNS = [
  { key: 'id', label: 'Payment ID' },
  { key: 'service', label: 'Service', render: (r) => <><strong>{r.service}</strong><small className="pn-sub">{r.booking}</small></> },
  { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
  { key: 'method', label: 'Method' },
  { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{money(r.amount)}</b> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function UserPayments() {
  return (
    <>
      <PageHeader title="Payment History" subtitle="All payments for your bookings." />
      <div className="pn-stats pn-stats--3">
        <StatCard label="Total paid" value={money(sum('Paid'))} icon="card" tone="green" />
        <StatCard label="Pending" value={money(sum('Pending'))} icon="calendar" tone="orange" />
        <StatCard label="Refunded" value={money(sum('Refunded'))} icon="wallet" tone="purple" />
      </div>
      <Card flush>
        <DataTable columns={COLUMNS} rows={USER_PAYMENTS} searchKeys={['id', 'service', 'booking', 'method']} filters={[{ key: 'status', label: 'Status', options: ['Paid', 'Pending', 'Refunded'] }]} pageSize={6} caption="Payments" />
      </Card>
    </>
  );
}
