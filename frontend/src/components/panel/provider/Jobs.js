'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCalendar3, BsGeoAlt, BsPerson, BsCheck2 } from 'react-icons/bs';
import { PageHeader, Tabs, StatusBadge, EmptyState } from '../ui';
import { advanceJob, showToast } from '@/store/slices/panelSlice';
import { JOB_FLOW } from '@/data/providerPanel';
import { formatDate, money } from '@/lib/format';

const NEXT_LABEL = { Accepted: 'Mark as on the way', 'On the way': 'Start job', 'In progress': 'Mark completed' };

export default function ProviderJobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((s) => s.panel.provider.jobs);
  const [tab, setTab] = useState('Ongoing');
  const ongoing = jobs.filter((j) => j.status !== 'Completed');
  const done = jobs.filter((j) => j.status === 'Completed');
  const list = tab === 'Ongoing' ? ongoing : done;

  const advance = (j) => {
    const next = JOB_FLOW[JOB_FLOW.indexOf(j.status) + 1];
    dispatch(advanceJob(j.id));
    dispatch(showToast(`${j.id}: ${next}`));
  };

  return (
    <>
      <PageHeader title="My Jobs" subtitle="Move each job forward as you work." />
      <Tabs tabs={[{ value: 'Ongoing', label: 'Ongoing', count: ongoing.length }, { value: 'Completed', label: 'Completed', count: done.length }]} value={tab} onChange={setTab} />
      <div className="pn-bookings">
        {list.map((j) => {
          const step = JOB_FLOW.indexOf(j.status);
          return (
            <article key={j.id} className="pn-job">
              <header>
                <div><h3>{j.service}</h3><small>{j.id}</small></div>
                <StatusBadge status={j.status} />
              </header>
              <ul className="pn-meta">
                <li><BsPerson aria-hidden="true" /> {j.customer}</li>
                <li><BsGeoAlt aria-hidden="true" /> {j.area}, Chattogram</li>
                <li><BsCalendar3 aria-hidden="true" /> {formatDate(j.date)}, {j.time}</li>
              </ul>
              <ol className="pn-progress" aria-label="Job progress">
                {JOB_FLOW.map((s, i) => (
                  <li key={s} className={i <= step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
                    <span>{i < step || j.status === 'Completed' ? <BsCheck2 aria-hidden="true" /> : i + 1}</span>
                    <small>{s}</small>
                  </li>
                ))}
              </ol>
              <footer>
                <strong>{money(j.amount)}</strong>
                {NEXT_LABEL[j.status] && <button type="button" className="pn-btn pn-btn--primary pn-btn--sm" onClick={() => advance(j)}>{NEXT_LABEL[j.status]}</button>}
              </footer>
            </article>
          );
        })}
        {list.length === 0 && <EmptyState title={`No ${tab.toLowerCase()} jobs`} text="Accept a request to get started." />}
      </div>
    </>
  );
}
