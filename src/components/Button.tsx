import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ text, variant = 'primary' }: ButtonProps) => {
  const buttonClass = variant === 'primary' ? styles.btnPrimary : styles.btnSecondary;
  return (
    <button className={`${styles.btn} ${buttonClass}`}>
      {text}
    </button>
  );
};

export default Button;