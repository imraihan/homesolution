'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTelephone, BsWhatsapp, BsEnvelope } from 'react-icons/bs';
import { PageHeader, Card, StatusBadge, FormField } from '../ui';
import DataTable from '../DataTable';
import { addUserTicket, showToast } from '@/store/slices/panelSlice';
import { TICKET_CATEGORIES } from '@/data/userPanel';
import { CONTACT } from '@/lib/site';
import { formatDate } from '@/lib/format';

const COLUMNS = [
  { key: 'id', label: 'Ticket' },
  { key: 'subject', wrap: true, label: 'Subject' },
  { key: 'category', label: 'Category' },
  { key: 'date', label: 'Opened', render: (r) => formatDate(r.date) },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];
const BLANK = { category: TICKET_CATEGORIES[0], subject: '', message: '' };

export default function UserSupport() {
  const dispatch = useDispatch();
  const tickets = useSelector((s) => s.panel.user.tickets);
  const [f, setF] = useState(BLANK);
  const [err, setErr] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (f.subject.trim().length < 4) errs.subject = 'Please enter a short subject';
    if (f.message.trim().length < 10) errs.message = 'Describe the problem in at least 10 characters';
    setErr(errs);
    if (Object.keys(errs).length) return;
    dispatch(addUserTicket({ category: f.category, subject: f.subject.trim(), message: f.message.trim() }));
    dispatch(showToast('Ticket submitted. We will reply soon.'));
    setF(BLANK);
  };

  return (
    <>
      <PageHeader title="Support" subtitle="Need help? Open a ticket or reach us directly." />
      <div className="pn-grid pn-grid--support">
        <Card title="Create a new ticket">
          <form className="pn-form" onSubmit={submit} noValidate>
            <FormField label="Category" type="select" options={TICKET_CATEGORIES} value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })} />
            <FormField label="Subject" value={f.subject} error={err.subject} placeholder="Short summary" onChange={(e) => setF({ ...f, subject: e.target.value })} />
            <FormField className="pn-field--full" label="Message" type="textarea" rows={5} value={f.message} error={err.message} placeholder="Tell us what happened" onChange={(e) => setF({ ...f, message: e.target.value })} />
            <div className="pn-field--full"><button className="pn-btn pn-btn--primary">Submit ticket</button></div>
          </form>
        </Card>
        <Card title="Contact us">
          <ul className="pn-contact">
            <li><BsTelephone aria-hidden="true" /><div><strong>{CONTACT.phone}</strong><small>{CONTACT.hours}</small></div></li>
            <li><BsWhatsapp aria-hidden="true" /><div><strong>WhatsApp chat</strong><small>Replies within minutes</small></div></li>
            <li><BsEnvelope aria-hidden="true" /><div><strong>{CONTACT.email}</strong><small>We reply within 24 hours</small></div></li>
          </ul>
        </Card>
      </div>
      <Card title="Your tickets" flush>
        <DataTable columns={COLUMNS} rows={tickets} searchKeys={['id', 'subject']} pageSize={5} caption="Support tickets" />
      </Card>
    </>
  );
}
