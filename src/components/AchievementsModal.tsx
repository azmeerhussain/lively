import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './AchievementsModal.module.css';

// Master list of achievements available in the app
const ALL_ACHIEVEMENTS = [
  { name: 'First Steps', description: 'Completed your first session', icon: '👟' },
  { name: 'Century Club', description: 'Earned 100 total XP', icon: '💯' },
  { name: 'Double Digits', description: 'Completed 10 total workouts', icon: '🔟' },
];

const AchievementsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  
  // State to store names of achievements found in the database
  const [unlockedNames, setUnlockedNames] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch if the modal is open and we have a valid user ID
    if (!isOpen || !user?.userId) return;

    setIsLoading(true);
    fetch(`/api/achievements/${user.userId}`)
      .then(res => res.json())
      .then(data => {
        // Map the names from the DB and ensure they are treated as strings
        console.log(data);
        const earned = new Set<string>(
          (data.achievements || []).map((a: any) => String(a.name))
        );
        setUnlockedNames(earned);
      })
      .catch(err => console.error("Error fetching trophies:", err))
      .finally(() => setIsLoading(false));
  }, [isOpen, user?.userId]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Trophy Room</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <p>Polishing the trophies...</p>
            </div>
          ) : (
            ALL_ACHIEVEMENTS.map(badge => {
              // Perform a case-insensitive check to match "First Steps" with "first steps"
              const isUnlocked = Array.from(unlockedNames).some(
                earnedName => earnedName.toLowerCase() === badge.name.toLowerCase()
              );

              return (
                <div 
                  key={badge.name} 
                  className={`${styles.badge} ${!isUnlocked ? styles.locked : ''}`}
                >
                  <div className={styles.badgeIcon}>{badge.icon}</div>
                  <div className={styles.badgeInfo}>
                    <h4>{badge.name}</h4>
                    <p>{badge.description}</p>
                  </div>
                  
                  {/* Visual indicator for locked achievements */}
                  {!isUnlocked && (
                    <span className={styles.lockTag}>🔒 Locked</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default AchievementsModal;