'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPatchCheckFill } from 'react-icons/bs';
import { PageHeader, Card, FormField, Avatar } from '../ui';
import { saveProviderProfile, showToast } from '@/store/slices/panelSlice';
import { AREAS } from '@/data/services';

export default function ProviderProfile() {
  const dispatch = useDispatch();
  const profile = useSelector((s) => s.panel.provider.profile);
  const [f, setF] = useState(profile);
  const [err, setErr] = useState({});

  const save = (e) => {
    e.preventDefault();
    const errs = {};
    if (f.name.trim().length < 2) errs.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) errs.email = 'Enter a valid email';
    if (f.bio.trim().length < 20) errs.bio = 'Write at least 20 characters about yourself';
    setErr(errs);
    if (Object.keys(errs).length) return;
    dispatch(saveProviderProfile({ ...f, name: f.name.trim() }));
    dispatch(showToast('Profile saved')); // TODO(backend): PUT /partners/me
  };

  return (
    <>
      <PageHeader title="My Profile" subtitle="This is what customers see when you are assigned." />
      <div className="pn-grid pn-grid--profile">
        <Card>
          <div className="pn-idcard">
            <Avatar name={profile.name} size={84} />
            <h2>{profile.name} {profile.verified && <BsPatchCheckFill color="#2563eb" title="Verified" aria-label="Verified" />}</h2>
            <p>{profile.skill} - {profile.area}</p>
            <ul>
              <li><b>{profile.rating}</b><small>Rating</small></li>
              <li><b>{profile.jobsDone}</b><small>Jobs</small></li>
              <li><b>{profile.experience}y</b><small>Experience</small></li>
            </ul>
          </div>
        </Card>
        <Card title="Edit profile">
          <form className="pn-form" onSubmit={save} noValidate>
            <FormField label="Full name" value={f.name} error={err.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <FormField label="Skill" type="select" options={['Electrician', 'Plumbing', 'Carpenter', 'Cleaning']} value={f.skill} onChange={(e) => setF({ ...f, skill: e.target.value })} />
            <FormField label="Phone" type="tel" value={f.phone} disabled hint="Contact support to change your number" onChange={() => {}} />
            <FormField label="Email" type="email" value={f.email} error={err.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            <FormField label="Main area" type="select" options={AREAS} value={f.area} onChange={(e) => setF({ ...f, area: e.target.value })} />
            <FormField label="Years of experience" type="number" min={0} value={f.experience} onChange={(e) => setF({ ...f, experience: e.target.value })} />
            <FormField className="pn-field--full" label="About you" type="textarea" rows={4} value={f.bio} error={err.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} />
            <div className="pn-field--full"><button className="pn-btn pn-btn--primary">Save profile</button></div>
          </form>
        </Card>
      </div>
    </>
  );
}
