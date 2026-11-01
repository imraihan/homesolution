'use client';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusLg, BsPencil, BsTrash3 } from 'react-icons/bs';
import { Card, PageHeader, Modal, ConfirmModal, FormField } from './ui';
import DataTable from './DataTable';
import { adminAdd, adminUpdate, adminRemove, showToast } from '@/store/slices/panelSlice';

/**
 * Generic admin list page with client-side CRUD against the Redux mock store.
 *  collection: key in state.panel.admin
 *  fields: [{ name, label, type, options?, required?, min?, hint?, full? }]
 */
export default function CrudPage({ title, subtitle, collection, singular, prefix, columns, fields, searchKeys, filters, defaults, canAdd = true, extraActions, pageSize = 8 }) {
  const dispatch = useDispatch();
  const rows = useSelector((s) => s.panel.admin[collection]);
  const [editing, setEditing] = useState(null); // null | 'new' | row
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [del, setDel] = useState(null);

  const open = (row) => {
    setForm(row === 'new' ? { ...defaults } : { ...row });
    setErrors({});
    setEditing(row);
  };
  const close = () => setEditing(null);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    fields.forEach((f) => {
      const v = form[f.name];
      if (f.required && (v === undefined || v === '' || v === null)) errs[f.name] = `${f.label} is required`;
      else if (f.type === 'number' && v !== '' && Number(v) < (f.min ?? 0)) errs[f.name] = `${f.label} must be at least ${f.min ?? 0}`;
    });
    if (Object.keys(errs).length) return setErrors(errs);
    const clean = { ...form };
    fields.forEach((f) => { if (f.type === 'number') clean[f.name] = Number(clean[f.name]); });
    if (editing === 'new') {
      dispatch(adminAdd({ key: collection, prefix, item: clean }));
      dispatch(showToast(`${singular} added`));
    } else {
      dispatch(adminUpdate({ key: collection, id: editing.id, patch: clean }));
      dispatch(showToast(`${singular} updated`));
    }
    close();
  };

  const actions = useMemo(
    () => (row) => [
      ...(extraActions ? extraActions(row, dispatch) : []),
      { label: 'Edit', icon: <BsPencil aria-hidden="true" />, onClick: () => open(row) },
      { label: 'Delete', icon: <BsTrash3 aria-hidden="true" />, tone: 'danger', onClick: () => setDel(row) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [extraActions, dispatch]
  );

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={canAdd && <button type="button" className="pn-btn pn-btn--primary" onClick={() => open('new')}><BsPlusLg aria-hidden="true" /> Add {singular}</button>}
      />
      <Card flush>
        <DataTable columns={columns} rows={rows} searchKeys={searchKeys} filters={filters} rowActions={actions} pageSize={pageSize} searchPlaceholder={`Search ${title.toLowerCase()}...`} caption={title} />
      </Card>

      <Modal
        open={!!editing}
        title={editing === 'new' ? `Add ${singular}` : `Edit ${singular}`}
        onClose={close}
        footer={
          <>
            <button type="button" className="pn-btn pn-btn--ghost" onClick={close}>Cancel</button>
            <button type="submit" form="crud-form" className="pn-btn pn-btn--primary">{editing === 'new' ? 'Add' : 'Save changes'}</button>
          </>
        }
      >
        <form id="crud-form" className="pn-form" onSubmit={submit} noValidate>
          {fields.map((f) => (
            <FormField
              key={f.name}
              label={f.label}
              type={f.type || 'text'}
              options={f.options}
              hint={f.hint}
              min={f.min}
              className={f.full || f.type === 'textarea' ? 'pn-field--full' : ''}
              value={form[f.name] ?? ''}
              error={errors[f.name]}
              onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
            />
          ))}
        </form>
      </Modal>

      <ConfirmModal
        open={!!del}
        danger
        title={`Delete ${singular.toLowerCase()}?`}
        text={del ? `"${del.name || del.code || del.id}" will be removed. This cannot be undone.` : ''}
        confirmLabel="Delete"
        onClose={() => setDel(null)}
        onConfirm={() => { dispatch(adminRemove({ key: collection, id: del.id })); dispatch(showToast(`${singular} deleted`)); }}
      />
    </>
  );
}
