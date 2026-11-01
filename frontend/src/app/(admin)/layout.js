import PanelShell from '@/components/panel/PanelShell';
import '@/styles/panel.scss';

// Private panel: never indexed (also disallowed in robots.js). Auth guard lives in PanelShell.
export const metadata = {
  title: { default: 'Admin Panel', template: '%s | Admin Panel' },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPanelLayout({ children }) {
  return <PanelShell role="admin">{children}</PanelShell>;
}
