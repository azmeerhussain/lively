import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './ProfileModal.module.css';
import HeroAvatar from './HeroAvatar';
import type { Item } from '../types/app';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number | undefined;
  xp: number | undefined;
  name: string | undefined;
  onEditAvatar: () => void;
  currentColor: string | undefined;
  items: Item[];
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  onEditAvatar, 
  currentColor, 
  name, 
  level, 
  xp,
  items 
}) => {
  if (!isOpen) return null;
  
  const [showToast, setShowToast] = useState(false);
  
  // Copies current URL to clipboard for social sharing features
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return ReactDOM.createPortal(
    <>
    {/* Clicking the overlay triggers the onClose callback to exit the modal */}
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.card}>
        {showToast && <div className={styles.toast}>Link copied to clipboard!</div>}
        {/* Branding header featuring the user's custom HeroAvatar */}
        <div className={styles.orangeHeader}>
          <div className={styles.avatarCircle}>
            <HeroAvatar 
              className={styles.modalHero} 
              primaryColor={currentColor}
              items={items}
            />
          </div>
          <h2 className={styles.userName}>{name}</h2>
        </div>
        <div className={styles.statsBar}>
          <div className={styles.statGroup}>
            <span className={styles.statValue}>{level}</span>
            <span className={styles.statLabel}>LEVEL</span>
          </div>
          <div className={styles.statGroup}>
            <span className={styles.statValue}>{xp}</span>
            <span className={styles.statLabel}>TOTAL XP</span>
          </div>
        </div>
        {/* Navigation links for account management and social features */}
        <nav className={styles.menuList}>
          <div className={styles.menuItem}>Settings</div>
          <div className={styles.menuItem} onClick={onEditAvatar}>
            Edit Avatar
          </div>
          <div className={styles.menuItem} onClick={handleShareClick}>
            Share Session
          </div>
          <div className={styles.separator} />
          <div className={styles.menuItem}>Help & support</div>
        </nav>
      </div>
    </>,
    document.body
  );
};

export default ProfileModal;