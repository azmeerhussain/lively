import type { Biometrics, FormError } from '../types/form'

type PanelOneProp = {
  formData: Biometrics,
  formErrors: FormError<Biometrics> | undefined,
  updateField: (field: string, value: string) => void;
}

export default function PanelOne({ formData, updateField, formErrors }: PanelOneProp) {
  return (
    <div className="space-y-6">

      <div className="grid-2">
        <div>
          <label className="form-label">First Name</label>
          <p className='error'>{formErrors?.firstName}</p>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="input-field"
            placeholder="John"
          />
        </div>
        <div>
          <label className="form-label">Last Name</label>
          <p className='error'>{formErrors?.lastName}</p>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="input-field"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid-2">
        <div>
          <label className="form-label">Age</label>
          <p className='error'>{formErrors?.age}</p>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => updateField('age', e.target.value)}
            className="input-field"
            placeholder="25"
          />
        </div>
        <div>
          <label className="form-label">Gender</label>
          <p className='error'>{formErrors?.gender}</p>
          <select
            value={formData.gender}
            onChange={(e) => updateField('gender', e.target.value)}
            className="select-field"
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <label className="form-label">Height</label>
          <p className='error'>{formErrors?.height}</p>
          <div className="flex-gap">
            <input
              type="number"
              placeholder="70"
              value={formData.height}
              className="input-field"
              onChange={(e) => updateField('height', e.target.value)}
            />
            <select
              value={formData.heightUnit}
              onChange={(e) => updateField('heightUnit', e.target.value)}
              className="select-field"
            >
              <option value="inches">in</option>
              <option value="cm">cm</option>
            </select>
          </div>
        </div>
        <div>
          <label className="form-label">Weight</label>
          <p className='error'>{formErrors?.weight}</p>
          <div className="flex-gap">
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => updateField('weight', e.target.value)}
              className="input-field"
              placeholder="170"
            />
            <select
              value={formData.weightUnit}
              onChange={(e) => updateField('weightUnit', e.target.value)}
              className="select-field"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  )
}