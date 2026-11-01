import { createSlice } from '@reduxjs/toolkit';
import { USER_PROFILE, USER_BOOKINGS, USER_ADDRESSES, USER_NOTIFICATIONS, USER_TICKETS } from '@/data/userPanel';
import {
  ADMIN_BOOKINGS, ADMIN_USERS, ADMIN_PROVIDERS, ADMIN_SERVICES, ADMIN_CATEGORIES, ADMIN_AREAS, ADMIN_PAYMENTS, ADMIN_COUPONS, ADMIN_REVIEWS, ADMIN_TICKETS, DEFAULT_SETTINGS,
} from '@/data/adminPanel';
import { PROVIDER_PROFILE, PROVIDER_REQUESTS, PROVIDER_JOBS, AVAILABILITY, PAYOUT_INFO, PAYOUT_HISTORY, JOB_FLOW } from '@/data/providerPanel';

// All three role panels keep their mock data here so list pages can do real client-side CRUD.
// TODO(backend): replace the seeded arrays with API calls (createAsyncThunk) once Laravel exists.
const initialState = {
  toast: null,
  user: {
    profile: USER_PROFILE,
    bookings: USER_BOOKINGS,
    addresses: USER_ADDRESSES,
    notifications: USER_NOTIFICATIONS,
    tickets: USER_TICKETS,
    twofa: { enabled: false, stage: 'idle' }, // stage: idle | setup
    linked: { google: true, facebook: false },
  },
  admin: {
    bookings: ADMIN_BOOKINGS,
    users: ADMIN_USERS,
    providers: ADMIN_PROVIDERS,
    services: ADMIN_SERVICES,
    categories: ADMIN_CATEGORIES,
    areas: ADMIN_AREAS,
    payments: ADMIN_PAYMENTS,
    coupons: ADMIN_COUPONS,
    reviews: ADMIN_REVIEWS,
    tickets: ADMIN_TICKETS,
    settings: DEFAULT_SETTINGS,
  },
  provider: {
    profile: PROVIDER_PROFILE,
    requests: PROVIDER_REQUESTS,
    jobs: PROVIDER_JOBS,
    availability: AVAILABILITY,
    payout: { balance: PAYOUT_INFO.balance, history: PAYOUT_HISTORY },
  },
};

const uid = (p) => `${p}${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;

const slice = createSlice({
  name: 'panel',
  initialState,
  reducers: {
    showToast: (s, a) => {
      s.toast = { id: Date.now(), text: a.payload };
    },
    clearToast: (s) => {
      s.toast = null;
    },

    // ---- user
    userBookingStatus: (s, a) => {
      const b = s.user.bookings.find((x) => x.id === a.payload.id);
      if (b) b.status = a.payload.status;
    },
    userBookingReschedule: (s, a) => {
      const b = s.user.bookings.find((x) => x.id === a.payload.id);
      if (b) Object.assign(b, { date: a.payload.date, time: a.payload.time });
    },
    userBookingReviewed: (s, a) => {
      const b = s.user.bookings.find((x) => x.id === a.payload);
      if (b) b.reviewed = true;
    },
    saveAddress: (s, a) => {
      const addr = a.payload;
      if (addr.isDefault) s.user.addresses.forEach((x) => { x.isDefault = false; });
      const i = s.user.addresses.findIndex((x) => x.id === addr.id);
      if (i >= 0) s.user.addresses[i] = addr;
      else s.user.addresses.push({ ...addr, id: uid('a') });
      if (!s.user.addresses.some((x) => x.isDefault) && s.user.addresses[0]) s.user.addresses[0].isDefault = true;
    },
    removeAddress: (s, a) => {
      s.user.addresses = s.user.addresses.filter((x) => x.id !== a.payload);
      if (!s.user.addresses.some((x) => x.isDefault) && s.user.addresses[0]) s.user.addresses[0].isDefault = true;
    },
    markNotification: (s, a) => {
      const n = s.user.notifications.find((x) => x.id === a.payload);
      if (n) n.read = true;
    },
    markAllNotifications: (s) => {
      s.user.notifications.forEach((n) => { n.read = true; });
    },
    removeNotification: (s, a) => {
      s.user.notifications = s.user.notifications.filter((x) => x.id !== a.payload);
    },
    addUserTicket: (s, a) => {
      s.user.tickets.unshift({ id: `TKT-${320 + s.user.tickets.length}`, date: '2026-11-01', status: 'Open', ...a.payload });
    },
    saveUserProfile: (s, a) => {
      Object.assign(s.user.profile, a.payload);
    },
    setTwofa: (s, a) => {
      Object.assign(s.user.twofa, a.payload);
    },
    toggleLinked: (s, a) => {
      s.user.linked[a.payload] = !s.user.linked[a.payload];
    },

    // ---- admin (generic collections)
    adminAdd: (s, a) => {
      const { key, item, prefix = 'X-' } = a.payload;
      s.admin[key].unshift({ ...item, id: item.id || uid(prefix) });
    },
    adminUpdate: (s, a) => {
      const { key, id, patch } = a.payload;
      const it = s.admin[key].find((x) => x.id === id);
      if (it) Object.assign(it, patch);
    },
    adminRemove: (s, a) => {
      s.admin[a.payload.key] = s.admin[a.payload.key].filter((x) => x.id !== a.payload.id);
    },
    adminSettings: (s, a) => {
      Object.assign(s.admin.settings, a.payload);
    },

    // ---- provider
    respondRequest: (s, a) => {
      const { id, status } = a.payload;
      const r = s.provider.requests.find((x) => x.id === id);
      if (!r || r.status !== 'Pending') return;
      r.status = status;
      if (status === 'Accepted') {
        s.provider.jobs.unshift({ id: `JOB-${r.id.slice(4)}`, service: r.service, customer: r.customer, area: r.area.split(',')[0], date: r.date, time: r.time, amount: r.amount, status: 'Accepted' });
      }
    },
    advanceJob: (s, a) => {
      const j = s.provider.jobs.find((x) => x.id === a.payload);
      if (!j) return;
      const i = JOB_FLOW.indexOf(j.status);
      if (i >= 0 && i < JOB_FLOW.length - 1) j.status = JOB_FLOW[i + 1];
    },
    toggleDay: (s, a) => {
      const d = s.provider.availability.find((x) => x.day === a.payload);
      if (d) d.enabled = !d.enabled;
    },
    toggleSlot: (s, a) => {
      const d = s.provider.availability.find((x) => x.day === a.payload.day);
      const sl = d?.slots.find((x) => x.time === a.payload.time);
      if (sl) sl.on = !sl.on;
    },
    saveProviderProfile: (s, a) => {
      Object.assign(s.provider.profile, a.payload);
    },
    requestPayout: (s, a) => {
      const amount = Number(a.payload.amount);
      if (!amount || amount > s.provider.payout.balance) return;
      s.provider.payout.balance -= amount;
      s.provider.payout.history.unshift({ id: `PO-${130 + s.provider.payout.history.length}`, date: '2026-11-01', amount, method: a.payload.method, status: 'Processing' });
    },
  },
});

export const {
  showToast, clearToast, userBookingStatus, userBookingReschedule, userBookingReviewed, saveAddress, removeAddress, markNotification, markAllNotifications, removeNotification,
  addUserTicket, saveUserProfile, setTwofa, toggleLinked, adminAdd, adminUpdate, adminRemove, adminSettings, respondRequest, advanceJob, toggleDay, toggleSlot, saveProviderProfile, requestPayout,
} = slice.actions;
export default slice.reducer;
