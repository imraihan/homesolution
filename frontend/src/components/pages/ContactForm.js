'use client';
import { useState } from 'react';
import { BsSend, BsCheckCircleFill } from 'react-icons/bs';
import Field from '../ui/Field';
import { submitOrSimulate, errorMessage } from '@/lib/api';
import { collect, email, minLen, phoneBD, required } from '@/lib/validators';

const SUBJECTS = ['Booking help', 'Payment issue', 'Service feedback', 'Partner enquiry', 'Other'];
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [simulated, setSimulated] = useState(false);
  const [serverError, setServerError] = useState('');
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = collect({
      name: () => minLen(v.name, 3, 'Full name'),
      email: () => email(v.email),
      phone: () => phoneBD(v.phone),
      subject: () => required(v.subject, 'Please select a subject'),
      message: () => minLen(v.message, 10, 'Message'),
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    setServerError('');
    try {
      const res = await submitOrSimulate('/contact', v);
      setSimulated(res.simulated);
      setStatus('done');
      setV(EMPTY);
    } catch (err) {
      setServerError(errorMessage(err));
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="hs-formcard hs-formcard--done" role="status">
        <BsCheckCircleFill size={52} color="#10b981" aria-hidden="true" />
        <h2>Message sent!</h2>
        <p>Thanks for reaching out. We reply within 24 hours.</p>
        {simulated && <p className="hs-note">Demo mode: the contact API is not connected yet, so nothing was actually sent.</p>}
        <button type="button" className="btn hs-btn hs-btn--outline" onClick={() => setStatus('idle')}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="hs-formcard" onSubmit={submit} noValidate aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">Send Us a Message</h2>
      <Field label="Full Name" placeholder="Full Name" hideLabel value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
      <Field label="Email Address" placeholder="Email Address" hideLabel type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
      <Field label="Phone Number" placeholder="Phone Number" hideLabel type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
      <Field label="Subject" as="select" placeholder="Select Subject" hideLabel options={SUBJECTS} value={v.subject} onChange={set('subject')} error={errors.subject} />
      <Field label="Your Message" as="textarea" placeholder="Your Message" hideLabel value={v.message} onChange={set('message')} error={errors.message} />
      {serverError && <p className="hs-error" role="alert">{serverError}</p>}
      <button type="submit" className="btn hs-btn hs-btn--primary hs-btn--block hs-btn--lg" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : <>Send Message <BsSend aria-hidden="true" /></>}
      </button>
    </form>
  );
}
