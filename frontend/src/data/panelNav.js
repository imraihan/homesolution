// Sidebar definitions for the three role panels. `icon` is a key into components/panel/navIcons.js.
// `badge` names a selector in PanelShell (live count shown as a pill).

export const PANELS = {
  user: {
    title: 'User Dashboard',
    base: '/dashboard',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: 'dashboard', exact: true },
      { href: '/dashboard/bookings', label: 'My Bookings', icon: 'bookings' },
      { href: '/dashboard/addresses', label: 'My Addresses', icon: 'address' },
      { href: '/dashboard/notifications', label: 'Notifications', icon: 'bell', badge: 'unreadNotifications' },
      { href: '/dashboard/wishlist', label: 'Wishlist', icon: 'heart' },
      { href: '/dashboard/payments', label: 'Payment History', icon: 'card' },
      { href: '/dashboard/profile', label: 'Profile Settings', icon: 'user' },
      { href: '/dashboard/support', label: 'Support', icon: 'support' },
    ],
  },
  admin: {
    title: 'Admin Panel',
    base: '/admin',
    items: [
      { href: '/admin', label: 'Dashboard', icon: 'dashboard', exact: true },
      { href: '/admin/bookings', label: 'Bookings', icon: 'bookings', badge: 'pendingBookings' },
      { href: '/admin/users', label: 'Users', icon: 'users' },
      { href: '/admin/providers', label: 'Providers', icon: 'provider' },
      { href: '/admin/services', label: 'Services', icon: 'services' },
      { href: '/admin/categories', label: 'Categories', icon: 'categories' },
      { href: '/admin/areas', label: 'Areas', icon: 'address' },
      { href: '/admin/payments', label: 'Payments', icon: 'card' },
      { href: '/admin/coupons', label: 'Coupons', icon: 'coupon' },
      { href: '/admin/reviews', label: 'Reviews', icon: 'star' },
      { href: '/admin/tickets', label: 'Support Tickets', icon: 'support' },
      { href: '/admin/reports', label: 'Reports', icon: 'report' },
      { href: '/admin/settings', label: 'Settings', icon: 'settings' },
    ],
  },
  provider: {
    title: 'Provider Panel',
    base: '/provider',
    items: [
      { href: '/provider', label: 'Dashboard', icon: 'dashboard', exact: true },
      { href: '/provider/requests', label: 'Job Requests', icon: 'bell', badge: 'pendingRequests' },
      { href: '/provider/jobs', label: 'My Jobs', icon: 'jobs' },
      { href: '/provider/earnings', label: 'Earnings', icon: 'earnings' },
      { href: '/provider/reviews', label: 'Reviews', icon: 'star' },
      { href: '/provider/profile', label: 'My Profile', icon: 'user' },
      { href: '/provider/availability', label: 'Availability', icon: 'calendar' },
      { href: '/provider/payouts', label: 'Payouts', icon: 'wallet' },
    ],
  },
};
