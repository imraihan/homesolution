import { SITE_URL } from '@/lib/site';
import { SERVICES } from '@/data/services';

export default function sitemap() {
  const now = new Date();
  const page = (path, changeFrequency, priority) => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page('/', 'weekly', 1),
    page('/services', 'weekly', 0.9),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 'weekly', 0.8)),
    page('/offers', 'weekly', 0.7),
    page('/become-a-partner', 'monthly', 0.7),
    page('/about', 'monthly', 0.6),
    page('/contact', 'monthly', 0.6),
    page('/login', 'yearly', 0.3),
    page('/register', 'yearly', 0.3),
  ];
}
