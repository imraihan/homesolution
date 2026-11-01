'use client';
import { BsToggleOn } from 'react-icons/bs';
import CrudPage from '../CrudPage';
import { StatusBadge } from '../ui';
import { adminUpdate, showToast } from '@/store/slices/panelSlice';
import { money, formatDate } from '@/lib/format';
import { CATEGORIES } from '@/data/services';

const STATUS = ['Active', 'Inactive'];
const catName = (slug) => CATEGORIES.find((c) => c.slug === slug)?.name || slug;

// Reusable "toggle active" row action.
const toggle = (key, label) => (row, dispatch) => [
  {
    label: row.status === 'Active' ? 'Deactivate' : 'Activate',
    icon: <BsToggleOn aria-hidden="true" />,
    onClick: () => {
      dispatch(adminUpdate({ key, id: row.id, patch: { status: row.status === 'Active' ? 'Inactive' : 'Active' } }));
      dispatch(showToast(`${label} ${row.status === 'Active' ? 'deactivated' : 'activated'}`));
    },
  },
];

export function AdminServices() {
  return (
    <CrudPage
      title="Services"
      subtitle="The catalogue customers can book."
      collection="services"
      singular="Service"
      prefix="S-"
      searchKeys={['id', 'name', 'category']}
      filters={[{ key: 'category', label: 'Category', options: CATEGORIES.map((c) => c.slug) }, { key: 'status', label: 'Status', options: STATUS }]}
      defaults={{ name: '', category: CATEGORIES[0].slug, price: 299, duration: '1-2 hrs', description: '', status: 'Active' }}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Service', render: (r) => <strong>{r.name}</strong> },
        { key: 'category', label: 'Category', render: (r) => catName(r.category) },
        { key: 'price', label: 'Price', align: 'right', render: (r) => money(r.price) },
        { key: 'duration', label: 'Duration' },
        { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: 'name', label: 'Service name', required: true, full: true },
        { name: 'category', label: 'Category', type: 'select', options: CATEGORIES.map((c) => ({ value: c.slug, label: c.name })) },
        { name: 'price', label: 'Price (BDT)', type: 'number', required: true, min: 1 },
        { name: 'duration', label: 'Duration' },
        { name: 'status', label: 'Status', type: 'select', options: STATUS },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
      extraActions={toggle('services', 'Service')}
    />
  );
}

export function AdminCategories() {
  return (
    <CrudPage
      title="Categories"
      subtitle="Group services so customers can find them."
      collection="categories"
      singular="Category"
      prefix="C-"
      searchKeys={['id', 'name', 'slug']}
      filters={[{ key: 'status', label: 'Status', options: STATUS }]}
      defaults={{ name: '', slug: '', description: '', status: 'Active' }}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name', render: (r) => <strong>{r.name}</strong> },
        { key: 'slug', label: 'Slug' },
        { key: 'description', wrap: true, label: 'Description' },
        { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: 'name', label: 'Category name', required: true },
        { name: 'slug', label: 'URL slug', required: true, hint: 'Lowercase, used in /services?category=slug' },
        { name: 'status', label: 'Status', type: 'select', options: STATUS },
        { name: 'description', label: 'Description', type: 'textarea' },
      ]}
      extraActions={toggle('categories', 'Category')}
    />
  );
}

export function AdminAreas() {
  return (
    <CrudPage
      title="Areas"
      subtitle="Service coverage areas."
      collection="areas"
      singular="Area"
      prefix="A-"
      searchKeys={['id', 'name', 'city']}
      filters={[{ key: 'status', label: 'Status', options: STATUS }]}
      defaults={{ name: '', city: 'Chattogram', providers: 0, status: 'Active' }}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Area', render: (r) => <strong>{r.name}</strong> },
        { key: 'city', label: 'City' },
        { key: 'providers', label: 'Providers', align: 'right' },
        { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: 'name', label: 'Area name', required: true },
        { name: 'city', label: 'City', required: true },
        { name: 'providers', label: 'Providers', type: 'number', min: 0 },
        { name: 'status', label: 'Status', type: 'select', options: STATUS },
      ]}
      extraActions={toggle('areas', 'Area')}
    />
  );
}

export function AdminCoupons() {
  return (
    <CrudPage
      title="Coupons"
      subtitle="Discount codes for customers."
      collection="coupons"
      singular="Coupon"
      prefix="CP-"
      searchKeys={['id', 'code']}
      filters={[{ key: 'status', label: 'Status', options: ['Active', 'Inactive', 'Expired'] }, { key: 'type', label: 'Type', options: ['Fixed', 'Percent'] }]}
      defaults={{ code: '', type: 'Percent', value: 10, minOrder: 300, expires: '2026-12-31', used: 0, status: 'Active' }}
      columns={[
        { key: 'code', label: 'Code', render: (r) => <code className="pn-code">{r.code}</code> },
        { key: 'type', label: 'Type' },
        { key: 'value', label: 'Discount', render: (r) => (r.type === 'Percent' ? `${r.value}%` : money(r.value)) },
        { key: 'minOrder', label: 'Min order', align: 'right', render: (r) => money(r.minOrder) },
        { key: 'expires', label: 'Expires', render: (r) => formatDate(r.expires) },
        { key: 'used', label: 'Used', align: 'right' },
        { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
      ]}
      fields={[
        { name: 'code', label: 'Coupon code', required: true, hint: 'Upper case, no spaces' },
        { name: 'type', label: 'Type', type: 'select', options: ['Percent', 'Fixed'] },
        { name: 'value', label: 'Discount value', type: 'number', required: true, min: 1 },
        { name: 'minOrder', label: 'Minimum order (BDT)', type: 'number', min: 0 },
        { name: 'expires', label: 'Expiry date', type: 'date', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Expired'] },
      ]}
      extraActions={toggle('coupons', 'Coupon')}
    />
  );
}
