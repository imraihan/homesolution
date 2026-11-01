'use client';
import { useSelector } from 'react-redux';
import { PageHeader, Card, StatCard } from '../ui';
import { RequestList } from './Requests';
import { PROVIDER_OVERVIEW } from '@/data/providerPanel';
import { money } from '@/lib/format';

export default function ProviderDashboard() {
  const { requests, jobs, profile } = useSelector((s) => s.panel.provider);
  const newReq = requests.filter((r) => r.status === 'Pending').length;
  const ongoing = jobs.filter((j) => j.status !== 'Completed').length;
  return (
    <>
      <PageHeader title="Today's Overview" subtitle={`Welcome back, ${profile.name}.`} />
      <div className="pn-stats pn-stats--4">
        <StatCard label="New Requests" value={newReq} icon="bell" tone="green" />
        <StatCard label="Ongoing Jobs" value={ongoing} icon="jobs" tone="purple" />
        <StatCard label="Today's Earnings" value={money(PROVIDER_OVERVIEW.earningsToday)} icon="earnings" tone="blue" />
        <StatCard label="Rating" value={profile.rating} icon="starFill" tone="orange" />
      </div>
      <Card title="Job Requests"><RequestList limit={4} showAll /></Card>
    </>
  );
}
