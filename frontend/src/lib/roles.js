// Role -> panel home + label. Roles: user | provider | admin.
export const ROLE_HOME = { user: '/dashboard', provider: '/provider', admin: '/admin' };
export const ROLE_LABEL = { user: 'User Dashboard', provider: 'Provider Panel', admin: 'Admin Panel' };
export const homeFor = (role) => ROLE_HOME[role] || '/dashboard';
// TODO(backend): remove the demo flag + DemoRoleSwitcher once real auth returns { user: { role } }.
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
