
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/700.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/700.css'
import "./index.css"
import App from './App.tsx'

// Parallax background scroll effect

window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('has-parallax-bg');
  const updateParallax = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    // Move background at 20% of scroll speed for a more pronounced effect
    const y = Math.round(scrollY * 0.2);
    document.body.style.setProperty('--parallax-bg-pos', `0 ${y}px, 0 0, 0 0`);
  };
  window.addEventListener('scroll', updateParallax);
  updateParallax();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <SpeedInsights />
  </StrictMode>,
)
