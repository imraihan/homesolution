'use client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { BsPerson, BsTools, BsShieldLock } from 'react-icons/bs';
import { demoLogin } from '@/store/slices/authSlice';
import { DEMO_MODE, homeFor } from '@/lib/roles';

// TODO(backend): DEV-ONLY. Lets you enter each role panel without the Laravel API.
// To remove: delete this file, its <DemoRoleSwitcher /> in AuthFlow.js, DEMO_MODE in lib/roles.js, demoLogin in authSlice.js and NEXT_PUBLIC_DEMO_MODE in .env.local.
const DEMO_USERS = [
  { role: 'user', name: 'Rasel Ahmed', phone: '01812345678', label: 'User Dashboard', Icon: BsPerson },
  { role: 'provider', name: 'John Doe', phone: '01711000001', label: 'Provider Panel', Icon: BsTools },
  { role: 'admin', name: 'Admin Hasan', phone: '01911000000', label: 'Admin Panel', Icon: BsShieldLock },
];

export default function DemoRoleSwitcher() {
  const dispatch = useDispatch();
  const router = useRouter();
  if (!DEMO_MODE) return null;
  const enter = ({ role, name, phone }) => {
    dispatch(demoLogin({ role, name, phone, demo: true }));
    router.push(homeFor(role));
  };
  return (
    <div className="hs-demo" role="group" aria-label="Demo panels (development only)">
      <p><b>DEMO MODE</b> - enter a panel without a backend</p>
      <div className="hs-demo__row">
        {DEMO_USERS.map((u) => (
          <button key={u.role} type="button" onClick={() => enter(u)}>
            <u.Icon aria-hidden="true" />
            <span>{u.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
