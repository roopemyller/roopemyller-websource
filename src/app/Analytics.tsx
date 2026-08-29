import { SpeedInsights } from '@vercel/speed-insights/react';
import { useConsent } from './consent';

// Vercel Speed Insights only mounts (and loads its script) once the visitor has
// accepted the analytics category in the cookie banner.
export default function Analytics() {
  const { consent } = useConsent();
  return consent.analytics ? <SpeedInsights /> : null;
}
