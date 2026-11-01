'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import Logo from '../ui/Logo';
import DemoRoleSwitcher from './DemoRoleSwitcher';
import { homeFor } from '@/lib/roles';
import { sendOtp, verifyOtp, verify2fa, socialLogin, setPhone, resetFlow } from '@/store/slices/authSlice';

const BD_PHONE = /^(?:\+?88)?01[3-9]\d{8}$/;

export default function AuthFlow({ mode = 'login' }) {
  const dispatch = useDispatch();
  const { step, phone, status, error, user } = useSelector((s) => s.auth);
  const [code, setCode] = useState('');
  const [localErr, setLocalErr] = useState('');
  const busy = status === 'loading';
  const isLogin = mode === 'login';

  useEffect(() => {
    dispatch(resetFlow());
  }, [dispatch]);

  const submitPhone = (e) => {
    e.preventDefault();
    const p = phone.replace(/[\s-]/g, '');
    if (!BD_PHONE.test(p)) return setLocalErr('Enter a valid Bangladeshi mobile number, e.g. 01812345678');
    setLocalErr('');
    dispatch(sendOtp({ phone: p }));
  };
  const submitOtp = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) return setLocalErr('Enter the 6-digit code');
    setLocalErr('');
    dispatch(verifyOtp({ phone: phone.replace(/[\s-]/g, ''), code }));
    setCode('');
  };
  const submit2fa = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(code)) return setLocalErr('Enter the 6-digit authenticator code');
    setLocalErr('');
    dispatch(verify2fa({ code }));
    setCode('');
  };

  const digits = (e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
  const shownError = localErr || error;

  return (
    <main className="hs-auth">
      <div className="hs-auth__card">
        <div className="hs-auth__logo"><Logo /></div>

        {step === 'phone' && (
          <>
            <h1>{isLogin ? 'Welcome back' : 'Create your account'}</h1>
            <p className="hs-auth__sub">{isLogin ? 'Log in with your mobile number.' : 'Sign up with your mobile number.'} We will send a one-time code.</p>
            <form onSubmit={submitPhone} noValidate>
              <label htmlFor="phone">Mobile number</label>
              <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01812-345678" value={phone} onChange={(e) => dispatch(setPhone(e.target.value))} />
              <button className="btn hs-btn hs-btn--primary w-100" disabled={busy}>{busy ? 'Sending...' : 'Send OTP'}</button>
            </form>
            <div className="hs-auth__or"><span>or continue with</span></div>
            <div className="hs-auth__social">
              <button type="button" disabled={busy} onClick={() => dispatch(socialLogin({ provider: 'google' }))}><BsGoogle color="#ea4335" aria-hidden="true" /> Google</button>
              <button type="button" disabled={busy} onClick={() => dispatch(socialLogin({ provider: 'facebook' }))}><BsFacebook color="#1877f2" aria-hidden="true" /> Facebook</button>
            </div>
          </>
        )}

        {step === 'otp' && (
          <>
            <h1>Verify your number</h1>
            <p className="hs-auth__sub">Enter the 6-digit code sent to <strong>{phone}</strong>.</p>
            <form onSubmit={submitOtp} noValidate>
              <label htmlFor="otp">One-time password</label>
              <input id="otp" className="hs-auth__code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="------" value={code} onChange={digits} />
              <button className="btn hs-btn hs-btn--primary w-100" disabled={busy}>{busy ? 'Verifying...' : 'Verify & Continue'}</button>
            </form>
            <button type="button" className="hs-auth__link" onClick={() => { setCode(''); dispatch(resetFlow()); }}>Use a different number</button>
          </>
        )}

        {step === '2fa' && (
          <>
            <h1>Two-factor authentication</h1>
            <p className="hs-auth__sub">Open your authenticator app and enter the 6-digit code for Home Solution.</p>
            <form onSubmit={submit2fa} noValidate>
              <label htmlFor="totp">Authenticator code</label>
              <input id="totp" className="hs-auth__code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="------" value={code} onChange={digits} />
              <button className="btn hs-btn hs-btn--primary w-100" disabled={busy}>{busy ? 'Verifying...' : 'Verify'}</button>
            </form>
          </>
        )}

        {step === 'done' && (
          <>
            <h1>You are signed in</h1>
            <p className="hs-auth__sub">{user?.name ? `Welcome, ${user.name}.` : 'Welcome to Home Solution.'}</p>
            <Link href={homeFor(user?.role)} className="btn hs-btn hs-btn--primary w-100">Go to my dashboard</Link>
            <Link href="/" className="hs-auth__link d-block text-center mt-3">Back to home</Link>
          </>
        )}

        {step === 'phone' && <DemoRoleSwitcher />}

        {shownError && <p className="hs-auth__err" role="alert">{shownError}</p>}

        {step !== 'done' && (
          <p className="hs-auth__foot">
            {isLogin ? <>New here? <Link href="/register">Create an account</Link></> : <>Already registered? <Link href="/login">Log in</Link></>}
          </p>
        )}
      </div>
    </main>
  );
}
