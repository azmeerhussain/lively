import Logo from './Logo';
import Button from './Button';
import styles from './Header.module.css';

interface HeaderProps {
  onLearnMoreClick: () => void;
}

const Header = ({ onLearnMoreClick }: HeaderProps) => (
  <header className={styles.header}>
    <Logo />
    <div onClick={onLearnMoreClick}>
      <Button text="Learn More" variant="secondary" />
    </div>
  </header>
);

export default Header;