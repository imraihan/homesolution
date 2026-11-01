// Mock data for the /provider panel. TODO(backend): replace with API data.

export const PROVIDER_PROFILE = {
  name: 'John Doe',
  skill: 'Electrician',
  phone: '01711000001',
  email: 'john.doe@example.com',
  area: 'Agrabad',
  experience: '8',
  bio: 'Licensed electrician with 8 years of experience in home wiring, fan and light installation, and fault finding.',
  rating: 4.9,
  jobsDone: 212,
  verified: true,
};

export const PROVIDER_OVERVIEW = { earningsToday: 1250, rating: 4.9 };

// status: Pending | Accepted | Rejected
export const PROVIDER_REQUESTS = [
  { id: 'REQ-501', service: 'Plumbing Service', area: 'Agrabad, Chattogram', date: '2026-11-12', time: '10:00 AM', amount: 299, customer: 'Rasel Ahmed', status: 'Pending' },
  { id: 'REQ-502', service: 'Electrician Service', area: 'GEC, Chattogram', date: '2026-11-12', time: '02:00 PM', amount: 399, customer: 'Mehedi Hasan', status: 'Pending' },
  { id: 'REQ-503', service: 'Fan Installation', area: 'Khulshi, Chattogram', date: '2026-11-13', time: '11:00 AM', amount: 249, customer: 'Sadia Islam', status: 'Pending' },
  { id: 'REQ-504', service: 'Switchboard Repair', area: 'Nasirabad, Chattogram', date: '2026-11-14', time: '04:00 PM', amount: 349, customer: 'Tanvir Alam', status: 'Pending' },
  { id: 'REQ-505', service: 'Light Fitting', area: 'Halishahar, Chattogram', date: '2026-11-15', time: '09:00 AM', amount: 199, customer: 'Nusrat Jahan', status: 'Pending' },
];

// status: Accepted -> On the way -> In progress -> Completed
export const PROVIDER_JOBS = [
  { id: 'JOB-801', service: 'Wiring Check', customer: 'Farhana Akter', area: 'Agrabad', date: '2026-11-01', time: '10:00 AM', amount: 499, status: 'In progress' },
  { id: 'JOB-802', service: 'Fan Installation', customer: 'Imran Hossain', area: 'Khulshi', date: '2026-11-01', time: '02:00 PM', amount: 249, status: 'Accepted' },
  { id: 'JOB-803', service: 'MCB Replacement', customer: 'Sumaiya Rahman', area: 'GEC Circle', date: '2026-11-01', time: '05:00 PM', amount: 349, status: 'Accepted' },
  { id: 'JOB-790', service: 'Switch Repair', customer: 'Jahid Karim', area: 'Nasirabad', date: '2026-10-29', time: '11:00 AM', amount: 199, status: 'Completed' },
  { id: 'JOB-785', service: 'Light Fitting', customer: 'Lamia Chowdhury', area: 'Agrabad', date: '2026-10-27', time: '03:00 PM', amount: 299, status: 'Completed' },
  { id: 'JOB-777', service: 'Wiring Check', customer: 'Rubel Mia', area: 'Halishahar', date: '2026-10-24', time: '09:00 AM', amount: 499, status: 'Completed' },
];
export const JOB_FLOW = ['Accepted', 'On the way', 'In progress', 'Completed'];

export const EARNINGS_WEEKLY = [
  { label: 'Mon', value: 1200 }, { label: 'Tue', value: 850 }, { label: 'Wed', value: 1600 }, { label: 'Thu', value: 980 },
  { label: 'Fri', value: 2100 }, { label: 'Sat', value: 1750 }, { label: 'Sun', value: 1250 },
];
export const EARNINGS_HISTORY = [
  { id: 'E-901', job: 'JOB-790 Switch Repair', date: '2026-10-29', gross: 199, fee: 30, net: 169 },
  { id: 'E-898', job: 'JOB-785 Light Fitting', date: '2026-10-27', gross: 299, fee: 45, net: 254 },
  { id: 'E-891', job: 'JOB-777 Wiring Check', date: '2026-10-24', gross: 499, fee: 75, net: 424 },
  { id: 'E-880', job: 'JOB-770 Fan Installation', date: '2026-10-21', gross: 249, fee: 37, net: 212 },
  { id: 'E-872', job: 'JOB-764 Switchboard Repair', date: '2026-10-18', gross: 349, fee: 52, net: 297 },
  { id: 'E-860', job: 'JOB-751 Wiring Check', date: '2026-10-14', gross: 499, fee: 75, net: 424 },
  { id: 'E-851', job: 'JOB-743 Light Fitting', date: '2026-10-11', gross: 299, fee: 45, net: 254 },
  { id: 'E-840', job: 'JOB-731 MCB Replacement', date: '2026-10-08', gross: 349, fee: 52, net: 297 },
];

export const PROVIDER_REVIEWS = [
  { id: 'PR-1', customer: 'Farhana Akter', service: 'Wiring Check', rating: 5, comment: 'Very professional. Explained everything clearly.', date: '2026-10-30' },
  { id: 'PR-2', customer: 'Jahid Karim', service: 'Switch Repair', rating: 5, comment: 'Quick and tidy work.', date: '2026-10-29' },
  { id: 'PR-3', customer: 'Lamia Chowdhury', service: 'Light Fitting', rating: 4, comment: 'Good job, arrived 10 minutes late.', date: '2026-10-27' },
  { id: 'PR-4', customer: 'Rubel Mia', service: 'Wiring Check', rating: 5, comment: 'Found the fault I could not locate for weeks.', date: '2026-10-25' },
  { id: 'PR-5', customer: 'Hasan Mahmud', service: 'Fan Installation', rating: 5, comment: 'Excellent!', date: '2026-10-21' },
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const AVAILABILITY = DAYS.map((day, i) => ({
  day,
  enabled: i !== 4,
  slots: ['08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 02:00 PM', '02:00 PM - 04:00 PM', '04:00 PM - 06:00 PM'].map((t, j) => ({ time: t, on: i !== 4 && j !== 2 })),
}));

export const PAYOUT_INFO = { balance: 6420, minPayout: 500, method: 'bKash 01711-000001' };
// status: Paid | Processing | Rejected
export const PAYOUT_HISTORY = [
  { id: 'PO-120', date: '2026-10-25', amount: 3000, method: 'bKash', status: 'Paid' },
  { id: 'PO-111', date: '2026-10-10', amount: 2500, method: 'bKash', status: 'Paid' },
  { id: 'PO-104', date: '2026-09-26', amount: 4100, method: 'Bank transfer', status: 'Paid' },
  { id: 'PO-097', date: '2026-09-12', amount: 1800, method: 'bKash', status: 'Paid' },
];
