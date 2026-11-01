'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusLg, BsPencil, BsTrash3, BsGeoAltFill, BsHouseDoor, BsBuilding, BsTelephone } from 'react-icons/bs';
import { PageHeader, Modal, ConfirmModal, FormField, EmptyState } from '../ui';
import { saveAddress, removeAddress, showToast } from '@/store/slices/panelSlice';
import { AREAS } from '@/data/services';

const BLANK = { id: '', label: 'Home', line: '', area: AREAS[0], city: 'Chattogram', phone: '', isDefault: false };

export default function UserAddresses() {
  const dispatch = useDispatch();
  const addresses = useSelector((s) => s.panel.user.addresses);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [del, setDel] = useState(null);

  const open = (a) => {
    setErrors({});
    setForm(a ? { ...a } : { ...BLANK, isDefault: addresses.length === 0 });
  };
  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.line.trim()) errs.line = 'Address is required';
    if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(form.phone.replace(/[\s-]/g, ''))) errs.phone = 'Enter a valid Bangladeshi mobile number';
    if (Object.keys(errs).length) return setErrors(errs);
    dispatch(saveAddress(form));
    dispatch(showToast(form.id ? 'Address updated' : 'Address added'));
    setForm(null);
  };

  return (
    <>
      <PageHeader title="My Addresses" subtitle="Saved places for faster checkout." actions={<button type="button" className="pn-btn pn-btn--primary" onClick={() => open(null)}><BsPlusLg aria-hidden="true" /> Add address</button>} />
      <div className="pn-grid pn-grid--cards">
        {addresses.map((a) => (
          <article key={a.id} className={`pn-addr ${a.isDefault ? 'is-default' : ''}`}>
            <header>
              <span className="pn-addr__icon">{a.label === 'Office' ? <BsBuilding aria-hidden="true" /> : <BsHouseDoor aria-hidden="true" />}</span>
              <h3>{a.label}</h3>
              {a.isDefault && <span className="pn-badge pn-badge--success">Default</span>}
            </header>
            <p><BsGeoAltFill aria-hidden="true" /> {a.line}, {a.area}, {a.city}</p>
            <p><BsTelephone aria-hidden="true" /> {a.phone}</p>
            <footer>
              {!a.isDefault && <button type="button" className="pn-btn pn-btn--ghost pn-btn--sm" onClick={() => { dispatch(saveAddress({ ...a, isDefault: true })); dispatch(showToast('Default address changed')); }}>Make default</button>}
              <button type="button" className="pn-act" onClick={() => open(a)} aria-label={`Edit ${a.label} address`}><BsPencil aria-hidden="true" /><span>Edit</span></button>
              <button type="button" className="pn-act pn-act--danger" onClick={() => setDel(a)} aria-label={`Delete ${a.label} address`}><BsTrash3 aria-hidden="true" /><span>Delete</span></button>
            </footer>
          </article>
        ))}
      </div>
      {addresses.length === 0 && <EmptyState title="No saved addresses" text="Add one to speed up checkout." />}

      <Modal
        open={!!form}
        title={form?.id ? 'Edit address' : 'Add address'}
        onClose={() => setForm(null)}
        footer={
          <>
            <button type="button" className="pn-btn pn-btn--ghost" onClick={() => setForm(null)}>Cancel</button>
            <button type="submit" form="addr-form" className="pn-btn pn-btn--primary">Save address</button>
          </>
        }
      >
        {form && (
          <form id="addr-form" className="pn-form" onSubmit={submit} noValidate>
            <FormField label="Label" type="select" options={['Home', 'Office', 'Other']} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
            <FormField label="Area" type="select" options={AREAS} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
            <FormField className="pn-field--full" label="Full address" value={form.line} error={errors.line} placeholder="House, road, landmark" onChange={(e) => setForm({ ...form, line: e.target.value })} />
            <FormField label="Phone" type="tel" value={form.phone} error={errors.phone} placeholder="01812345678" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <FormField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <label className="pn-check pn-field--full">
              <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} /> Use as my default address
            </label>
          </form>
        )}
      </Modal>

      <ConfirmModal open={!!del} danger title="Delete address?" text={del ? `${del.label} (${del.line}) will be removed.` : ''} confirmLabel="Delete" onClose={() => setDel(null)} onConfirm={() => { dispatch(removeAddress(del.id)); dispatch(showToast('Address deleted')); }} />
    </>
  );
}
