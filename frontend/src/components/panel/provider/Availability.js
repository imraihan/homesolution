'use client';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Card, Toggle } from '../ui';
import { toggleDay, toggleSlot, showToast } from '@/store/slices/panelSlice';

export default function ProviderAvailability() {
  const dispatch = useDispatch();
  const days = useSelector((s) => s.panel.provider.availability);
  return (
    <>
      <PageHeader title="Availability" subtitle="Choose the days and time slots you can take jobs." actions={<button type="button" className="pn-btn pn-btn--primary" onClick={() => dispatch(showToast('Availability saved'))}>Save schedule</button>} />
      <Card flush>
        <ul className="pn-sched">
          {days.map((d) => (
            <li key={d.day} className={d.enabled ? '' : 'is-off'}>
              <div className="pn-sched__day">
                <Toggle checked={d.enabled} label={`${d.day} available`} onChange={() => dispatch(toggleDay(d.day))} />
                <strong>{d.day}</strong>
                <small>{d.enabled ? `${d.slots.filter((s) => s.on).length} slots` : 'Day off'}</small>
              </div>
              <div className="pn-sched__slots" role="group" aria-label={`${d.day} time slots`}>
                {d.slots.map((s) => (
                  <button key={s.time} type="button" className={s.on && d.enabled ? 'is-on' : ''} disabled={!d.enabled} aria-pressed={s.on} onClick={() => dispatch(toggleSlot({ day: d.day, time: s.time }))}>{s.time}</button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
