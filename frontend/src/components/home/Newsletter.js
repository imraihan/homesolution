'use client';
import { useState } from 'react';
import { BsEnvelopePaper, BsGooglePlay, BsApple } from 'react-icons/bs';
import Logo from '../ui/Logo';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // TODO: POST to Laravel newsletter endpoint when available.
    setDone(true);
    setEmail('');
  };

  return (
    <section className="hs-news" aria-label="Newsletter and mobile app">
      <div className="container hs-news__inner">
        <div className="hs-news__sub">
          <BsEnvelopePaper size={72} color="#fff" aria-hidden="true" className="hs-news__icon" />
          <div>
            <h2>Subscribe to get our latest offers and service updates</h2>
            <form onSubmit={submit} className="hs-news__form">
              <label htmlFor="nl-email" className="visually-hidden">Email address</label>
              <input id="nl-email" type="email" required placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="btn hs-btn hs-btn--primary">Subscribe</button>
            </form>
            {done && <p className="hs-news__ok" role="status">Thanks for subscribing!</p>}
          </div>
        </div>

        <div className="hs-news__app">
          <h2 className="hs-news__apptitle">Download Our App</h2>
          <div className="hs-news__stores">
            <a href="#" className="hs-store" aria-label="Get it on Google Play"><BsGooglePlay size={22} aria-hidden="true" /><span><small>Get it on</small>Google Play</span></a>
            <a href="#" className="hs-store" aria-label="Download on the App Store"><BsApple size={24} aria-hidden="true" /><span><small>Download on the</small>App Store</span></a>
          </div>
          <div className="hs-phone" aria-hidden="true"><div className="hs-phone__screen"><Logo light /></div></div>
        </div>
      </div>
    </section>
  );
}
