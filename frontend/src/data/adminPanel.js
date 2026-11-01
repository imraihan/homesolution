// Mock data for the /admin panel. TODO(backend): replace with API data.
import { SERVICES, CATEGORIES, AREAS } from './services';

export const ADMIN_STATS = [
  { id: 'users', label: 'Total Users', value: '1,250', delta: 12, icon: 'users', tone: 'blue' },
  { id: 'providers', label: 'Providers', value: '350', delta: 8, icon: 'provider', tone: 'purple' },
  { id: 'today', label: "Today's Bookings", value: '980', delta: 25, icon: 'bookings', tone: 'orange' },
  { id: 'revenue', label: 'Revenue', value: '৳125,450', delta: 15, icon: 'earnings', tone: 'green' },
];

export const BOOKINGS_OVERVIEW = [
  { label: '6 May', value: 90 },
  { label: '7 May', value: 88 },
  { label: '8 May', value: 120 },
  { label: '9 May', value: 98 },
  { label: '10 May', value: 130 },
  { label: '11 May', value: 112 },
  { label: '12 May', value: 138 },
  { label: '13 May', value: 124 },
  { label: '14 May', value: 150 },
];

export const BOOKINGS_BY_SERVICE = [
  { label: 'Plumbing', value: 40, color: '#2563eb' },
  { label: 'Electrician', value: 30, color: '#10b981' },
  { label: 'Cleaning', value: 20, color: '#f97316' },
  { label: 'Carpenter', value: 10, color: '#fbbf24' },
];

const CUSTOMERS = ['Rasel Ahmed', 'Mehedi Hasan', 'Sadia Islam', 'Nusrat Jahan', 'Tanvir Alam', 'Farhana Akter', 'Imran Hossain', 'Sumaiya Rahman', 'Jahid Karim', 'Lamia Chowdhury'];
const PROVIDER_NAMES = ['John Doe', 'Karim Uddin', 'Sadia Cleaners', 'Mizan Carpentry', 'Rafiq Electric', 'Nasir Plumbing'];
const STATUS = ['Confirmed', 'Ongoing', 'Completed', 'Pending', 'Completed', 'Cancelled', 'Completed', 'Confirmed'];
const SVC = [
  ['Plumbing', 299], ['Electrician', 399], ['Cleaning', 599], ['Carpenter', 449], ['Plumbing', 349], ['Cleaning', 899],
];

export const ADMIN_BOOKINGS = Array.from({ length: 24 }, (_, i) => {
  const [service, amount] = SVC[i % SVC.length];
  return {
    id: `#HS-${1001 + i}`,
    service,
    customer: CUSTOMERS[i % CUSTOMERS.length],
    provider: PROVIDER_NAMES[(i + 2) % PROVIDER_NAMES.length],
    date: `2026-11-${String(1 + (i % 28)).padStart(2, '0')}`,
    area: AREAS[i % AREAS.length],
    status: i < 3 ? ['Confirmed', 'Ongoing', 'Completed'][i] : STATUS[i % STATUS.length],
    amount,
  };
});

export const ADMIN_USERS = CUSTOMERS.concat(['Rubel Mia', 'Tania Sultana', 'Hasan Mahmud', 'Mitu Das']).map((name, i) => ({
  id: `U-${2001 + i}`,
  name,
  phone: `0181${String(2000000 + i * 37211).slice(0, 7)}`,
  area: AREAS[i % AREAS.length],
  bookings: (i * 3) % 11 + 1,
  joined: `2026-0${(i % 9) + 1}-${String((i * 5) % 27 + 1).padStart(2, '0')}`,
  status: i % 7 === 6 ? 'Suspended' : 'Active',
}));

// status: Approved | Pending | Rejected | Suspended
export const ADMIN_PROVIDERS = [
  { id: 'P-301', name: 'John Doe', skill: 'Electrician', phone: '01711000001', area: 'Agrabad', rating: 4.9, jobs: 212, status: 'Approved', applied: '2026-02-10' },
  { id: 'P-302', name: 'Karim Uddin', skill: 'Plumbing', phone: '01711000002', area: 'GEC Circle', rating: 4.8, jobs: 188, status: 'Approved', applied: '2026-02-18' },
  { id: 'P-303', name: 'Sadia Cleaners', skill: 'Cleaning', phone: '01711000003', area: 'Khulshi', rating: 4.7, jobs: 143, status: 'Approved', applied: '2026-03-02' },
  { id: 'P-304', name: 'Mizan Carpentry', skill: 'Carpenter', phone: '01711000004', area: 'Nasirabad', rating: 4.6, jobs: 97, status: 'Approved', applied: '2026-03-21' },
  { id: 'P-305', name: 'Rafiq Hossain', skill: 'Electrician', phone: '01711000005', area: 'Halishahar', rating: 0, jobs: 0, status: 'Pending', applied: '2026-10-28' },
  { id: 'P-306', name: 'Abdul Malek', skill: 'Plumbing', phone: '01711000006', area: 'Pahartali', rating: 0, jobs: 0, status: 'Pending', applied: '2026-10-29' },
  { id: 'P-307', name: 'Shilpi Akter', skill: 'Cleaning', phone: '01711000007', area: 'Chawkbazar', rating: 0, jobs: 0, status: 'Pending', applied: '2026-10-30' },
  { id: 'P-308', name: 'Nasir Uddin', skill: 'Plumbing', phone: '01711000008', area: 'Patenga', rating: 4.2, jobs: 31, status: 'Suspended', applied: '2026-05-05' },
  { id: 'P-309', name: 'Jewel Rana', skill: 'Carpenter', phone: '01711000009', area: 'Kotwali', rating: 0, jobs: 0, status: 'Rejected', applied: '2026-09-12' },
  { id: 'P-310', name: 'Mahfuz Alam', skill: 'Electrician', phone: '01711000010', area: 'Oxygen', rating: 4.5, jobs: 64, status: 'Approved', applied: '2026-06-14' },
];

export const ADMIN_SERVICES = SERVICES.map((s, i) => ({
  id: `S-${100 + i}`,
  name: s.name,
  category: s.category,
  price: s.price,
  duration: '1-2 hrs',
  description: s.desc,
  status: i % 9 === 8 ? 'Inactive' : 'Active',
}));

export const ADMIN_CATEGORIES = [
  ...CATEGORIES.map((c, i) => ({ id: `C-${10 + i}`, name: c.name, slug: c.slug, description: `${c.name} services for homes and offices`, status: 'Active' })),
  { id: 'C-20', name: 'Painting', slug: 'painting', description: 'Interior and exterior painting (coming soon)', status: 'Inactive' },
];

export const ADMIN_AREAS = AREAS.map((a, i) => ({
  id: `A-${i + 1}`,
  name: a,
  city: 'Chattogram',
  providers: 12 + ((i * 7) % 19),
  status: i === 9 ? 'Inactive' : 'Active',
}));

export const ADMIN_PAYMENTS = Array.from({ length: 18 }, (_, i) => ({
  id: `PAY-${6001 + i}`,
  booking: `#HS-${1001 + i}`,
  customer: CUSTOMERS[i % CUSTOMERS.length],
  method: ['bKash', 'Nagad', 'Card', 'Cash on Service'][i % 4],
  date: `2026-11-${String(1 + (i % 28)).padStart(2, '0')}`,
  amount: SVC[i % SVC.length][1],
  status: ['Paid', 'Paid', 'Pending', 'Paid', 'Failed', 'Refunded'][i % 6],
}));

export const ADMIN_COUPONS = [
  { id: 'CP-1', code: 'WELCOME100', type: 'Fixed', value: 100, minOrder: 500, expires: '2026-12-31', used: 214, status: 'Active' },
  { id: 'CP-2', code: 'CLEAN20', type: 'Percent', value: 20, minOrder: 800, expires: '2026-12-15', used: 96, status: 'Active' },
  { id: 'CP-3', code: 'WEEKEND10', type: 'Percent', value: 10, minOrder: 300, expires: '2026-11-30', used: 58, status: 'Active' },
  { id: 'CP-4', code: 'FIRSTFIX', type: 'Fixed', value: 150, minOrder: 700, expires: '2026-09-30', used: 301, status: 'Expired' },
];

export const ADMIN_REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: `R-${i + 1}`,
  customer: CUSTOMERS[i % CUSTOMERS.length],
  provider: PROVIDER_NAMES[i % PROVIDER_NAMES.length],
  service: SVC[i % SVC.length][0],
  rating: [5, 5, 4, 5, 3, 4, 5, 2, 5, 4, 5, 4][i],
  comment: ['Very professional and on time.', 'Excellent work, clean finish.', 'Good, but arrived a bit late.', 'Highly recommended!', 'Average experience.', 'Fair price and polite.', 'Fixed the problem in minutes.', 'Left a mess behind.', 'Great service.', 'Will book again.', 'Quick and friendly.', 'Worth the money.'][i],
  date: `2026-10-${String(2 + i * 2).padStart(2, '0')}`,
  status: i === 7 ? 'Flagged' : 'Published',
}));

export const ADMIN_TICKETS = [
  { id: 'TKT-310', subject: 'Payment deducted but booking not confirmed', customer: 'Sadia Islam', category: 'Payment', priority: 'High', date: '2026-10-31', status: 'Open' },
  { id: 'TKT-309', subject: 'Provider did not arrive', customer: 'Mehedi Hasan', category: 'Booking', priority: 'High', date: '2026-10-30', status: 'Open' },
  { id: 'TKT-308', subject: 'Cannot change phone number', customer: 'Nusrat Jahan', category: 'Account', priority: 'Low', date: '2026-10-29', status: 'In Progress' },
  { id: 'TKT-305', subject: 'Request invoice for company', customer: 'Tanvir Alam', category: 'Payment', priority: 'Medium', date: '2026-10-27', status: 'In Progress' },
  { id: 'TKT-301', subject: 'Provider behaviour complaint', customer: 'Farhana Akter', category: 'Provider', priority: 'Medium', date: '2026-10-23', status: 'Resolved' },
  { id: 'TKT-298', subject: 'Coupon code not applied', customer: 'Imran Hossain', category: 'Payment', priority: 'Low', date: '2026-10-20', status: 'Resolved' },
];

export const REPORT_REVENUE = [
  { label: 'Jun', value: 62000 }, { label: 'Jul', value: 71000 }, { label: 'Aug', value: 84500 },
  { label: 'Sep', value: 96000 }, { label: 'Oct', value: 118200 }, { label: 'Nov', value: 125450 },
];
export const REPORT_TOP_SERVICES = [
  { name: 'Plumbing Service', bookings: 312, revenue: 93288 },
  { name: 'Deep Cleaning', bookings: 204, revenue: 183396 },
  { name: 'Electrician Service', bookings: 187, revenue: 74613 },
  { name: 'Carpenter Service', bookings: 96, revenue: 43104 },
];

export const DEFAULT_SETTINGS = {
  siteName: 'Home Solution',
  supportEmail: 'support@homesolution.com',
  supportPhone: '01812-345678',
  serviceCharge: 50,
  currency: 'BDT',
  autoAssign: true,
  emailAlerts: true,
  maintenance: false,
};
