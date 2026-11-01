'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { BsGeoAlt, BsChevronDown, BsList, BsX, BsCart3, BsDroplet, BsLightningChargeFill, BsHammer, BsBrush, BsGrid1X2, BsArrowRight, BsSpeedometer2, BsBoxArrowRight, BsTelephone } from 'react-icons/bs';
import Logo from '../ui/Logo';
import { toggleMenu, closeMenus, toggleServicesMenu, toggleCityMenu, toggleUserMenu } from '@/store/slices/uiSlice';
import { setCity } from '@/store/slices/locationSlice';
import { openCart } from '@/store/slices/cartSlice';
import { logout } from '@/store/slices/authSlice';
import { SERVICES, CONTACT } from '@/lib/site';
import { homeFor, ROLE_LABEL } from '@/lib/roles';

const ICONS = { plumbing: BsDroplet, electrician: BsLightningChargeFill, carpenter: BsHammer, cleaning: BsBrush };

const LINKS = [
  { href: '/', label: 'Home', exact: true },
  { href: '/services', label: 'Services', menu: true },
  { href: '/offers', label: 'Offers' },
  { href: '/become-a-partner', label: 'Become a Partner' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const ref = useRef(null);
  const { menuOpen, servicesMenuOpen, cityMenuOpen, userMenuOpen } = useSelector((s) => s.ui);
  const { city, cities } = useSelector((s) => s.location);
  const user = useSelector((s) => s.auth.user);
  const { items, hydrated } = useSelector((s) => s.cart);
  const count = hydrated ? items.length : 0; // only after mount: storage is not available on the server
  const close = () => dispatch(closeMenus());

  // Close any open menu on navigation, outside click and Escape.
  useEffect(() => {
    dispatch(closeMenus());
  }, [pathname, dispatch]);
  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) dispatch(closeMenus());
    };
    const onKey = (e) => e.key === 'Escape' && dispatch(closeMenus());
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [dispatch]);

  const isActive = (l) => (l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(`${l.href}/`));

  const cartBtn = (
    <button type="button" className="hs-cartbtn" aria-label={`Open cart${count ? `, ${count} item${count > 1 ? 's' : ''}` : ''}`} onClick={() => { close(); dispatch(openCart()); }}>
      <BsCart3 size={21} aria-hidden="true" />
      {count > 0 && <span className="hs-cartbtn__badge" aria-hidden="true">{count}</span>}
    </button>
  );

  return (
    <header className="hs-header" ref={ref}>
      <div className="container hs-header__bar">
        <Logo />

        <div className="hs-header__mobile">
          {cartBtn}
          <button
            type="button"
            className="hs-header__burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => dispatch(toggleMenu())}
          >
            {menuOpen ? <BsX size={28} /> : <BsList size={28} />}
          </button>
        </div>

        <nav id="main-nav" className={`hs-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          <ul className="hs-nav__list">
            {LINKS.map((l) => (
              <li key={l.href} className={l.menu ? 'hs-dd hs-dd--mega' : undefined}>
                {l.menu ? (
                  <>
                    <div className={`hs-nav__split ${isActive(l) ? 'is-active' : ''}`}>
                      <Link href={l.href} className={isActive(l) ? 'is-active' : undefined} aria-current={isActive(l) ? 'page' : undefined} onClick={close}>{l.label}</Link>
                      <button type="button" aria-label="Show service categories" aria-expanded={servicesMenuOpen} onClick={() => dispatch(toggleServicesMenu())}>
                        <BsChevronDown size={11} aria-hidden="true" />
                      </button>
                    </div>
                    <div className={`hs-mega ${servicesMenuOpen ? 'is-open' : ''}`}>
                      <div className="hs-mega__panel">
                        <ul className="hs-mega__grid">
                          {SERVICES.map((sv) => {
                            const Icon = ICONS[sv.slug] || BsGrid1X2;
                            return (
                              <li key={sv.slug}>
                                <Link href={`/services?category=${sv.slug}`} className={`hs-mega__item hs-mega__item--${sv.theme}`} onClick={(e) => { e.currentTarget.blur(); close(); }}>
                                  <span className="hs-mega__icon"><Icon size={20} aria-hidden="true" /></span>
                                  <span className="hs-mega__txt"><strong>{sv.name}</strong><small>{sv.desc}</small></span>
                                  <BsArrowRight className="hs-mega__go" size={14} aria-hidden="true" />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="hs-mega__foot">
                          <Link href="/services" className="hs-mega__all" onClick={close}><BsGrid1X2 aria-hidden="true" /> View all services <BsArrowRight aria-hidden="true" /></Link>
                          <a href={`tel:${CONTACT.phone.replace(/\D/g, '')}`} className="hs-mega__call"><BsTelephone aria-hidden="true" /> Urgent? {CONTACT.phone}</a>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={l.href} className={isActive(l) ? 'is-active' : undefined} aria-current={isActive(l) ? 'page' : undefined} onClick={close}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hs-nav__right">
            <div className="hs-dd hs-dd--city">
              <button type="button" className="hs-city" aria-expanded={cityMenuOpen} onClick={() => dispatch(toggleCityMenu())}>
                <BsGeoAlt aria-hidden="true" /> {city} <BsChevronDown size={11} aria-hidden="true" />
              </button>
              {cityMenuOpen && (
                <ul className="hs-dd__menu hs-dd__menu--right">
                  {cities.map((c) => (
                    <li key={c}>
                      <button type="button" onClick={() => { dispatch(setCity(c)); close(); }}>{c}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <span className="hs-nav__cart">{cartBtn}</span>
            {user ? (
              <div className="hs-dd hs-dd--user">
                <button type="button" className="hs-avatarbtn" aria-expanded={userMenuOpen} aria-haspopup="menu" onClick={() => dispatch(toggleUserMenu())}>
                  <span className="hs-avatar" aria-hidden="true">{(user.name || 'U').trim().charAt(0).toUpperCase()}</span>
                  <span className="hs-avatarbtn__name">{(user.name || 'Account').split(' ')[0]}</span>
                  <BsChevronDown size={11} aria-hidden="true" />
                </button>
                <ul className={`hs-dd__menu hs-dd__menu--right hs-usermenu ${userMenuOpen ? 'is-open' : ''}`} role="menu">
                  <li className="hs-usermenu__who"><strong>{user.name || 'Account'}</strong><small>{ROLE_LABEL[user.role] || 'Account'}</small></li>
                  <li><Link href={homeFor(user.role)} role="menuitem" onClick={close}><BsSpeedometer2 aria-hidden="true" /> {ROLE_LABEL[user.role] || 'Dashboard'}</Link></li>
                  <li><button type="button" role="menuitem" onClick={() => { dispatch(logout()); close(); }}><BsBoxArrowRight aria-hidden="true" /> Log out</button></li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="hs-nav__login" onClick={close}>Login</Link>
            )}
            <Link href="/services" className="btn hs-btn hs-btn--primary hs-btn--sm" onClick={close}>Book Now</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
