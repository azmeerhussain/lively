import styles from './Dashboard.module.css';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Progress } from '../types/app';

const Dashboard = () => {
  // Accessing global auth state for the current user
  const { user, loading } = useAuth();
  const {userId} = useParams();
  const [progress, setProgress] = useState<Progress>();
  
    useEffect(() => {
      const fetchProgression = async () => {
        try{
          const res = await fetch(`/api/users/progress/${userId}`, {
            method: "GET"
          });
          
          if(!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setProgress(data);
        } catch(err){
          console.error(err);
        }
      }
      if(userId) fetchProgression();
    }, [userId]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!user || !progress) return <p className={styles.error}>User not found...</p>;

  const progressInLevel = (progress.xp || 0) % 100;
  const weightText = (user.weight || "0 lbs").split(" ");
  const goalText = (user.primaryGoal || "Goal").replace("_", " ");
  const workoutDays = (user.preferredDays || []).map((day) => day.charAt(0));

  return (
    <div className={styles.container}>
      {/* Dashboard Header: Shows Level and XP Progress Bar */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>Welcome Back, {user.name}</h1>
          <p className={styles.subtitle}>Consistency is key to {goalText}.</p>
        </div>

        <div className={styles.levelBadge}>
          <span className={styles.levelNum}>Lvl {progress?.level}</span>
          <div className={styles.xpBarContainer}>
            <div
              className={styles.xpBarFill}
              style={{ width: `${progressInLevel}%` }}
            ></div>
          </div>
          <span className={styles.xpText}>{progress?.xp} XP</span>
        </div>
      </header>

      <div className={styles.dashboardGrid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Biometric Profile</h3>
          </div>
          <div className={styles.biometricContent}>
            <div className={styles.statLarge}>
              <span className={styles.statVal}>{weightText[0]}</span>
              <span className={styles.statUnit}>{weightText[1] || "lbs"}</span>
            </div>
            <div className={styles.goalTag}>{goalText.toUpperCase()}</div>
          </div>
        </div>

        {/* Stat Card: Weekly frequency and a visual dot-grid for workout days */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Weekly Training</h3>
          </div>
          <div className={styles.scheduleVisual}>
            <p><strong>{user.workoutFrequency} sessions</strong> / week</p>
            <div className={styles.dayGrid}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div 
                  key={i} 
                  className={`${styles.dayDot} ${workoutDays.includes(day) ? styles.activeDay : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Setup & Gear</h3>
          </div>
          <p className={styles.equipmentSummary}>
            Training at <strong>{user.workoutLocation}</strong> using {user.equipmentCount} {user.equipmentCount > 1 ? "tools" : "tool"}.
            {user.physicalLimitations && (
              <span> Note: {user.physicalLimitations}.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;