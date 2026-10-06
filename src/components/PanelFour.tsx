import type { FormError, Preferences } from '../types/form'

type PanelFourProp = {
    formData: Preferences;
    formErrors: FormError<Preferences> | undefined;
    updateField: (field: string, value:string) => void;
}
export default function PanelFour({formData, updateField, formErrors} : PanelFourProp) {
  return (
      <div className="space-y-6">
          <div className="form-section">
            <label className="form-label mb-3">How many days per week can you commit to working out?</label>
            <p className="error">{formErrors?.workoutFrequency}</p>
            <div className="grid-4">
              {[1, 2, 3, 4, 5, 6, 7].map(days => (
                <button
                  key={days}
                  onClick={() => updateField('workoutFrequency', days.toString())}
                  className={`icon-button ${formData.workoutFrequency === days.toString() ? 'selected' : ''}`}
                >
                  {days} {days === 1 ? 'day' : 'days'}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label mb-3">How long can each workout session be?</label>
            <p className='error'>{formErrors?.sessionDuration}</p>
            <div className="grid-2">
              {[
                { value: '20-30', label: '20-30 minutes', desc: 'Quick & efficient' },
                { value: '30-45', label: '30-45 minutes', desc: 'Balanced session' },
                { value: '45-60', label: '45-60 minutes', desc: 'Full workout' },
                { value: '60+', label: '60+ minutes', desc: 'Extended training' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('sessionDuration', option.value)}
                  className={`selection-button ${formData.sessionDuration === option.value ? 'selected' : ''}`}
                >
                  <div className="selection-button-title">{option.label}</div>
                  <div className="selection-button-desc">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label mb-3">Preferred Workout Intensity</label>
            <p className='error'>{formErrors?.intensityPreference}</p>
            <div className="space-y-6">
              {[
                { value: 'low', label: 'Low Intensity', desc: 'Gentle, easy-paced workouts' },
                { value: 'moderate', label: 'Moderate Intensity', desc: 'Challenging but sustainable' },
                { value: 'high', label: 'High Intensity', desc: 'Push your limits' },
                { value: 'varied', label: 'Varied', desc: 'Mix of different intensities' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('intensityPreference', option.value)}
                  className={`selection-button ${formData.intensityPreference === option.value ? 'selected' : ''}`}
                >
                  <div className="selection-button-title">{option.label}</div>
                  <div className="selection-button-desc">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

  )
}
