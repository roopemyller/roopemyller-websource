import Hero from '../hero/Hero';
import About from '../about/About';
import Results from './Results';
import Videos from './Videos';
import Gallery from '../../components/Gallery/Gallery';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import shootingPhotos from './shooting-photos';
import styles from './ShootingGallery.module.css';

export default function ShootingMode() {
  return (
    <>
      <Hero />
      <About />
      <Results />
      <Videos />
      <section className={styles.gallerySection} id="gallery" aria-labelledby="shooting-gallery-heading">
        <SectionReveal>
          <h2 id="shooting-gallery-heading" tabIndex={0}>
            Gallery
          </h2>
        </SectionReveal>
        <Gallery photos={shootingPhotos} />
      </section>
    </>
  );
}
