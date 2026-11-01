// Mock data for the /dashboard (user) panel. TODO(backend): replace with API data.

export const USER_PROFILE = {
  name: 'Rasel Ahmed',
  email: 'rasel.ahmed@example.com',
  phone: '01812345678',
  city: 'Chattogram',
  gender: 'Male',
  dob: '1994-08-14',
};

// status: Upcoming | Ongoing | Completed | Cancelled
export const USER_BOOKINGS = [
  { id: '#HS-1042', service: 'Electrician Service', category: 'electrician', date: '2026-11-12', time: '04:00 PM - 06:00 PM', area: 'Agrabad', city: 'Chattogram', status: 'Upcoming', price: 399, provider: 'John Doe', reviewed: false },
  { id: '#HS-1043', service: 'Deep Cleaning', category: 'cleaning', date: '2026-11-18', time: '10:00 AM - 12:00 PM', area: 'Khulshi', city: 'Chattogram', status: 'Upcoming', price: 899, provider: 'Sadia Cleaners', reviewed: false },
  { id: '#HS-1040', service: 'Pipe Leak Repair', category: 'plumbing', date: '2026-11-01', time: '12:00 PM - 02:00 PM', area: 'GEC Circle', city: 'Chattogram', status: 'Ongoing', price: 349, provider: 'Karim Uddin', reviewed: false },
  { id: '#HS-1031', service: 'Plumbing Service', category: 'plumbing', date: '2026-10-22', time: '10:00 AM - 12:00 PM', area: 'Agrabad', city: 'Chattogram', status: 'Completed', price: 299, provider: 'Karim Uddin', reviewed: true },
  { id: '#HS-1027', service: 'Deep Cleaning', category: 'cleaning', date: '2026-10-15', time: '08:00 AM - 10:00 AM', area: 'Nasirabad', city: 'Chattogram', status: 'Completed', price: 899, provider: 'Sadia Cleaners', reviewed: false },
  { id: '#HS-1019', service: 'Fan Installation', category: 'electrician', date: '2026-10-04', time: '02:00 PM - 04:00 PM', area: 'Agrabad', city: 'Chattogram', status: 'Completed', price: 249, provider: 'John Doe', reviewed: true },
  { id: '#HS-1012', service: 'Door Repair', category: 'carpenter', date: '2026-09-27', time: '04:00 PM - 06:00 PM', area: 'Khulshi', city: 'Chattogram', status: 'Completed', price: 449, provider: 'Mizan Carpentry', reviewed: false },
  { id: '#HS-1008', service: 'Sofa Cleaning', category: 'cleaning', date: '2026-09-18', time: '10:00 AM - 12:00 PM', area: 'Agrabad', city: 'Chattogram', status: 'Cancelled', price: 599, provider: 'Sadia Cleaners', reviewed: false },
  { id: '#HS-1003', service: 'Tap Installation', category: 'plumbing', date: '2026-09-09', time: '12:00 PM - 02:00 PM', area: 'Halishahar', city: 'Chattogram', status: 'Completed', price: 199, provider: 'Karim Uddin', reviewed: true },
];

export const USER_ADDRESSES = [
  { id: 'a1', label: 'Home', line: 'House 12, Road 3, Agrabad C/A', area: 'Agrabad', city: 'Chattogram', phone: '01812345678', isDefault: true },
  { id: 'a2', label: 'Office', line: 'Level 5, GEC Circle Tower', area: 'GEC Circle', city: 'Chattogram', phone: '01812345678', isDefault: false },
];

// type: booking | payment | offer | system
export const USER_NOTIFICATIONS = [
  { id: 'n1', type: 'booking', title: 'Provider assigned', text: 'John Doe will visit on 12 Nov for your Electrician Service.', time: '10 min ago', read: false },
  { id: 'n2', type: 'booking', title: 'Booking confirmed', text: 'Your Deep Cleaning (#HS-1043) is confirmed for 18 Nov.', time: '2 hours ago', read: false },
  { id: 'n3', type: 'offer', title: 'Weekend offer', text: 'Use code WELCOME100 for 100 taka off your next booking.', time: 'Yesterday', read: false },
  { id: 'n4', type: 'payment', title: 'Payment received', text: 'We received 299 taka for Plumbing Service (#HS-1031).', time: '22 Oct', read: true },
  { id: 'n5', type: 'system', title: 'Rate your experience', text: 'How was your Deep Cleaning on 15 Oct? Leave a review.', time: '16 Oct', read: true },
];

export const USER_PAYMENTS = [
  { id: 'PAY-5521', booking: '#HS-1040', service: 'Pipe Leak Repair', date: '2026-11-01', method: 'bKash', amount: 399, status: 'Pending' },
  { id: 'PAY-5498', booking: '#HS-1031', service: 'Plumbing Service', date: '2026-10-22', method: 'bKash', amount: 349, status: 'Paid' },
  { id: 'PAY-5460', booking: '#HS-1027', service: 'Deep Cleaning', date: '2026-10-15', method: 'Card', amount: 949, status: 'Paid' },
  { id: 'PAY-5402', booking: '#HS-1019', service: 'Fan Installation', date: '2026-10-04', method: 'Cash on Service', amount: 299, status: 'Paid' },
  { id: 'PAY-5377', booking: '#HS-1012', service: 'Door Repair', date: '2026-09-27', method: 'Nagad', amount: 499, status: 'Paid' },
  { id: 'PAY-5341', booking: '#HS-1008', service: 'Sofa Cleaning', date: '2026-09-18', method: 'Card', amount: 649, status: 'Refunded' },
  { id: 'PAY-5300', booking: '#HS-1003', service: 'Tap Installation', date: '2026-09-09', method: 'Cash on Service', amount: 249, status: 'Paid' },
];

export const USER_TICKETS = [
  { id: 'TKT-301', subject: 'Provider arrived late', category: 'Booking', date: '2026-10-23', status: 'Resolved' },
  { id: 'TKT-288', subject: 'Refund for cancelled sofa cleaning', category: 'Payment', date: '2026-09-19', status: 'Resolved' },
];

export const TICKET_CATEGORIES = ['Booking', 'Payment', 'Account', 'Provider', 'Other'];

export const REVIEW_TAGS = ['On time', 'Professional', 'Clean work', 'Fair price'];
