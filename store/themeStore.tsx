import { create } from "zustand";

import { ThemeState } from "@/constants";

export const useThemeStore = create<ThemeState>()((set, get) => ({
  isDarkMode: false,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
