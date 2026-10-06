import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import styles from './Home.module.css';


const Home = () => {
  const navigate = useNavigate();
  // Ref used for the smooth scroll anchor to the "Lively Experience" section
  const detailsRef = useRef<HTMLDivElement>(null);

  // Triggers smooth scrolling when "Learn More" is clicked in the Header
  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <div className={styles.pageWrapper}>
        <div className={styles.splashContainer}>
          <svg className={styles.logoPattern} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="logo-bg" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <g fill="currentColor" transform="translate(50, 50)">
                  { }
                  <path d="M50 30 L60 40 L50 50 L40 40 Z" />
                  <path d="M50 50 L60 60 L50 70 L40 60 Z" />
                  <path d="M30 40 L40 50 L30 60 L20 50 Z" />
                  <path d="M70 40 L80 50 L70 60 L60 50 Z" />
                  <path d="M50 20 L55 25 L50 30 L45 25 Z" />
                  <path d="M50 70 L55 75 L50 80 L45 75 Z" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#logo-bg)" />
          </svg>
          <Header onLearnMoreClick={scrollToDetails} />
          <main className={styles.mainContent}>
            <div className={styles.contentWrapper}>
              <div className={styles.tagline}>Gamified Fitness Planning</div>
              <h1 className={styles.heroTitle}>
                Level Up Your <span className={styles.highlight}>Fitness Journey</span>
              </h1>
              <p className={styles.heroDescription}>
                Transform your workouts into an epic adventure. Get personalized fitness plans.
              </p>
              <div className={styles.ctaGroup}>
                {/* Entry point for new users to start the onboarding questionnaire */}
                <div onClick={() => navigate('questionnaire')}>
                  <Button text="Start Your Journey" variant="primary" />
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Detailed feature section containing the app's value propositions */}
        <section ref={detailsRef} className={styles.detailsSection}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.sectionTitle}>The Lively Experience</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🎯</div>
                <h3>Biometric Logic</h3>
                <p>Tailored plans generated from your age, weight, and goals using our custom algorithm.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>⚔️</div>
                <h3>Gamified Progress</h3>
                <p>Earn XP and level up as you conquer workouts. Turn sweat into stats.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>📅</div>
                <h3>Smart Scheduling</h3>
                <p>Automatic calendar integration plans your journey around your busy life.</p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>🏆</div>
                <h3>Milestones & Rewards</h3>
                <p>Unlock achievements and automated rewards to stay accountable on your journey.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Home;