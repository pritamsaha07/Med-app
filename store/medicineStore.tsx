import { create } from "zustand";
import medicationsData from "@/constants/Sample_Data_FE.json";
import { Medication, TodayProgress, WeeklyAdherence } from "@/constants";

interface MedicationState {
  medications: Medication[];
  weeklyAdherence: WeeklyAdherence;
  todayProgress: TodayProgress;
  markMedicationAsTaken: (medicationId: string) => void;
}

export const useMedicationStore = create<MedicationState>()((set, get) => ({
  medications: medicationsData.medications as Medication[],
  weeklyAdherence: medicationsData.weeklyAdherence as WeeklyAdherence,
  todayProgress: medicationsData.todayProgress as TodayProgress,
  markMedicationAsTaken: (medicationId: string) => {
    const currentState = get();

    const updatedMedications = currentState.medications.map((med) =>
      med.id === medicationId
        ? {
            ...med,
            status: "taken" as const,
            takenAt: new Date().toISOString(),
          }
        : med
    );

    const newTakenToday = currentState.todayProgress.takenToday + 1;
    const newAdherenceRate = Math.round(
      (newTakenToday / currentState.todayProgress.totalForToday) * 100
    );

    const newDosesTaken = currentState.weeklyAdherence.dosesTaken + 1;
    const newOverallAdherence = Math.round(
      (newDosesTaken / currentState.weeklyAdherence.totalDoses) * 100
    );

    set({
      medications: updatedMedications,
      weeklyAdherence: {
        ...currentState.weeklyAdherence,
        overall: newOverallAdherence,
        dosesTaken: newDosesTaken,
      },
      todayProgress: {
        ...currentState.todayProgress,
        adherenceRate: newAdherenceRate,
        takenToday: newTakenToday,
      },
    });
  },
}));

export default useMedicationStore;
