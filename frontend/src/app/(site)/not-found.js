import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container hs-page">
      <div className="hs-empty">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has moved.</p>
        <Link href="/services" className="btn hs-btn hs-btn--primary">Browse Services</Link>
      </div>
    </div>
  );
}
