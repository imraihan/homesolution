# Home Solution - Frontend

Next.js (App Router, JavaScript) + React + Redux Toolkit + Bootstrap 5 + custom SCSS. Home service marketplace for Chattogram, Bangladesh.

## Run

```bash
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

`NEXT_PUBLIC_API_URL` defaults to `http://localhost:8000/api` (Laravel, not built yet).

## Routes

`/`, `/services`, `/services/[slug]`, `/checkout`, `/become-a-partner`, `/about`, `/contact`, `/offers`, `/login`, `/register`. The cart is a modal (not a page), opened from the header icon or after "Add to Cart".

## Role panels (user / admin / provider)

Separate layouts (own sidebar + topbar, off-canvas drawer on mobile; NOT the public Header/Footer), all `noindex` and disallowed in `robots.js`:

- `/dashboard` (user): `/bookings`, `/addresses`, `/notifications`, `/wishlist`, `/payments`, `/profile` (profile, change phone, 2FA with QR placeholder, linked accounts), `/support`
- `/admin`: `/bookings`, `/users`, `/providers` (approve/reject), `/services`, `/categories`, `/areas`, `/coupons` (working client-side CRUD), `/payments`, `/reviews`, `/tickets`, `/reports`, `/settings`
- `/provider`: `/requests` (Accept/Reject), `/jobs` (status progression), `/earnings`, `/reviews`, `/profile`, `/availability`, `/payouts`

Code: route groups `src/app/(user|admin|provider)/` (thin pages + a layout wrapping `components/panel/PanelShell`, which is also the **auth guard**: reads `auth.user.role` from Redux, waits for `auth.ready`, redirects logged-out users to /login and wrong roles to their own panel). Components in `src/components/panel/{user,admin,provider}`, shared `ui.js`, `DataTable.js` (search/filter/paginate, cards on mobile), `CrudPage.js`, hand-rolled SVG `charts.js`. Styles: `src/styles/panel.scss`. Mock data: `src/data/{userPanel,adminPanel,providerPanel,panelNav}.js`, held in the `panel` Redux slice (changes live until reload). The signed-in user is persisted to `localStorage` (`hs_user`) after mount.

### Demo mode (DEV-ONLY, TODO(backend))

`NEXT_PUBLIC_DEMO_MODE=true` (default in `.env.local` / `.env.example`) shows a "DEMO MODE" role switcher on `/login` (`components/auth/DemoRoleSwitcher.js`) to enter each panel without the Laravel API. Set it to `false` to hide it. To remove completely: delete the component, its use in `AuthFlow.js`, `DEMO_MODE` in `lib/roles.js`, and `demoLogin` in `authSlice.js`. The real API login should return `user.role` (`user|provider|admin`). The guard is client-side only; add server-side checks with the backend.

## Look and motion

Brand palette tokens (`--brand-blue #2563EB`, orange `#F97316`, green `#10B981`, bg `#F8FAFC`, text `#111827`, gray `#6B7280`) and gradients live in `app/globals.scss`; `styles/polish.scss` holds gradients, hover lifts, the Services mega-menu and scroll-reveal (`components/ui/RevealOnScroll.js`, only hides below-the-fold elements after mount). `prefers-reduced-motion` disables animations.

## Structure

- `src/app/layout.js` - root layout (fonts, Redux provider; `suppressHydrationWarning` on html/body for browser-extension attributes such as `cz-shortcut-listen`)
- `src/app/(site)/` - route group sharing ONE Header + Footer + cart modal (`layout.js`). `login`/`register` live outside it (no header/footer).
- `src/app/sitemap.js` (includes every service slug), `robots.js`, `icon.svg`
- `src/styles/pages.scss` - styles for everything after the home page (`app/globals.scss` keeps tokens + home sections)
- `src/data/services.js` - mock catalogue (16 services, 4 categories, FAQs, reviews, areas, time slots). Replace with API data later.
- `src/lib/serviceFilters.js` - parse/serialise/filter logic. **The URL query is the source of truth** for /services: `?category=plumbing,electrician&search=pipe&location=Chattogram&price=0-500&rating=4&avail=today&sort=rating`. Only ticked categories show; nothing ticked (or Clear All) shows everything. Header dropdown, footer, home cards and hero search all link with these params.
- `src/components/layout` (Header, Footer), `home`, `services` (ServicesExplorer, FilterPanel, ServiceCard, ServiceGallery, ServiceTabs, BookingCard), `cart` (CartModal), `checkout`, `pages` (forms, coupon card), `ui` (Field, Accordion, Breadcrumbs, ServiceThumb, PlaceholderArt, ImagePlaceholder, ...)
- `src/store` - slices: auth, location, ui, services, cart, wishlist, checkout. `persist.js` + `StoreProvider` hydrate cart/wishlist/addresses from localStorage **after mount** (`hydrated` flag) so server markup never mismatches. Card and wallet numbers are never stored.
- `src/lib/api.js` - axios client. Endpoints: `POST /auth/otp/send|verify`, `/auth/2fa/verify`, `/auth/social/{provider}`, `/orders`, `/partners/apply`, `/contact`.

Auth verify endpoints return `{ token, user }`, or `{ requires_2fa: true, temp_token }` to trigger the 2FA step.

## Backend not built yet (simulated)

`/orders`, `/partners/apply` and `/contact` resolve as a **simulated success** when the API is unreachable (network error / 404 / 405) and the UI says so (`TODO(backend)` in `checkoutSlice.js` and `api.js`). No payment gateway is integrated; coupon codes on /offers are display only; "Start Live Chat" opens WhatsApp. Terms / Privacy / Refund / Career footer links point to `#` (pages do not exist yet).

## Photos (drop-in)

`ImagePlaceholder` shows an inline SVG illustration unless the file exists under `public/images/`, in which case it renders it with `next/image`.

| File | Used in | Status |
|---|---|---|
| `hero/hero-worker.png` | Home hero | provided |
| `hero/urgent-banner.jpg` | Urgent Help banner background | provided |
| `partner/partner-handshake.jpg` | Become a Partner hero | provided |
| `about/about-hero.png` | About hero | provided |
| `support/support-agent.png` | Contact "Need Immediate Help" | provided |
| `workers/plumbing.png`, `electrician.png`, `carpenter.png`, `cleaning.png` | Home service cards (~220x280 transparent PNG) | placeholder |
| `services/<slug>.jpg` (+ `<slug>-2.jpg` ... `-5.jpg`) | Service cards, cart, details gallery (jpg/png/webp) | placeholder |
| `customers/customer-1.jpg`..`4`, `testimonial-1..3.jpg`, `partner-1..2.jpg` | Avatars | placeholder |
| `og.jpg` | OpenGraph / JSON-LD image (1200x630) | missing |

Payment logos and the app-store badges are CSS/SVG stand-ins; replace with official artwork.
