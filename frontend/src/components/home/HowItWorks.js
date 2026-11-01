import { BsClipboardCheck, BsCalendar3, BsHouseCheck, BsPersonCheck } from 'react-icons/bs';

const STEPS = [
  { n: '01', icon: BsClipboardCheck, color: '#2563eb', title: 'Choose Service', text: 'Select the service you need' },
  { n: '02', icon: BsCalendar3, color: '#f97316', title: 'Pick Date & Time', text: 'Choose your preferred date and time' },
  { n: '03', icon: BsHouseCheck, color: '#10b981', title: 'Confirm Booking', text: "We'll assign the best professional" },
  { n: '04', icon: BsPersonCheck, color: '#6f42c1', title: 'Relax & Enjoy', text: 'Professional arrives and gets the job done' },
];

export default function HowItWorks() {
  return (
    <div className="hs-how" role="region" aria-labelledby="how-title">
      <h2 id="how-title" className="hs-title">How It Works</h2>
      <ol className="hs-steps">
        {STEPS.map(({ n, icon: Icon, color, title, text }) => (
          <li key={n} className="hs-step">
            <span className="hs-step__circle" style={{ color, borderColor: `${color}22` }}><Icon size={30} aria-hidden="true" /></span>
            <span className="hs-step__n" style={{ color }}>{n}</span>
            <strong>{title}</strong>
            <small>{text}</small>
          </li>
        ))}
      </ol>
    </div>
  );
}
