import './App.css';
import { lazy, Suspense } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ModeProvider, useMode } from './app/ModeContext';
import Curtain from './app/Curtain';
import Navigation from './features/navigation/Navigation';
import DeveloperMode from './features/developer/DeveloperMode';
import Contact from './features/contact/Contact';

// Developer is the default mode and renders on first paint; the other two are
// split out so their Gallery/Lightbox/icon payload isn't in the initial bundle.
// The curtain covers the swap, so a null fallback is invisible.
const PhotographyMode = lazy(() => import('./features/photography/PhotographyMode'));
const ShootingMode = lazy(() => import('./features/shooting/ShootingMode'));

function ModeContent() {
  const { mode } = useMode();

  if (mode === 'photography') return <PhotographyMode />;
  if (mode === 'shooting') return <ShootingMode />;
  return <DeveloperMode />;
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <ModeProvider>
        <Curtain />
        <Navigation />
        <div className="app-container">
          <Suspense fallback={null}>
            <ModeContent />
          </Suspense>
          <Contact />
          <footer className="site-footer">
            <span>© {new Date().getFullYear()} Roope Myller</span>
            <a href="/privacy.html">Privacy</a>
          </footer>
        </div>
      </ModeProvider>
    </LazyMotion>
  );
}
