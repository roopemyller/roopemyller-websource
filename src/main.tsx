
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
  </StrictMode>,
)
