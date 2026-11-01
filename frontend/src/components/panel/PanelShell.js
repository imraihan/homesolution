'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { BsList, BsX, BsBoxArrowRight, BsBoxArrowUpRight, BsChevronDown, BsCheckCircleFill } from 'react-icons/bs';
import Logo from '../ui/Logo';
import { Avatar } from './ui';
import { ICONS } from './navIcons';
import { PANELS } from '@/data/panelNav';
import { homeFor, ROLE_LABEL } from '@/lib/roles';
import { logout } from '@/store/slices/authSlice';
import { clearToast } from '@/store/slices/panelSlice';

/**
 * Shared shell for /dashboard, /admin and /provider: own sidebar + topbar (NOT the public Header/Footer).
 * Doubles as the auth guard: reads the role from the Redux auth slice and redirects.
 * TODO(backend): validate the session/role server-side (middleware or /me) instead of trusting client state.
 */
export default function PanelShell({ role, children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user, ready } = useSelector((s) => s.auth);
  const toast = useSelector((s) => s.panel.toast);
  const badges = useSelector((s) => ({
    unreadNotifications: s.panel.user.notifications.filter((n) => !n.read).length,
    pendingBookings: s.panel.admin.bookings.filter((b) => b.status === 'Pending').length,
    pendingRequests: s.panel.provider.requests.filter((r) => r.status === 'Pending').length,
  }), (a, b) => a.unreadNotifications === b.unreadNotifications && a.pendingBookings === b.pendingBookings && a.pendingRequests === b.pendingRequests);
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState(false);
  const cfg = PANELS[role];
  const allowed = ready && user?.role === role;

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace('/login');
    else if (user.role !== role) router.replace(homeFor(user.role));
  }, [ready, user, role, router]);

  useEffect(() => {
    setDrawer(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawer) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setDrawer(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [drawer]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => dispatch(clearToast()), 2600);
    return () => clearTimeout(t);
  }, [toast, dispatch]);

  useEffect(() => {
    if (!menu) return undefined;
    const onDown = (e) => !e.target.closest?.('.pn-usermenu') && setMenu(false);
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [menu]);

  if (!allowed) {
    return (
      <div className="pn-gate" role="status" aria-live="polite">
        <span className="hs-spinner" aria-hidden="true" />
        <p>{ready ? 'Redirecting...' : 'Loading your panel...'}</p>
      </div>
    );
  }

  const isActive = (it) => (it.exact ? pathname === it.href : pathname === it.href || pathname.startsWith(`${it.href}/`));
  const doLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className={`pn pn--${role}`}>
      <a href="#pn-main" className="hs-skip">Skip to content</a>
      <div className={`pn-overlay ${drawer ? 'is-open' : ''}`} onClick={() => setDrawer(false)} aria-hidden="true" />
      <aside className={`pn-side ${drawer ? 'is-open' : ''}`} aria-label={`${cfg.title} navigation`}>
        <div className="pn-side__head">
          <h2>{cfg.title}</h2>
          <button type="button" className="pn-side__close" aria-label="Close menu" onClick={() => setDrawer(false)}><BsX size={26} /></button>
        </div>
        <nav>
          <ul>
            {cfg.items.map((it) => {
              const Icon = ICONS[it.icon];
              const count = it.badge ? badges[it.badge] : 0;
              return (
                <li key={it.href}>
                  <Link href={it.href} className={isActive(it) ? 'is-active' : ''} aria-current={isActive(it) ? 'page' : undefined}>
                    <Icon size={17} aria-hidden="true" />
                    <span>{it.label}</span>
                    {count > 0 && <b className="pn-pill" aria-label={`${count} new`}>{count}</b>}
                  </Link>
                </li>
              );
            })}
            <li>
              <button type="button" className="pn-side__logout" onClick={doLogout}>
                <BsBoxArrowRight size={17} aria-hidden="true" />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="pn-main">
        <header className="pn-top">
          <button type="button" className="pn-top__burger" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}><BsList size={26} /></button>
          <div className="pn-top__logo"><Logo /></div>
          <div className="pn-top__right">
            <Link href="/" className="pn-top__site"><BsBoxArrowUpRight aria-hidden="true" /> <span>View site</span></Link>
            <div className="pn-usermenu">
              <button type="button" className="pn-top__user" aria-expanded={menu} aria-haspopup="menu" onClick={() => setMenu((m) => !m)}>
                <Avatar name={user.name} size={34} />
                <span className="pn-top__name"><strong>{user.name}</strong><small>{ROLE_LABEL[role]}</small></span>
                <BsChevronDown size={11} aria-hidden="true" />
              </button>
              {menu && (
                <ul className="pn-usermenu__list" role="menu">
                  <li><Link href="/" role="menuitem">Back to website</Link></li>
                  <li><button type="button" role="menuitem" onClick={doLogout}><BsBoxArrowRight aria-hidden="true" /> Log out</button></li>
                </ul>
              )}
            </div>
          </div>
        </header>
        <main id="pn-main" className="pn-content" tabIndex={-1}>{children}</main>
      </div>

      {toast && (
        <div className="pn-toast" role="status" aria-live="polite" key={toast.id}>
          <BsCheckCircleFill aria-hidden="true" /> {toast.text}
        </div>
      )}
    </div>
  );
}
