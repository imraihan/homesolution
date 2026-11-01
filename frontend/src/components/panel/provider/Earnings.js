'use client';
import { PageHeader, Card, StatCard } from '../ui';
import DataTable from '../DataTable';
import { BarChart } from '../charts';
import { EARNINGS_WEEKLY, EARNINGS_HISTORY } from '@/data/providerPanel';
import { formatDate, money } from '@/lib/format';

const week = EARNINGS_WEEKLY.reduce((n, d) => n + d.value, 0);
const total = EARNINGS_HISTORY.reduce((n, r) => n + r.net, 0);
const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'job', wrap: true, label: 'Job' },
  { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
  { key: 'gross', label: 'Gross', align: 'right', render: (r) => money(r.gross) },
  { key: 'fee', label: 'Platform fee', align: 'right', render: (r) => `-${money(r.fee)}` },
  { key: 'net', label: 'Net', align: 'right', render: (r) => <b>{money(r.net)}</b> },
];

export default function ProviderEarnings() {
  return (
    <>
      <PageHeader title="Earnings" subtitle="What you earned from completed jobs." />
      <div className="pn-stats pn-stats--3">
        <StatCard label="This week" value={money(week)} delta={9} icon="earnings" tone="green" />
        <StatCard label="Last 8 jobs (net)" value={money(total)} icon="wallet" tone="blue" />
        <StatCard label="Today" value={money(1250)} icon="calendar" tone="orange" />
      </div>
      <Card title="Earnings this week"><BarChart data={EARNINGS_WEEKLY} color="#10b981" label="Earnings per day" format={(v) => (v >= 1000 ? `${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k` : v)} /></Card>
      <Card title="Earnings history" flush>
        <DataTable columns={COLUMNS} rows={EARNINGS_HISTORY} searchKeys={['id', 'job']} pageSize={6} caption="Earnings history" />
      </Card>
    </>
  );
}
