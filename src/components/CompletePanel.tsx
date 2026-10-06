export default function CompletePanel() {
  return (
    <div className="completion-container">
        <div className="completion-card">
          <div className="completion-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="completion-title">Your Plan is Ready! 🎉</h2>
          <p className="completion-text">
            We're generating your personalized workout plan based on your goals and preferences. 
            This will take just a moment...
          </p>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <div className="info-box">
            <h3>What happens next:</h3>
            <ul className="info-list">
              <li>
                <span className="checkmark">✓</span>
                <span>Your personalized workout plan will appear in your calendar</span>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <span>Complete workouts to earn XP and level up</span>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <span>Track your progress and unlock achievements</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

  )
}
