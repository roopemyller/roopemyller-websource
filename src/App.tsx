
import './App.css';
import Hero from './features/hero/Hero';
import About from './features/about/About';
import Projects from './features/projects/Projects';
import Photography from './features/photography/Photography';
import Contact from './features/contact/Contact';

export default function App() {
  return (
    <div className="app-container">
      <Hero />
      <About />
      <Projects />
      <Photography />
      <Contact />
    </div>
  );
}
