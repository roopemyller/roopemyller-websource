import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
// Latin-only subsets — the site is English/Finnish, so the cyrillic/greek/
// vietnamese faces the bare `<weight>.css` entrypoints pull in are dead weight
// (they were ~57% of the CSS bundle and ~60 unused font files).
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-700.css'
import '@fontsource/playfair-display/latin-500.css'
import '@fontsource/playfair-display/latin-700.css'
import '@fontsource/barlow-condensed/latin-500.css'
import '@fontsource/barlow-condensed/latin-700.css'
import './index.css'
import App from './App.tsx'

// Scroll-parallax for the ambient background (body::before). The listener is
// passive and coalesced into a single rAF per frame so a fast scroll can't
// queue redundant style writes / repaints.
window.addEventListener('DOMContentLoaded', () => {
  let ticking = false;

  const render = () => {
    ticking = false;
    const y = Math.round((window.scrollY || 0) * 0.2);
    document.body.style.setProperty('--parallax-bg-pos', `0 ${y}px, 0 0, 0 0`);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(render);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  render();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>,
)
