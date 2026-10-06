import type { Goals, FormError } from '../types/form'


type PanelThreeProp = {
    formData: Goals;
    formErrors: FormError<Goals> | undefined;
    updateField: (field: string, value: string) => void;
    toggleArrayField: (value:string) => void;
}
export default function PanelThree({formData, updateField, toggleArrayField, formErrors} : PanelThreeProp) {
  return (
      <div className="space-y-6">
          <div className="form-section">
            <label className="form-label mb-3">Primary Goal</label>
            <p className="error">{formErrors?.primaryGoal}</p>
            <div className="grid-2">
              {[
                { value: 'weight_loss', label: '🔥 Weight Loss' },
                { value: 'muscle_gain', label: '💪 Muscle Gain' },
                { value: 'endurance', label: '⚡ Endurance' },
                { value: 'flexibility', label: '🧘 Flexibility' },
                { value: 'strength', label: '🏋️ Strength' },
                { value: 'general_fitness', label: '✨ General Fitness' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('primaryGoal', option.value)}
                  className={`icon-button-large ${formData.primaryGoal === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label mb-3">Secondary Goals (Optional - Select any that apply)</label>
            <p className="error">{formErrors?.secondaryGoals}</p>
            <div className="grid-2">
              {[
                { value: 'weight_loss', label: '🔥 Weight Loss' },
                { value: 'muscle_gain', label: '💪 Muscle Gain' },
                { value: 'endurance', label: '⚡ Endurance' },
                { value: 'flexibility', label: '🧘 Flexibility' },
                { value: 'strength', label: '🏋️ Strength' },
                { value: 'stress_relief', label: '😌 Stress Relief' }
              ].filter(opt => opt.value !== formData.primaryGoal).map(option => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayField(option.value)}
                  className={`icon-button-large ${formData.secondaryGoals.includes(option.value) ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label mb-3">When do you want to see results?</label>
            <p className='error'>{formErrors?.timelineGoal}</p>
            <select
              value={formData.timelineGoal}
              onChange={(e) => updateField('timelineGoal', e.target.value)}
              className="select-field"
            >
              <option value="">Select timeline...</option>
              <option value="1_month">1 Month (Quick start)</option>
              <option value="3_months">3 Months (Balanced)</option>
              <option value="6_months">6 Months (Sustainable)</option>
              <option value="1_year">1 Year+ (Long-term lifestyle)</option>
            </select>
          </div>
        </div>

  )
}
