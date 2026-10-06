import styles from './Logo.module.css';

const Logo = () => (
  <div className={styles.logoContainer}>
    <svg className={styles.logoSvg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="currentColor">
          <path d="M50 30 L60 40 L50 50 L40 40 Z"/>
          <path d="M50 50 L60 60 L50 70 L40 60 Z"/>
          <path d="M30 40 L40 50 L30 60 L20 50 Z"/>
          <path d="M70 40 L80 50 L70 60 L60 50 Z"/>
          <path d="M50 20 L55 25 L50 30 L45 25 Z"/>
          <path d="M50 70 L55 75 L50 80 L45 75 Z"/>
          <path d="M35 30 L40 35 L35 40 L30 35 Z"/>
          <path d="M65 30 L70 35 L65 40 L60 35 Z"/>
          <path d="M35 60 L40 65 L35 70 L30 65 Z"/>
          <path d="M65 60 L70 65 L65 70 L60 65 Z"/>
          <rect x="48" y="25" width="4" height="5"/>
          <rect x="48" y="70" width="4" height="5"/>
          <rect x="25" y="48" width="5" height="4"/>
          <rect x="70" y="48" width="5" height="4"/>
        </g>
    </svg>
    <span className={styles.brandName}>Lively.</span>
  </div>
);

export default Logo;