'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsGoogle, BsFacebook, BsShieldCheck, BsShieldExclamation } from 'react-icons/bs';
import { PageHeader, Card, FormField, ConfirmModal, StatusBadge } from '../ui';
import { saveUserProfile, setTwofa, toggleLinked, showToast } from '@/store/slices/panelSlice';

// TODO(backend): real TOTP secret + QR from POST /auth/2fa/setup. This is a deterministic decorative placeholder, NOT a scannable code.
function QrPlaceholder({ size = 168 }) {
  const n = 25;
  let seed = 7;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const cells = [];
  const finder = (x, y) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && rnd() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  const eye = (x, y) => (
    <g key={`e${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" />
    </g>
  );
  return (
    <svg className="pn-qr" width={size} height={size} viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label="Authenticator QR code placeholder" shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={n + 2} height={n + 2} fill="#fff" />
      <g fill="#111827">{cells}{eye(0, 0)}{eye(n - 7, 0)}{eye(0, n - 7)}</g>
    </svg>
  );
}

export default function UserProfile() {
  const dispatch = useDispatch();
  const { profile, twofa, linked } = useSelector((s) => s.panel.user);
  const [p, setP] = useState(profile);
  const [pErr, setPErr] = useState({});
  const [ph, setPh] = useState({ stage: 'idle', value: '', code: '', err: '' });
  const [code, setCode] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [off, setOff] = useState(false);

  const saveProfile = (e) => {
    e.preventDefault();
    const errs = {};
    if (p.name.trim().length < 2) errs.name = 'Enter your full name';
    if (p.email && !/^\S+@\S+\.\S+$/.test(p.email)) errs.email = 'Enter a valid email';
    setPErr(errs);
    if (Object.keys(errs).length) return;
    dispatch(saveUserProfile({ name: p.name.trim(), email: p.email, gender: p.gender, dob: p.dob, city: p.city }));
    dispatch(showToast('Profile saved'));
  };

  const sendPhone = (e) => {
    e.preventDefault();
    if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(ph.value.replace(/[\s-]/g, ''))) return setPh({ ...ph, err: 'Enter a valid Bangladeshi mobile number' });
    setPh({ ...ph, stage: 'code', err: '' }); // TODO(backend): POST /auth/otp/send
  };
  const verifyPhone = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(ph.code)) return setPh({ ...ph, err: 'Enter the 6-digit code' });
    dispatch(saveUserProfile({ phone: ph.value.replace(/[\s-]/g, '') })); // TODO(backend): POST /auth/otp/verify
    dispatch(showToast('Phone number updated'));
    setPh({ stage: 'idle', value: '', code: '', err: '' });
  };

  const verify2fa = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) return setCodeErr('Enter the 6-digit code from your app');
    setCodeErr('');
    setCode('');
    dispatch(setTwofa({ enabled: true, stage: 'idle' })); // TODO(backend): POST /auth/2fa/enable
    dispatch(showToast('Two-factor authentication enabled'));
  };

  return (
    <>
      <PageHeader title="Profile Settings" subtitle="Manage your personal details and account security." />

      <div className="pn-grid pn-grid--2 pn-grid--top">
        <Card title="Personal information">
          <form className="pn-form" onSubmit={saveProfile} noValidate>
            <FormField label="Full name" value={p.name} error={pErr.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
            <FormField label="Email" type="email" value={p.email} error={pErr.email} onChange={(e) => setP({ ...p, email: e.target.value })} />
            <FormField label="Gender" type="select" options={['Male', 'Female', 'Other']} value={p.gender} onChange={(e) => setP({ ...p, gender: e.target.value })} />
            <FormField label="Date of birth" type="date" value={p.dob} onChange={(e) => setP({ ...p, dob: e.target.value })} />
            <FormField className="pn-field--full" label="City" value={p.city} onChange={(e) => setP({ ...p, city: e.target.value })} />
            <div className="pn-field--full"><button className="pn-btn pn-btn--primary">Save changes</button></div>
          </form>
        </Card>

        <Card title="Phone number">
          <p className="pn-muted">Your login number: <strong>{profile.phone}</strong></p>
          {ph.stage === 'idle' && (
            <button type="button" className="pn-btn pn-btn--ghost" onClick={() => setPh({ ...ph, stage: 'enter' })}>Change phone number</button>
          )}
          {ph.stage === 'enter' && (
            <form className="pn-form pn-form--1" onSubmit={sendPhone} noValidate>
              <FormField label="New mobile number" type="tel" value={ph.value} error={ph.err} placeholder="01812345678" onChange={(e) => setPh({ ...ph, value: e.target.value, err: '' })} />
              <div className="pn-row"><button className="pn-btn pn-btn--primary">Send code</button><button type="button" className="pn-btn pn-btn--ghost" onClick={() => setPh({ stage: 'idle', value: '', code: '', err: '' })}>Cancel</button></div>
            </form>
          )}
          {ph.stage === 'code' && (
            <form className="pn-form pn-form--1" onSubmit={verifyPhone} noValidate>
              <FormField label={`Code sent to ${ph.value}`} inputMode="numeric" maxLength={6} value={ph.code} error={ph.err} placeholder="6-digit code" onChange={(e) => setPh({ ...ph, code: e.target.value.replace(/\D/g, ''), err: '' })} />
              <div className="pn-row"><button className="pn-btn pn-btn--primary">Verify and update</button><button type="button" className="pn-btn pn-btn--ghost" onClick={() => setPh({ stage: 'idle', value: '', code: '', err: '' })}>Cancel</button></div>
            </form>
          )}
        </Card>
      </div>

      <div className="pn-grid pn-grid--2 pn-grid--top">
        <Card title="Two-factor authentication" action={<StatusBadge status={twofa.enabled ? 'Enabled' : 'Inactive'} />}>
          {twofa.enabled ? (
            <div className="pn-2fa">
              <BsShieldCheck size={30} color="#10b981" aria-hidden="true" />
              <p>Your account is protected with an authenticator app. You will be asked for a 6-digit code when you log in.</p>
              <button type="button" className="pn-btn pn-btn--danger-ghost" onClick={() => setOff(true)}>Disable 2FA</button>
            </div>
          ) : twofa.stage === 'setup' ? (
            <div className="pn-2fa pn-2fa--setup">
              <ol className="pn-steps">
                <li>Install an authenticator app (Google Authenticator, Authy).</li>
                <li>Scan the QR code, or enter the setup key manually.</li>
                <li>Type the 6-digit code to finish.</li>
              </ol>
              <div className="pn-2fa__qr">
                <QrPlaceholder />
                <div>
                  <small>Setup key (placeholder)</small>
                  <code>HSOL XXXX 2FA7 DEMO</code>
                  <small className="pn-muted">Demo only. A real QR arrives with the backend.</small>
                </div>
              </div>
              <form className="pn-form pn-form--1" onSubmit={verify2fa} noValidate>
                <FormField label="Authentication code" inputMode="numeric" maxLength={6} value={code} error={codeErr} placeholder="------" onChange={(e) => { setCode(e.target.value.replace(/\D/g, '')); setCodeErr(''); }} />
                <div className="pn-row"><button className="pn-btn pn-btn--primary">Verify and enable</button><button type="button" className="pn-btn pn-btn--ghost" onClick={() => dispatch(setTwofa({ stage: 'idle' }))}>Cancel</button></div>
              </form>
            </div>
          ) : (
            <div className="pn-2fa">
              <BsShieldExclamation size={30} color="#f97316" aria-hidden="true" />
              <p>Add an extra layer of security. After the OTP you will also enter a code from your authenticator app.</p>
              <button type="button" className="pn-btn pn-btn--primary" onClick={() => dispatch(setTwofa({ stage: 'setup' }))}>Enable 2FA</button>
            </div>
          )}
        </Card>

        <Card title="Linked accounts">
          <ul className="pn-linked">
            {[
              { key: 'google', name: 'Google', Icon: BsGoogle, color: '#ea4335' },
              { key: 'facebook', name: 'Facebook', Icon: BsFacebook, color: '#1877f2' },
            ].map(({ key, name, Icon, color }) => (
              <li key={key}>
                <span className="pn-linked__icon"><Icon color={color} size={20} aria-hidden="true" /></span>
                <div><strong>{name}</strong><small>{linked[key] ? 'Connected' : 'Not connected'}</small></div>
                <button type="button" className={`pn-btn pn-btn--sm ${linked[key] ? 'pn-btn--danger-ghost' : 'pn-btn--primary'}`} onClick={() => { dispatch(toggleLinked(key)); dispatch(showToast(`${name} ${linked[key] ? 'disconnected' : 'connected'}`)); }}>
                  {linked[key] ? 'Disconnect' : 'Connect'}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <ConfirmModal open={off} danger title="Disable two-factor authentication?" text="Your account will be less secure." confirmLabel="Disable" onClose={() => setOff(false)} onConfirm={() => { dispatch(setTwofa({ enabled: false, stage: 'idle' })); dispatch(showToast('2FA disabled')); }} />
    </>
  );
}
