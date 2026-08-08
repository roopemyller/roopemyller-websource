import { FaExternalLinkAlt, FaInstagram } from 'react-icons/fa';
import Hero from '../hero/Hero';
import About from '../about/About';
import Gallery from '../../components/Gallery/Gallery';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import photos from './photos';
import styles from './Photography.module.css';

export default function PhotographyMode() {
  return (
    <>
      <Hero />
      <About />
      <section className={styles.instagramSection} id="instagram" aria-labelledby="instagram-heading">
        <SectionReveal className={styles.instagramCard}>
          <FaInstagram className={styles.instagramIcon} aria-hidden="true" />
          <h2 id="instagram-heading" tabIndex={0}>
            @myllervisuals
          </h2>
          <p>More behind-the-scenes shots and reels live on Instagram.</p>
          <a
            className={styles.instagramLink}
            href="https://www.instagram.com/myllervisuals/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram aria-hidden="true" />
            Follow on Instagram
          </a>
        </SectionReveal>
      </section>
      <section className={styles.gallerySection} id="gallery" aria-labelledby="gallery-heading">
        <SectionReveal>
          <h2 id="gallery-heading" tabIndex={0}>
            Gallery
          </h2>
          <div className={styles.portfolioLinkWrap}>
            <a
              className={styles.portfolioLink}
              href="https://roopemyller.pixieset.com/portfolioroopemyller/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt aria-hidden="true" />
              Full portfolio on Pixieset
            </a>
          </div>
        </SectionReveal>
        <Gallery photos={photos} />
      </section>
    </>
  );
}
