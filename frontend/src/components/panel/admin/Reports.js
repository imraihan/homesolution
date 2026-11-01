'use client';
import { useSelector } from 'react-redux';
import { BsDownload } from 'react-icons/bs';
import { PageHeader, Card, StatCard } from '../ui';
import { BarChart, Donut } from '../charts';
import { REPORT_REVENUE, REPORT_TOP_SERVICES, BOOKINGS_BY_SERVICE } from '@/data/adminPanel';
import { money } from '@/lib/format';

export default function AdminReports() {
  const bookings = useSelector((s) => s.panel.admin.bookings);
  const completed = bookings.filter((b) => b.status === 'Completed');

  const exportCsv = () => {
    const head = ['ID', 'Service', 'Customer', 'Provider', 'Date', 'Status', 'Amount'];
    const lines = bookings.map((b) => [b.id, b.service, b.customer, b.provider, b.date, b.status, b.amount].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
    const blob = new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bookings-report.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <>
      <PageHeader title="Reports" subtitle="Revenue and booking performance." actions={<button type="button" className="pn-btn pn-btn--ghost" onClick={exportCsv}><BsDownload aria-hidden="true" /> Export bookings CSV</button>} />
      <div className="pn-stats pn-stats--4">
        <StatCard label="Revenue (Nov)" value={money(125450)} delta={6} icon="earnings" tone="green" />
        <StatCard label="Bookings (listed)" value={bookings.length} icon="bookings" tone="blue" />
        <StatCard label="Completed" value={completed.length} icon="shield" tone="purple" />
        <StatCard label="Avg. order value" value={money(Math.round(bookings.reduce((n, b) => n + b.amount, 0) / bookings.length))} icon="card" tone="orange" />
      </div>
      <div className="pn-grid pn-grid--chart">
        <Card title="Monthly revenue"><BarChart data={REPORT_REVENUE} label="Monthly revenue" format={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)} /></Card>
        <Card title="Share by service"><Donut data={BOOKINGS_BY_SERVICE} label="Share by service" /></Card>
      </div>
      <Card title="Top services" flush>
        <div className="pn-table"><div className="pn-table__scroll">
          <table>
            <thead><tr><th scope="col">Service</th><th scope="col" className="t-right">Bookings</th><th scope="col" className="t-right">Revenue</th></tr></thead>
            <tbody>
              {REPORT_TOP_SERVICES.map((s) => (
                <tr key={s.name}>
                  <td data-label="Service"><strong>{s.name}</strong></td>
                  <td data-label="Bookings" className="t-right">{s.bookings}</td>
                  <td data-label="Revenue" className="t-right"><b>{money(s.revenue)}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      </Card>
    </>
  );
}
