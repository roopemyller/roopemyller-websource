
import './App.css';
import Navigation from './features/navigation/Navigation';
import Hero from './features/hero/Hero';
import About from './features/about/About';
import Projects from './features/projects/Projects';
// import Photography from './features/photography/Photography';
import Contact from './features/contact/Contact';

export default function App() {
  return (
    <>
      <Navigation />
      <div className="app-container">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        {/*}
        <section id="photography">
          <Photography />
        </section>
        */}
        <section id="contact">
          <Contact />
        </section>
      </div>
    </>
  );
}
