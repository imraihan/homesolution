import Link from 'next/link';
import { BsLightningChargeFill } from 'react-icons/bs';
import ImagePlaceholder from '../ui/ImagePlaceholder';

export default function UrgentHelp() {
  return (
    <aside className="hs-urgent" aria-labelledby="urgent-title">
      <ImagePlaceholder file="hero/urgent-banner.jpg" variant="rider" alt="Technician rushing to help with a stopwatch" width={1400} height={738} className="hs-urgent__img" />
      <div className="hs-urgent__copy">
        <h2 id="urgent-title">Need Urgent Help?</h2>
        <p>Get professional help within<br /><span>30 minutes</span> in selected areas.</p>
        <Link href="/services?avail=today" className="btn hs-btn hs-btn--orange"><BsLightningChargeFill aria-hidden="true" /> Book Emergency Service</Link>
      </div>
    </aside>
  );
}
