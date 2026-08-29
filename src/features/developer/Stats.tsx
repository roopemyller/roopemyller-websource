import StatCounter from '../../components/StatCounter/StatCounter';
import SectionReveal from '../../components/SectionReveal/SectionReveal';
import { MODES } from '../../app/modes';
import styles from './Stats.module.css';

// Pulled from the GitHub GraphQL API (contributionsCollection.contributionCalendar.totalContributions
// for roopemyller, rolling last-365-days window) — update this manually every so often.
const GITHUB_CONTRIBUTIONS_LAST_YEAR = 353;

// Round down to a clean approximate figure so the stat reads "350+" rather than an oddly exact "353".
const roundDown = (value: number, step: number) => Math.floor(value / step) * step;

export default function Stats() {
  const skillCount = MODES.developer.aboutChips.length;

  return (
    <section className={styles.stats} id="stats" aria-label="Developer stats">
      <SectionReveal className={styles.grid}>
        <StatCounter
          value={roundDown(GITHUB_CONTRIBUTIONS_LAST_YEAR, 10)}
          suffix="+"
          label="GitHub contributions (past year)"
        />
        <StatCounter value={roundDown(skillCount, 5)} suffix="+" label="Languages & tools" />
        <StatCounter value={4} suffix="+" label="Years coding" />
      </SectionReveal>
    </section>
  );
}
