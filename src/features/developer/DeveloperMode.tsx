import Hero from '../hero/Hero';
import About from '../about/About';
import Career from './Career';
import Academics from './Academics';
import Projects from './Projects';
import Stats from './Stats';

export default function DeveloperMode() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Career />
      <Academics />
      <Projects />
    </>
  );
}
