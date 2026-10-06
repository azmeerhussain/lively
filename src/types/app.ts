export type User = {
    userId: "",
    name: "",
    avatar: {
        skin: "",
        items: Item[]
    },
    weight: "",
    height: "",
    primaryGoal:"",
    workoutFrequency: "",
    workoutLocation: "",
    equipmentCount: number,
    preferredDays: string[],
    timelineGoal: string,
    secondaryGoals: string[],
    activityLevel: string,
    fitnessLevel: string,
    physicalLimitations: string
}

export type Achievement = {
    id: "",
    name: "",
    description: ""
}

export type Item = {
    id: "",
    name: "",
    level: number,
    image: "",
    color: string
}

export type AuthContextType = {
    user: User | null;
    loading: boolean;
}

export type Session = {
    completed: boolean,
    id: string,
    time: string,
    duration: number,
    name: string,
    difficulty: string, 
    description: string, 
    video: string, 
    xp: number
}

export type WorkoutDay = {
    id: string,
    name: string, 
    sessions: Session[],
    completed: boolean,
    xp: number
}

export type WorkoutWeek = {
    id: string,
    name: string,
    workoutDays: WorkoutDay[],
    weekNumber: number,
    completed: boolean,
    xp: number
}

export type Progress = {
    xp: number,
    level: number
}