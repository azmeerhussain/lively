import type { EquipmentConstraints, FormError } from '../types/form'

type PanelFiveProp = {
  formData: EquipmentConstraints;
  updateField: (field: string, value: string) => void;
  formErrors: FormError<EquipmentConstraints> | undefined; 
  toggleArrayField: (value:string) => void;
}
export default function PanelFive({formData, updateField, toggleArrayField, formErrors}: PanelFiveProp) {
  console.log('equipment', formData);
  return (
     <div className="space-y-6">
          <div className="form-section">
            <label className="form-label mb-3">Where will you be working out?</label>
            <p className='error'>{formErrors?.workoutLocation}</p>
            <div className="grid-2">
              {[
                { value: 'home', label: '🏠 Home' },
                { value: 'gym', label: '🏋️ Gym' },
                { value: 'outdoors', label: '🌳 Outdoors' },
                { value: 'mixed', label: '🔄 Mix of locations' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateField('workoutLocation', option.value)}
                  className={`icon-button-large ${formData.workoutLocation === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="form-label mb-3">What equipment do you have access to? (Select all that apply)</label>
            <p className='error'>{formErrors?.availableEquipment}</p>
            <div className="grid-2">
              {[
                'None (Bodyweight only)',
                'Dumbbells',
                'Resistance Bands',
                'Barbell',
                'Kettlebells',
                'Pull-up Bar',
                'Bench',
                'Squat Rack',
                'Cardio Machine',
                'Medicine Ball',
                'Yoga Mat',
                'Full Gym Access'
              ].map(equipment => (
                <button
                  key={equipment}
                  onClick={() => toggleArrayField(equipment)}
                  className={`checkbox-button ${formData.availableEquipment.includes(equipment) ? 'selected' : ''}`}
                >
                  {equipment}
                </button>
              ))}
            </div>
          </div>
        </div>

  )
}
