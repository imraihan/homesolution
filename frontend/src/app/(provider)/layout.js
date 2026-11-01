import PanelShell from '@/components/panel/PanelShell';
import '@/styles/panel.scss';

// Private panel: never indexed (also disallowed in robots.js). Auth guard lives in PanelShell.
export const metadata = {
  title: { default: 'Provider Panel', template: '%s | Provider Panel' },
  robots: { index: false, follow: false, nocache: true },
};

export default function ProviderPanelLayout({ children }) {
  return <PanelShell role="provider">{children}</PanelShell>;
}
