import './App.css';
import { ModeProvider, useMode } from './app/ModeContext';
import Curtain from './app/Curtain';
import Navigation from './features/navigation/Navigation';
import DeveloperMode from './features/developer/DeveloperMode';
import PhotographyMode from './features/photography/PhotographyMode';
import ShootingMode from './features/shooting/ShootingMode';
import Contact from './features/contact/Contact';

function ModeContent() {
  const { mode } = useMode();

  if (mode === 'photography') return <PhotographyMode />;
  if (mode === 'shooting') return <ShootingMode />;
  return <DeveloperMode />;
}

export default function App() {
  return (
    <ModeProvider>
      <Curtain />
      <Navigation />
      <div className="app-container">
        <ModeContent />
        <Contact />
      </div>
    </ModeProvider>
  );
}
