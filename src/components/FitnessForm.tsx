import { useState } from "react";
import PanelOne from "./PanelOne";
import PanelTwo from "./PanelTwo";
import PanelThree from "./PanelThree";
import PanelFour from "./PanelFour";
import PanelFive from "./PanelFive";
import PanelSix from "./PanelSix";
import type { FormError, HealthFormData, Payload } from "../types/form";
import CompletePanel from "./CompletePanel";
import { useNavigate } from 'react-router-dom';

export default function FitnessForm() {
  const navigate = useNavigate();

  type ToggleArrayField = {
    (section: "goals", value: string): void;
    (section: "schedule", value: string): void;
    (section: "equipment_constraints", value: string): void;
  };

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<HealthFormData>({
    biometrics: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      heightUnit: "inches",
      weightUnit: "lbs",
    },
    fitness_background: {
      fitnessLevel: "",
      activityLevel: ""
    },
    goals: {
      primaryGoal: "",
      secondaryGoals: [],
      timelineGoal: "",
    },
    preferences: {
      workoutFrequency: "",
      sessionDuration: "",
      intensityPreference: "",
    },
    equipment_constraints: {
      availableEquipment: [],
      workoutLocation: "",
    },
    schedule: {
      preferredDays: [],
      preferredTime: "",
      physicalLimitations: "",
    },
  });

  const [errors, setErrors] = useState<FormError<HealthFormData>>({});
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const updateField = (section: keyof HealthFormData, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  //helper function to facilitate toggling multi answered responses in fitness form
  const toggleArr = (arr: string[], value: string): string[] =>
    arr.includes(value)
      ? arr.filter((item) => item !== value)
      : [...arr, value];

  //handles multi answered responses in fitness form
  const toggleArrayField: ToggleArrayField = (section, value) => {
    setFormData((prev) => {
      switch (section) {
        case "goals":
          return {
            ...prev,
            goals: {
              ...prev.goals,
              secondaryGoals: toggleArr(prev.goals.secondaryGoals, value),
            },
          };
        case "schedule":
          return {
            ...prev,
            schedule: {
              ...prev.schedule,
              preferredDays: toggleArr(prev.schedule.preferredDays, value),
            },
          };
        case "equipment_constraints":
          return {
            ...prev,
            equipment_constraints: {
              ...prev.equipment_constraints,
              availableEquipment: toggleArr(
                prev.equipment_constraints.availableEquipment,
                value,
              )
            },
          };
      }
    });
  };


  //form validation for each form panel
  const validatePanel = (step: number): boolean => {
    const errors: FormError<HealthFormData> = {};
    let isValid = true;

    switch (step) {
      case 0:
        errors.biometrics = {};
        if (!formData.biometrics.firstName.trim()) {
          errors.biometrics.firstName = "First name is required.";
          isValid = false;
        }
        if (!formData.biometrics.lastName.trim()) {
          errors.biometrics.lastName = "Last name is required.";
          isValid = false;
        }
        if (!formData.biometrics.age.trim()) {
          errors.biometrics.age = "Age is required.";
          isValid = false;
        } else if (isNaN(Number(formData.biometrics.age))) {
          errors.biometrics.age = "Age needs to be a valid number.";
          isValid = false;
        }
        if (!formData.biometrics.weight.trim()) {
          errors.biometrics.weight = "Weight is required.";
          isValid = false;
        } else if (Number.isNaN(formData.biometrics.weight)) {
          errors.biometrics.weight = "Weight needs to be a valid number.";
          isValid = false;
        }
        if (!formData.biometrics.height.trim()) {
          errors.biometrics.height = "Height is required.";
          isValid = false;
        } else if (Number.isNaN(formData.biometrics.height)) {
          errors.biometrics.height = "Height needs to be a valid number.";
          isValid = false;
        }
        if (!formData.biometrics.gender.trim()) {
          errors.biometrics.gender = "Gender is required.";
          isValid = false;
        }
        break;
      case 1:
        errors.fitness_background = {};
        if (!formData.fitness_background.activityLevel.trim()) {
          errors.fitness_background.activityLevel = "Activity level is required.";
          isValid = false;
        }
        if (!formData.fitness_background.fitnessLevel.trim()) {
          errors.fitness_background.fitnessLevel = "Fitness level is required.";
          isValid = false;
        }
        break;
      case 2:
        errors.goals = {};
        if (!formData.goals.primaryGoal.trim()) {
          errors.goals.primaryGoal = "Primary goal is required.";
          isValid = false;
        }
        if (formData.goals.secondaryGoals.length < 1) {
          errors.goals.secondaryGoals = "Must select at least one secondary goal.";
          isValid = false;
        }
        if (!formData.goals.timelineGoal.trim()) {
          errors.goals.timelineGoal = "Timeline Goal is required.";
          isValid = false;
        }
        break;
      case 3:
        errors.preferences = {};
        if (!formData.preferences.workoutFrequency.trim()) {
          errors.preferences.workoutFrequency = "Please select number of days you plan to commit.";
          isValid = false;
        }
        if (!formData.preferences.sessionDuration.trim()) {
          errors.preferences.sessionDuration = "Please select duration of your workout sessions.";
          isValid = false;
        }
        if (!formData.preferences.intensityPreference.trim()) {
          errors.preferences.intensityPreference = "Intensity is required.";
          isValid = false;
        }
        break;
      case 4:
        errors.equipment_constraints = {};
        if (formData.equipment_constraints.availableEquipment.length < 1) {
          errors.equipment_constraints.availableEquipment = "Must select at least one equipment.";
          isValid = false;
        }
        if (!formData.equipment_constraints.workoutLocation.trim()) {
          errors.equipment_constraints.workoutLocation = "Must select a location.";
          isValid = false;
        }
        break;
      case 5:
        errors.schedule = {};
        if (formData.schedule.preferredDays.length < 1) {
          errors.schedule.preferredDays = "Must select at least one day.";
          isValid = false;
        }
        if (!formData.schedule.preferredTime.trim()) {
          errors.schedule.preferredTime = "Preferred time is required.";
          isValid = false;
        }
        break;
    }
    setErrors(errors);
    return isValid;
  };

  const nextStep = () => {
    if (validatePanel(step)) {
      if (step < steps.length - 1) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //passes both user's biometrics and preferences to backend
  const handleSubmit = () => {
    if (validatePanel(step)) {
      const payload: Payload = {
        ...formData,
        biometrics: {
          ...formData.biometrics,
          age: Number(formData.biometrics.age),
          weight: Number(formData.biometrics.weight),
          height: Number(formData.biometrics.height)
        }
      };
      console.log("Submitting form data:", payload);
      setIsComplete(true);
      
     //sends user biometrics & preferences to backend
      const sendPayload = async () => {
        try{
          const response = await fetch("/api/ai/workout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
  
          if(response.ok){
            console.log("Success");
            const data = await response.json();
            console.log(data);
            navigate(`/app/${data.userId}/dashboard/`);
          } else {
            console.log("Failed");
          }
        }
        catch(error){
          console.error("Network error: ", error);
        }
      }
      sendPayload();
    }
  };

  //Map current stpe to corresponding form panel component
  const steps = [
    {
      title: "Let's Start with the Basics",
      subtitle: "Help us understand your starting point",
      panel: () => (
        <PanelOne
          formData={formData.biometrics}
          formErrors={errors.biometrics}
          updateField={(f: string, v: string) =>
            updateField("biometrics", f, v)
          }
        />
      ),
    },
    {
      title: "Your Fitness Background",
      subtitle: "This helps us match exercises to your level",
      panel: () => (
        <PanelTwo
          formData={formData.fitness_background}
          formErrors={errors.fitness_background}
          updateField={(f: string, v: string) =>
            updateField("fitness_background", f, v)
          }
        />
      ),
    },
    {
      title: "What Are Your Goals?",
      subtitle: "We'll design your plan around what matters most to you",
      panel: () => (
        <PanelThree
          formData={formData.goals}
          formErrors={errors.goals}
          updateField={(f: string, v: string) => updateField("goals", f, v)}
          toggleArrayField={(v: string) => toggleArrayField("goals", v)}
        />
      ),
    },
    {
      title: "Your Workout Preferences",
      subtitle: "Let's build a schedule that fits your life",
      panel: () => (
        <PanelFour
          formData={formData.preferences}
          formErrors={errors.preferences}
          updateField={(f: string, v: string) =>
            updateField("preferences", f, v)
          }
        />
      ),
    },
    {
      title: "Equipment & Location",
      subtitle: "We'll match exercises to what you have access to",
      panel: () => (
        <PanelFive
          formData={formData.equipment_constraints}
          formErrors={errors.equipment_constraints}
          updateField={(f: string, v: string) =>
            updateField("equipment_constraints", f, v)
          }
          toggleArrayField={(v: string) =>
            toggleArrayField("equipment_constraints", v)
          }
        />
      ),
    },
    {
      title: "Schedule & Constraints",
      subtitle: "One last step to personalize your plan",
      panel: () => (
        <PanelSix
          formData={formData.schedule}
          formErrors={errors.schedule}
          updateField={(f: string, v: string) => updateField("schedule", f, v)}
          toggleArrayField={(v: string) => toggleArrayField("schedule", v)}
        />
      ),
    },
  ];

  //calculates progress in fitness form
  const progressPercentage = ((step + 1) / steps.length) * 100;

  if (isComplete) {
    return <CompletePanel />;
  }

  return (
    <div className="questionnaire-container">
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-text">
            Step {step + 1} of {steps.length}
          </span>
          <span className="progress-percentage">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="questionnaire-card">
        <div className="card-header">
          <h1 className="card-title">{steps[step].title}</h1>
          <p className="card-subtitle">{steps[step].subtitle}</p>
        </div>
        <div className="form-content">{steps[step].panel()}</div>
        <div className="navigation-section">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="nav-button-prev"
          >
            ← Previous
          </button>

          {step === steps.length - 1 ? (
            <button onClick={handleSubmit} className="nav-button-next">
              Generate My Workout Plan 🚀
            </button>
          ) : (
            <button onClick={nextStep} className="nav-button-next">
              Next →
            </button>
          )}
        </div>
      </div>

      <div className="help-text">
        🔒 Your information is private and only used to create your personalized
        workout plan
      </div>
    </div>
  );
}