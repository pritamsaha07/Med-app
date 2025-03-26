export interface Medication {
  id: string;
  name: string;
  dosage: string;
  quantity: string;
  time: string;
  instructions: string;
  specialNotes: string;
  status: "taken" | "missed" | "upcoming";
  takenAt: string | null;
  inventory: number;
  adherence: {
    weekly: number;
  };
}

export interface WeeklyAdherence {
  overall: number;
  dosesTaken: number;
  totalDoses: number;
  daily: Array<{
    day: string;
    rate: number;
  }>;
}

export interface TodayProgress {
  adherenceRate: number;
  totalForToday: number;
  takenToday: number;
}

export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}
