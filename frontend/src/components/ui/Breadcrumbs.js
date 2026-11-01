import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import { SITE_URL } from '@/lib/site';

/** items: [{ label, href? }]. The last item is the current page. Emits BreadcrumbList JSON-LD. */
export default function Breadcrumbs({ items }) {
  const all = [{ label: 'Home', href: '/' }, ...items];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${SITE_URL}${it.href}` } : {}),
    })),
  };
  return (
    <nav className="hs-crumbs" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <ol>
        {all.map((it, i) => {
          const last = i === all.length - 1;
          return (
            <li key={it.label}>
              {last || !it.href ? <span aria-current={last ? 'page' : undefined}>{it.label}</span> : <Link href={it.href}>{it.label}</Link>}
              {!last && <BsChevronRight size={10} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
