import results from './results';
import StatCounter from '../../components/StatCounter/StatCounter';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import Reveal from '../../components/Reveal/Reveal';
import styles from './Results.module.css';

const podiumCount = results.filter((r) => /^1st|^2nd|^3rd/.test(r.placement)).length;

export default function Results() {
  return (
    <section className={styles.results} id="results" aria-labelledby="results-heading">
      <SectionReveal>
        <h2 id="results-heading" tabIndex={0}>
          Match Results
        </h2>
      </SectionReveal>
      <SectionReveal className={styles.statsRow} delay={0.05}>
        <StatCounter value={results.length} label="Matches logged" />
        <StatCounter value={podiumCount} label="Podium finishes" />
      </SectionReveal>
      <div className={styles.list}>
        {results.map((result, idx) => (
          <Reveal
            as="article"
            key={result.id}
            className={styles.card}
            index={idx % 3}
            amount={0.3}
            y={20}
            whileHover={{ y: -6 }}
          >
            <div className={styles.cardHead}>
              <span className={styles.placement}>{result.placement}</span>
              <span className={styles.discipline}>{result.discipline} · {result.division}</span>
            </div>
            <h3>{result.eventName}</h3>
            <p className={styles.meta}>
              {new Date(result.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
              {result.location && ` · ${result.location}`}
            </p>
            {result.notes && <p className={styles.notes}>{result.notes}</p>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
