import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import videos, { YOUTUBE_CHANNEL_URL } from './videos';
import styles from './Videos.module.css';

export default function Videos() {
  return (
    <section className={styles.videos} id="videos" aria-labelledby="videos-heading">
      <SectionReveal>
        <h2 id="videos-heading" tabIndex={0}>
          Videos
        </h2>
      </SectionReveal>
      <div className={styles.grid}>
        {videos.map((video, idx) => (
          <motion.div
            key={video.title}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {video.id ? (
              <iframe
                className={styles.frame}
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className={styles.placeholder}>
                <FaYoutube aria-hidden="true" />
                <span>Coming soon</span>
              </div>
            )}
            <p className={styles.caption}>{video.title}</p>
          </motion.div>
        ))}
      </div>
      <a className={styles.channelLink} href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
        <FaYoutube aria-hidden="true" />
        Watch more on YouTube
      </a>
    </section>
  );
}
