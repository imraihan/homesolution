export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const SITE_NAME = 'Home Solution';
export const CONTACT = {
  phone: '01812-345678',
  email: 'support@homesolution.com',
  hours: 'Sat - Thu: 9:00 AM - 10:00 PM',
  address: 'Chattogram, Bangladesh',
};

export const SERVICES = [
  { slug: 'plumbing', name: 'Plumbing', desc: 'Pipe leak, tap, bathroom fittings & more', theme: 'blue', worker: 'plumber' },
  { slug: 'electrician', name: 'Electrician', desc: 'Light, fan, wiring, switch & more', theme: 'orange', worker: 'electrician' },
  { slug: 'carpenter', name: 'Carpenter', desc: 'Furniture, doors, shelves, wood work', theme: 'green', worker: 'carpenter' },
  { slug: 'cleaning', name: 'Cleaning', desc: 'Home, kitchen, sofa, bathroom cleaning', theme: 'purple', worker: 'cleaner' },
];

export const CITIES = ['Chattogram', 'Dhaka', 'Sylhet', 'Khulna', 'Rajshahi', 'Cumilla'];
