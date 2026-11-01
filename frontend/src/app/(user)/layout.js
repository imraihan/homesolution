import PanelShell from '@/components/panel/PanelShell';
import '@/styles/panel.scss';

// Private panel: never indexed (also disallowed in robots.js). Auth guard lives in PanelShell.
export const metadata = {
  title: { default: 'User Dashboard', template: '%s | User Dashboard' },
  robots: { index: false, follow: false, nocache: true },
};

export default function UserPanelLayout({ children }) {
  return <PanelShell role="user">{children}</PanelShell>;
}
