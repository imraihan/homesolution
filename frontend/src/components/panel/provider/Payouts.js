'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsWallet2 } from 'react-icons/bs';
import { PageHeader, Card, Modal, FormField, StatusBadge } from '../ui';
import DataTable from '../DataTable';
import { requestPayout, showToast } from '@/store/slices/panelSlice';
import { PAYOUT_INFO } from '@/data/providerPanel';
import { formatDate, money } from '@/lib/format';

const COLUMNS = [
  { key: 'id', label: 'Payout' },
  { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
  { key: 'method', label: 'Method' },
  { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{money(r.amount)}</b> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
];

export default function ProviderPayouts() {
  const dispatch = useDispatch();
  const { balance, history } = useSelector((s) => s.panel.provider.payout);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bKash');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const n = Number(amount);
    if (!n || n < PAYOUT_INFO.minPayout) return setErr(`Minimum payout is ${money(PAYOUT_INFO.minPayout)}`);
    if (n > balance) return setErr('That is more than your available balance');
    dispatch(requestPayout({ amount: n, method })); // TODO(backend): POST /partners/payouts
    dispatch(showToast(`Payout of ${money(n)} requested`));
    setOpen(false);
    setAmount('');
    setErr('');
  };

  return (
    <>
      <PageHeader title="Payouts" subtitle="Withdraw your earnings." />
      <section className="pn-balance">
        <span className="pn-balance__icon"><BsWallet2 size={26} aria-hidden="true" /></span>
        <div>
          <small>Available balance</small>
          <strong>{money(balance)}</strong>
          <span>Payout account: {PAYOUT_INFO.method}</span>
        </div>
        <button type="button" className="pn-btn pn-btn--light" disabled={balance < PAYOUT_INFO.minPayout} onClick={() => setOpen(true)}>Request payout</button>
      </section>
      <Card title="Payout history" flush>
        <DataTable columns={COLUMNS} rows={history} searchKeys={['id', 'method']} filters={[{ key: 'status', label: 'Status', options: ['Paid', 'Processing'] }]} pageSize={6} caption="Payout history" />
      </Card>

      <Modal
        open={open}
        title="Request payout"
        size="sm"
        onClose={() => { setOpen(false); setErr(''); }}
        footer={
          <>
            <button type="button" className="pn-btn pn-btn--ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" form="payout-form" className="pn-btn pn-btn--primary">Request</button>
          </>
        }
      >
        <form id="payout-form" className="pn-form pn-form--1" onSubmit={submit} noValidate>
          <FormField label={`Amount (max ${money(balance)})`} type="number" min={PAYOUT_INFO.minPayout} value={amount} error={err} placeholder={String(PAYOUT_INFO.minPayout)} onChange={(e) => { setAmount(e.target.value); setErr(''); }} />
          <FormField label="Send to" type="select" options={['bKash', 'Nagad', 'Bank transfer']} value={method} onChange={(e) => setMethod(e.target.value)} />
        </form>
      </Modal>
    </>
  );
}
