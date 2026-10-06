import type { FormError, Schedule } from '../types/form'

type PanelSixProp = {
    formData: Schedule;
    formErrors: FormError<Schedule> | undefined;
    updateField: (field:string, value:string) => void;
    toggleArrayField: (value:string) => void;
}
export default function PanelSix({formData, updateField, toggleArrayField, formErrors}: PanelSixProp) {
  return (
      <div className="space-y-6">
          <div className="form-section">
            <label className="form-label mb-3">Which days work best for you? (Select your preferred workout days)</label>
            <p className='error'>{formErrors?.preferredDays}</p>
            <div className="grid-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <button
                  key={day}
                  onClick={() => toggleArrayField(day)}
                  className={`icon-button ${formData.preferredDays.includes(day) ? 'selected' : ''}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label mb-3">Preferred Time of Day</label>
            <p className='error'>{formErrors?.preferredTime}</p>
            <div className="grid-2">
              {[
                { value: 'morning', label: '🌅 Morning (5am-9am)' },
                { value: 'midday', label: '☀️ Midday (9am-3pm)' },
                { value: 'evening', label: '🌆 Evening (3pm-8pm)' },
                { value: 'night', label: '🌙 Night (8pm+)' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('preferredTime', option.value)}
                  className={`icon-button-large ${formData.preferredTime === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label mb-2">Any physical limitations or injuries we should know about?</label>
            <p className='error'>{formErrors?.physicalLimitations}</p>
            <textarea
              value={formData.physicalLimitations}
              onChange={(e) => updateField('physicalLimitations', e.target.value)}
              className="textarea-field"
              placeholder="E.g., bad knee, lower back issues, shoulder injury, etc. (Leave blank if none)"
            />
            <p className="helper-text">This helps us avoid exercises that might cause discomfort or aggravate existing conditions.</p>
          </div>
        </div>

  )
}
