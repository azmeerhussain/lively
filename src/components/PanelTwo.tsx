import type { FitnessBackground, FormError } from "../types/form";

type PanelTwoProp = {
  formData: FitnessBackground;
  formErrors: FormError<FitnessBackground> | undefined; 
  updateField: (field: string, value: string) => void;
};
export default function PanelTwo({ formData, updateField, formErrors }: PanelTwoProp) {
  return (
      <div className="space-y-6">
          <div className="form-section">
            <label className="form-label mb-3">Current Fitness Level</label>
            <p className="error">{formErrors?.fitnessLevel}</p>
            <div className="space-y-6">
              {[
                { value: 'beginner', label: 'Beginner', desc: 'New to exercise or returning after a long break' },
                { value: 'intermediate', label: 'Intermediate', desc: 'Regular exercise for 6+ months' },
                { value: 'advanced', label: 'Advanced', desc: 'Consistent training for 2+ years' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('fitnessLevel', option.value)}
                  className={`selection-button ${formData.fitnessLevel === option.value ? 'selected' : ''}`}
                >
                  <div className="selection-button-title">{option.label}</div>
                  <div className="selection-button-desc">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label mb-3">Current Activity Level</label>
            <p className="error">{formErrors?.activityLevel}</p>
            <div className="space-y-6">
              {[
                { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                { value: 'very', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('activityLevel', option.value)}
                  className={`selection-button ${formData.activityLevel === option.value ? 'selected' : ''}`}
                >
                  <div className="selection-button-title">{option.label}</div>
                  <div className="selection-button-desc">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

  );
}
