'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Card, FormField, Toggle } from '../ui';
import { adminSettings, showToast } from '@/store/slices/panelSlice';

export default function AdminSettings() {
  const dispatch = useDispatch();
  const settings = useSelector((s) => s.panel.admin.settings);
  const [f, setF] = useState(settings);
  const [err, setErr] = useState({});

  const save = (e) => {
    e.preventDefault();
    const errs = {};
    if (!f.siteName.trim()) errs.siteName = 'Site name is required';
    if (!/^\S+@\S+\.\S+$/.test(f.supportEmail)) errs.supportEmail = 'Enter a valid email';
    if (Number(f.serviceCharge) < 0 || f.serviceCharge === '') errs.serviceCharge = 'Enter 0 or more';
    setErr(errs);
    if (Object.keys(errs).length) return;
    dispatch(adminSettings({ ...f, serviceCharge: Number(f.serviceCharge) }));
    dispatch(showToast('Settings saved')); // TODO(backend): PUT /admin/settings
  };

  return (
    <>
      <PageHeader title="Settings" subtitle="Platform-wide configuration." />
      <form onSubmit={save} noValidate>
        <div className="pn-grid pn-grid--2 pn-grid--top">
          <Card title="General">
            <div className="pn-form">
              <FormField className="pn-field--full" label="Site name" value={f.siteName} error={err.siteName} onChange={(e) => setF({ ...f, siteName: e.target.value })} />
              <FormField label="Support email" type="email" value={f.supportEmail} error={err.supportEmail} onChange={(e) => setF({ ...f, supportEmail: e.target.value })} />
              <FormField label="Support phone" type="tel" value={f.supportPhone} onChange={(e) => setF({ ...f, supportPhone: e.target.value })} />
              <FormField label="Service charge (BDT)" type="number" min={0} value={f.serviceCharge} error={err.serviceCharge} onChange={(e) => setF({ ...f, serviceCharge: e.target.value })} />
              <FormField label="Currency" type="select" options={['BDT']} value={f.currency} onChange={(e) => setF({ ...f, currency: e.target.value })} />
            </div>
          </Card>
          <Card title="Preferences">
            <ul className="pn-switches">
              {[
                ['autoAssign', 'Auto-assign providers', 'Match new bookings with the nearest available provider.'],
                ['emailAlerts', 'Email alerts', 'Send admins an email for new tickets and applications.'],
                ['maintenance', 'Maintenance mode', 'Show a maintenance page to customers.'],
              ].map(([k, t, d]) => (
                <li key={k}>
                  <div><strong>{t}</strong><small>{d}</small></div>
                  <Toggle checked={!!f[k]} label={t} onChange={(v) => setF({ ...f, [k]: v })} />
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <button className="pn-btn pn-btn--primary">Save settings</button>
      </form>
    </>
  );
}
