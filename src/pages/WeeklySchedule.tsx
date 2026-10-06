import { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './WeeklySchedule.module.css';
import type { Session, WorkoutWeek } from '../types/app';

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// Map used to calculate day offsets from the anchor Monday
const DAY_MAP: Record<string, number> = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 };

// Utility to parse YouTube video IDs for the workout instruction iframe
const getYouTubeId = (url: string) => {
  const match = url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return (match && match[2].length === 11) ? match[2] : null;
};

const WeeklySchedule = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewedMonth, setViewedMonth] = useState(today.getMonth());
  const [selectedWorkout, setSelectedWorkout] = useState<Session | null>(null);
  const [workoutWeeks, setWorkoutWeeks] = useState<WorkoutWeek[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Timer states for the activity modal logic
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Calculates the Monday of the current week to serve as a base for workout offsets
  const anchorMonday = useMemo(() => {
    const d = new Date(today);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    if (day === 0) monday.setDate(monday.getDate() + 7);
    return monday;
  }, [today]);

  // Aggregates total completed sessions across all workout weeks for the sidebar stat
  const totalCompleted = useMemo(() => {
    return workoutWeeks.reduce((acc, week) => {
      const weekCount = (week.workoutDays || []).reduce((dayAcc: number, day: any) => {
        const completedInDay = (day.sessions || []).filter((s: any) => s.completed).length;
        return dayAcc + completedInDay;
      }, 0);
      return acc + weekCount;
    }, 0);
  }, [workoutWeeks]);

  // Determines which months contain scheduled workouts for the dropdown filter
  const availableMonths = useMemo(() => {
    if (workoutWeeks.length === 0) return [today.getMonth()];
    const months = new Set<number>();
    workoutWeeks.forEach(week => {
      const weekStartDate = new Date(anchorMonday);
      weekStartDate.setDate(anchorMonday.getDate() + (week.weekNumber - 1) * 7);
      months.add(weekStartDate.getMonth());
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
      months.add(weekEndDate.getMonth());
    });
    return Array.from(months).sort((a, b) => a - b);
  }, [workoutWeeks, anchorMonday, today]);

  // Calendar UI helpers for rendering the correct number of days and padding
  const { daysInMonth, emptySlots } = useMemo(() => {
    const year = today.getFullYear();
    return {
      daysInMonth: new Date(year, viewedMonth + 1, 0).getDate(),
      emptySlots: (new Date(year, viewedMonth, 1).getDay() + 6) % 7 
    };
  }, [viewedMonth, today]);

  // Fetches personalized workout data for the user
  useEffect(() => {
    if (!user) return;
    fetch(`/api/workouts/${user.userId}`)
      .then(res => res.json())
      .then(data => setWorkoutWeeks(data.workouts || []))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, [user?.userId]);

  // Resets timer state whenever a new workout is selected from the calendar
  useEffect(() => {
    if (!selectedWorkout) return;
    setTimeLeft((selectedWorkout.duration || 0) * 60);
    setIsTimerActive(false);
    setIsFinished(false);
  }, [selectedWorkout]);

  // Manages the countdown interval for active workouts
  useEffect(() => {
    let interval: any;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Handles the final transition of session status and awards XP in the DB
  const handleFinishWorkout = async () => {
    try {
      const response = await fetch(`/api/users/${user?.userId}/complete-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: selectedWorkout?.id, xp: selectedWorkout?.xp })
      });

      if (response.ok) {
        setWorkoutWeeks(prev => prev.map(week => ({
          ...week,
          workoutDays: week.workoutDays.map((day: any) => ({
            ...day,
            sessions: day.sessions.map((s: any) => 
              s.id === selectedWorkout?.id ? { ...s, completed: true } : s
            )
          }))
        })));

        setSelectedWorkout(null);
        setIsFinished(false);
      }
    } catch (err) { 
      console.error("Failed to finish workout:", err); 
    }
  };

  const handleCancel = () => {
    if (isTimerActive && !window.confirm("Are you sure you want to cancel this workout?")) return;
    setIsTimerActive(false);
    setSelectedWorkout(null);
  };

  const videoId = selectedWorkout?.video ? getYouTubeId(selectedWorkout.video) : null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Monthly Schedule</h1>
        <div className={styles.dropdownContainer}>
          <select 
            className={styles.monthDropdown} 
            value={viewedMonth} 
            onChange={e => setViewedMonth(parseInt(e.target.value))}
          >
            {availableMonths.map(m => (
              <option key={m} value={m}>
                {MONTH_NAMES[m]} {today.getFullYear()}
              </option>
            ))}
          </select>
          <span className={styles.dropdownArrow}>▾</span>
        </div>
      </header>
      
      <div className={styles.mainGrid}>
        <section className={`${styles.card} ${styles.planCard}`}>
          {/* Main Monthly Calendar View */}
          <div className={styles.calendarGrid}>
            {WEEK_DAYS.map(day => <div key={day} className={styles.dayHeader}>{day}</div>)}
            {Array.from({ length: emptySlots }).map((_, i) => <div key={`empty-${i}`} className={styles.monthDay} style={{ opacity: 0.3 }} />)}
            {!isLoading && Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const cellDate = new Date(today.getFullYear(), viewedMonth, day);
                const sessions = workoutWeeks.flatMap(week => (week.workoutDays || []).flatMap((wd: any) => {
                  const offset = ((week.weekNumber - 1) * 7) + (DAY_MAP[wd.name] - 1);
                  const sessionDate = new Date(anchorMonday);
                  sessionDate.setDate(anchorMonday.getDate() + offset);
                  return (sessionDate.toDateString() === cellDate.toDateString()) ? wd.sessions || [] : [];
                }));
                
                return (
                  <div key={day} className={styles.monthDay}>
                    <span className={styles.dayNum}>{day}</span>
                    {sessions.map((s, idx) => (
                      <div 
                        key={idx} 
                        className={`
                          ${styles.event} 
                          ${s.completed ? styles.eventCompleted : ''} 
                          ${s.completed ? styles.eventDisabled : ''}
                        `} 
                        // Disable the click if the workout is already finished
                        onClick={() => !s.completed && setSelectedWorkout(s)}
                      >
                        {s.name}
                        {s.completed && <span className={styles.checkIcon}> ✓</span>}
                      </div>
                    ))}
                  </div>
                );
            })}
          </div>
        </section>

        <aside className={styles.sideColumn}>
          <section className={styles.card}>
            <div className={styles.trackerContent}>
              <h2 className={styles.trackerNumber}>{totalCompleted}</h2>
              <div className={styles.trackerText}>
                <h3>Total Workouts</h3>
                <p className={styles.subText}>Sessions completed to date</p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* Modal for viewing workout details, video instructions, and timing the session */}
      {selectedWorkout && (
        <div className={styles.modalOverlay} onClick={() => !isTimerActive && setSelectedWorkout(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.videoContainer}>
              {videoId ? <iframe className={styles.modalVideoFrame} src={`https://www.youtube.com/embed/${videoId}`} allowFullScreen /> : <div className={styles.videoPlaceholder}>Lively Focus</div>}
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <h2>{selectedWorkout.name}</h2>
                <div className={styles.xpBadge}>+{selectedWorkout.xp} XP</div>
              </div>
              <p className={styles.modalDescription}>{selectedWorkout.description}</p>
              {isFinished ? (
                <button className={styles.finishBtn} onClick={handleFinishWorkout}>Finish Workout & Claim XP</button>
              ) : (
                <>
                  <button 
                    className={isTimerActive ? styles.disabledBtn : styles.primaryActionBtn} 
                    onClick={() => setIsTimerActive(true)} 
                    disabled={isTimerActive}
                  >
                    {isTimerActive ? `In Progress... (${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')})` : `Start Activity (${selectedWorkout.duration}m)`}
                  </button>
                  <button className={styles.cancelLink} onClick={handleCancel}>
                    Cancel Workout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;