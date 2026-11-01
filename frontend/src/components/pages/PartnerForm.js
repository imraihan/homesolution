'use client';
import { useState } from 'react';
import { BsPerson, BsTelephone, BsEnvelope, BsGeoAlt, BsTools, BsCalendar3, BsArrowRight, BsCheckCircleFill } from 'react-icons/bs';
import Field from '../ui/Field';
import { CATEGORIES, AREAS } from '@/data/services';
import { submitOrSimulate, errorMessage } from '@/lib/api';
import { collect, email, minLen, phoneBD, required } from '@/lib/validators';

const SERVICE_OPTIONS = [...CATEGORIES.map((c) => ({ value: c.slug, label: c.name })), { value: 'other', label: 'Other' }];
const EXPERIENCE = [
  { value: '0-1', label: 'Less than 1 year' },
  { value: '1-3', label: '1 - 3 years' },
  { value: '3-5', label: '3 - 5 years' },
  { value: '5-10', label: '5 - 10 years' },
  { value: '10+', label: 'More than 10 years' },
];
const EMPTY = { name: '', phone: '', email: '', service: '', experience: '', area: '' };

export default function PartnerForm() {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [simulated, setSimulated] = useState(false);
  const [serverError, setServerError] = useState('');
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = collect({
      name: () => minLen(v.name, 3, 'Full name'),
      phone: () => phoneBD(v.phone),
      email: () => email(v.email),
      service: () => required(v.service, 'Please select a service'),
      experience: () => required(v.experience, 'Please select your experience'),
      area: () => required(v.area, 'Please select your area'),
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('sending');
    setServerError('');
    try {
      const res = await submitOrSimulate('/partners/apply', v);
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
      <div className="hs-formcard hs-formcard--done" id="apply" role="status">
        <BsCheckCircleFill size={52} color="#10b981" aria-hidden="true" />
        <h2>Application received!</h2>
        <p>Thank you for your interest. Our team will review your details and call you within 2 working days.</p>
        {simulated && <p className="hs-note">Demo mode: the partner API is not connected yet, so nothing was actually sent.</p>}
        <button type="button" className="btn hs-btn hs-btn--outline" onClick={() => setStatus('idle')}>Submit another application</button>
      </div>
    );
  }

  return (
    <form className="hs-formcard" id="apply" onSubmit={submit} noValidate aria-labelledby="apply-title">
      <h2 id="apply-title">Join as a Partner</h2>
      <p className="hs-formcard__sub">Fill out the form and our team will get in touch with you.</p>
      <Field label="Full Name" placeholder="Full Name" hideLabel icon={<BsPerson />} value={v.name} onChange={set('name')} error={errors.name} autoComplete="name" />
      <Field label="Phone Number" placeholder="Phone Number" hideLabel icon={<BsTelephone />} type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" />
      <Field label="Email Address" placeholder="Email Address" hideLabel icon={<BsEnvelope />} type="email" value={v.email} onChange={set('email')} error={errors.email} autoComplete="email" />
      <Field label="Select Service" as="select" placeholder="Select Service" hideLabel icon={<BsTools />} options={SERVICE_OPTIONS} value={v.service} onChange={set('service')} error={errors.service} />
      <Field label="Experience (Years)" as="select" placeholder="Experience (Years)" hideLabel icon={<BsCalendar3 />} options={EXPERIENCE} value={v.experience} onChange={set('experience')} error={errors.experience} />
      <Field label="Your Area / Location" as="select" placeholder="Your Area / Location" hideLabel icon={<BsGeoAlt />} options={AREAS.map((a) => `${a}, Chattogram`)} value={v.area} onChange={set('area')} error={errors.area} />
      {serverError && <p className="hs-error" role="alert">{serverError}</p>}
      <button type="submit" className="btn hs-btn hs-btn--primary hs-btn--block hs-btn--lg" disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting...' : <>Submit Application <BsArrowRight aria-hidden="true" /></>}
      </button>
    </form>
  );
}
