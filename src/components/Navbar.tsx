import type { ReactNode } from 'react'
import styles from './Navbar.module.css';
import Logo from './Logo';
import Button from './Button';

interface NavbarProps {
    children: ReactNode;
}

export default function Navbar({children} : NavbarProps) {
  return (
    <div className={styles['bar']}>
        <Logo/>
    </div>
  )
}
