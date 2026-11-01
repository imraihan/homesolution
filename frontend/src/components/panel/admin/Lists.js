'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsCheckLg, BsXLg, BsSlashCircle, BsArrowCounterclockwise, BsFlag, BsEye, BsTrash3, BsHourglassSplit } from 'react-icons/bs';
import { PageHeader, Card, StatusBadge, Avatar, ConfirmModal, Tabs } from '../ui';
import DataTable from '../DataTable';
import { adminUpdate, adminRemove, showToast } from '@/store/slices/panelSlice';
import { formatDate, money } from '@/lib/format';

// Small helpers shared by the admin list pages.
function useAct() {
  const dispatch = useDispatch();
  return (key, id, patch, msg) => { dispatch(adminUpdate({ key, id, patch })); dispatch(showToast(msg)); };
}
const act = (label, icon, onClick, tone) => ({ label, icon, onClick, tone });
const stars = (n) => <span className="pn-stars" aria-label={`${n} out of 5`}>{'★'.repeat(n)}<i>{'★'.repeat(5 - n)}</i></span>;

export function AdminBookings() {
  const rows = useSelector((s) => s.panel.admin.bookings);
  const up = useAct();
  const cols = [
    { key: 'id', label: 'ID' },
    { key: 'service', label: 'Service' },
    { key: 'customer', label: 'Customer', render: (r) => <span className="pn-person"><Avatar name={r.customer} size={28} />{r.customer}</span> },
    { key: 'provider', label: 'Provider' },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{money(r.amount)}</b> },
  ];
  return (
    <>
      <PageHeader title="Bookings" subtitle="Review and manage customer bookings." />
      <Card flush>
        <DataTable
          columns={cols}
          rows={rows}
          searchKeys={['id', 'customer', 'provider', 'service']}
          filters={[{ key: 'status', label: 'Status', options: ['Pending', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled'] }, { key: 'service', label: 'Service', options: ['Plumbing', 'Electrician', 'Cleaning', 'Carpenter'] }]}
          rowActions={(r) => [
            r.status === 'Pending' && act('Confirm', <BsCheckLg aria-hidden="true" />, () => up('bookings', r.id, { status: 'Confirmed' }, `${r.id} confirmed`)),
            r.status === 'Confirmed' && act('Start', <BsHourglassSplit aria-hidden="true" />, () => up('bookings', r.id, { status: 'Ongoing' }, `${r.id} is ongoing`)),
            (r.status === 'Ongoing' || r.status === 'Confirmed') && act('Complete', <BsCheckLg aria-hidden="true" />, () => up('bookings', r.id, { status: 'Completed' }, `${r.id} completed`)),
            ['Pending', 'Confirmed'].includes(r.status) && act('Cancel', <BsXLg aria-hidden="true" />, () => up('bookings', r.id, { status: 'Cancelled' }, `${r.id} cancelled`), 'danger'),
          ]}
          caption="Bookings"
        />
      </Card>
    </>
  );
}

export function AdminUsers() {
  const rows = useSelector((s) => s.panel.admin.users);
  const up = useAct();
  const cols = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name', render: (r) => <span className="pn-person"><Avatar name={r.name} size={28} />{r.name}</span> },
    { key: 'phone', label: 'Phone' },
    { key: 'area', label: 'Area' },
    { key: 'bookings', label: 'Bookings', align: 'right' },
    { key: 'joined', label: 'Joined', render: (r) => formatDate(r.joined) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <>
      <PageHeader title="Users" subtitle="Registered customers." />
      <Card flush>
        <DataTable
          columns={cols}
          rows={rows}
          searchKeys={['id', 'name', 'phone', 'area']}
          filters={[{ key: 'status', label: 'Status', options: ['Active', 'Suspended'] }]}
          rowActions={(r) => [
            r.status === 'Active'
              ? act('Suspend', <BsSlashCircle aria-hidden="true" />, () => up('users', r.id, { status: 'Suspended' }, `${r.name} suspended`), 'danger')
              : act('Activate', <BsArrowCounterclockwise aria-hidden="true" />, () => up('users', r.id, { status: 'Active' }, `${r.name} reactivated`)),
          ]}
          caption="Users"
        />
      </Card>
    </>
  );
}

export function AdminProviders() {
  const rows = useSelector((s) => s.panel.admin.providers);
  const up = useAct();
  const [tab, setTab] = useState('All');
  const pending = rows.filter((r) => r.status === 'Pending').length;
  const list = tab === 'Applications' ? rows.filter((r) => r.status === 'Pending') : rows;
  const cols = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Provider', render: (r) => <span className="pn-person"><Avatar name={r.name} size={28} />{r.name}</span> },
    { key: 'skill', label: 'Skill' },
    { key: 'area', label: 'Area' },
    { key: 'rating', label: 'Rating', render: (r) => (r.rating ? `${r.rating} (${r.jobs} jobs)` : 'New') },
    { key: 'applied', label: 'Applied', render: (r) => formatDate(r.applied) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <>
      <PageHeader title="Providers" subtitle="Approve new applications and manage service providers." />
      <Tabs tabs={[{ value: 'All', label: 'All providers', count: rows.length }, { value: 'Applications', label: 'Applications', count: pending }]} value={tab} onChange={setTab} />
      <Card flush>
        <DataTable
          columns={cols}
          rows={list}
          searchKeys={['id', 'name', 'skill', 'area']}
          filters={[{ key: 'skill', label: 'Skill', options: ['Plumbing', 'Electrician', 'Cleaning', 'Carpenter'] }, { key: 'status', label: 'Status', options: ['Approved', 'Pending', 'Rejected', 'Suspended'] }]}
          rowActions={(r) => [
            r.status === 'Pending' && act('Approve', <BsCheckLg aria-hidden="true" />, () => up('providers', r.id, { status: 'Approved' }, `${r.name} approved`), 'success'),
            r.status === 'Pending' && act('Reject', <BsXLg aria-hidden="true" />, () => up('providers', r.id, { status: 'Rejected' }, `${r.name} rejected`), 'danger'),
            r.status === 'Approved' && act('Suspend', <BsSlashCircle aria-hidden="true" />, () => up('providers', r.id, { status: 'Suspended' }, `${r.name} suspended`), 'danger'),
            ['Suspended', 'Rejected'].includes(r.status) && act('Reinstate', <BsArrowCounterclockwise aria-hidden="true" />, () => up('providers', r.id, { status: 'Approved' }, `${r.name} approved`)),
          ]}
          caption="Providers"
        />
      </Card>
    </>
  );
}

export function AdminPayments() {
  const rows = useSelector((s) => s.panel.admin.payments);
  const up = useAct();
  const paid = rows.filter((r) => r.status === 'Paid').reduce((n, r) => n + r.amount, 0);
  const cols = [
    { key: 'id', label: 'Payment' },
    { key: 'booking', label: 'Booking' },
    { key: 'customer', label: 'Customer' },
    { key: 'method', label: 'Method' },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'amount', label: 'Amount', align: 'right', render: (r) => <b>{money(r.amount)}</b> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <>
      <PageHeader title="Payments" subtitle={`Collected so far: ${money(paid)}`} />
      <Card flush>
        <DataTable
          columns={cols}
          rows={rows}
          searchKeys={['id', 'booking', 'customer', 'method']}
          filters={[{ key: 'status', label: 'Status', options: ['Paid', 'Pending', 'Failed', 'Refunded'] }, { key: 'method', label: 'Method', options: ['bKash', 'Nagad', 'Card', 'Cash on Service'] }]}
          rowActions={(r) => [
            r.status === 'Paid' && act('Refund', <BsArrowCounterclockwise aria-hidden="true" />, () => up('payments', r.id, { status: 'Refunded' }, `${r.id} refunded`), 'danger'),
            r.status === 'Pending' && act('Mark paid', <BsCheckLg aria-hidden="true" />, () => up('payments', r.id, { status: 'Paid' }, `${r.id} marked paid`)),
          ]}
          caption="Payments"
        />
      </Card>
    </>
  );
}

export function AdminReviews() {
  const dispatch = useDispatch();
  const rows = useSelector((s) => s.panel.admin.reviews);
  const up = useAct();
  const [del, setDel] = useState(null);
  const cols = [
    { key: 'customer', label: 'Customer' },
    { key: 'provider', label: 'Provider' },
    { key: 'service', label: 'Service' },
    { key: 'rating', label: 'Rating', render: (r) => stars(r.rating) },
    { key: 'comment', wrap: true, label: 'Comment' },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <>
      <PageHeader title="Reviews" subtitle="Moderate customer reviews." />
      <Card flush>
        <DataTable
          columns={cols}
          rows={rows}
          searchKeys={['customer', 'provider', 'comment']}
          filters={[{ key: 'status', label: 'Status', options: ['Published', 'Flagged'] }]}
          rowActions={(r) => [
            r.status === 'Published'
              ? act('Flag', <BsFlag aria-hidden="true" />, () => up('reviews', r.id, { status: 'Flagged' }, 'Review flagged'))
              : act('Publish', <BsEye aria-hidden="true" />, () => up('reviews', r.id, { status: 'Published' }, 'Review published')),
            act('Delete', <BsTrash3 aria-hidden="true" />, () => setDel(r), 'danger'),
          ]}
          caption="Reviews"
        />
      </Card>
      <ConfirmModal open={!!del} danger title="Delete review?" text="The review will be removed permanently." confirmLabel="Delete" onClose={() => setDel(null)} onConfirm={() => { dispatch(adminRemove({ key: 'reviews', id: del.id })); dispatch(showToast('Review deleted')); }} />
    </>
  );
}

export function AdminTickets() {
  const rows = useSelector((s) => s.panel.admin.tickets);
  const up = useAct();
  const cols = [
    { key: 'id', label: 'Ticket' },
    { key: 'subject', wrap: true, label: 'Subject' },
    { key: 'customer', label: 'Customer' },
    { key: 'category', label: 'Category' },
    { key: 'priority', label: 'Priority', render: (r) => <StatusBadge status={r.priority} /> },
    { key: 'date', label: 'Opened', render: (r) => formatDate(r.date) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <>
      <PageHeader title="Support Tickets" subtitle="Customer help requests." />
      <Card flush>
        <DataTable
          columns={cols}
          rows={rows}
          searchKeys={['id', 'subject', 'customer']}
          filters={[{ key: 'status', label: 'Status', options: ['Open', 'In Progress', 'Resolved'] }, { key: 'priority', label: 'Priority', options: ['High', 'Medium', 'Low'] }]}
          rowActions={(r) => [
            r.status === 'Open' && act('Start', <BsHourglassSplit aria-hidden="true" />, () => up('tickets', r.id, { status: 'In Progress' }, `${r.id} in progress`)),
            r.status !== 'Resolved' && act('Resolve', <BsCheckLg aria-hidden="true" />, () => up('tickets', r.id, { status: 'Resolved' }, `${r.id} resolved`), 'success'),
            r.status === 'Resolved' && act('Reopen', <BsArrowCounterclockwise aria-hidden="true" />, () => up('tickets', r.id, { status: 'Open' }, `${r.id} reopened`)),
          ]}
          caption="Support tickets"
        />
      </Card>
    </>
  );
}
