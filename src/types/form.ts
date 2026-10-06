export type HealthFormData = {
  biometrics: Biometrics;
  fitness_background: FitnessBackground;
  goals: Goals;
  preferences: Preferences;
  equipment_constraints: EquipmentConstraints;
  schedule: Schedule;
};

export type Biometrics = {
  firstName: "";
  lastName: "";
  age: "";
  gender: "";
  height: "";
  weight: "";
  heightUnit: "inches";
  weightUnit: "lbs";
};

export type Payload = {
  biometrics: {
    firstName: "",
    lastName: "",
    age: number,
    gender: "",
    height: number,
    weight: number
  },
  fitness_background: FitnessBackground,
  goals: Goals,
  preferences: Preferences,
  equipment_constraints: EquipmentConstraints,
  schedule: Schedule
};

export type FitnessBackground = {
  fitnessLevel: "";
  activityLevel: "";
};

export type Goals = {
  primaryGoal: "";
  secondaryGoals: string[];
  timelineGoal: "";
};

export type Preferences = {
  workoutFrequency: "";
  sessionDuration: "";
  intensityPreference: "";
};

export type EquipmentConstraints = {
  availableEquipment: string[];
  workoutLocation: "";
};

export type Schedule = {
  preferredDays: string[];
  preferredTime: "";
  physicalLimitations: "";
};

//error typing for fitness form
export type FormError<HealthData> = {
  [K in keyof HealthData]?: HealthData[K] extends any[]
    ? string
    : HealthData[K] extends object
      ? FormError<HealthData[K]>
      : string;
};
