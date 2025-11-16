import { create } from "zustand";

type UIState = {
  theme: "light" | "dark" | "system";
  currency: string;
  exchangeRates: Record<string, number>;
  commandPaletteOpen: boolean;

  setTheme: (t: "light" | "dark" | "system") => void;
  setCurrency: (c: string) => void;
  toggleCommandPalette: () => void;

  initializeTheme: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  theme: "system", // default until initializeTheme runs
  currency: "USD",
  exchangeRates: { USD: 1, NGN: 1500, EUR: 0.85, GBP: 0.73, CAD: 1.25 },
  commandPaletteOpen: false,

  setTheme: (t) => {
    if (typeof window !== "undefined") {
      localStorage.theme = t;

      if (t === "system") {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", systemPrefersDark);
      } else {
        document.documentElement.classList.toggle("dark", t === "dark");
      }
    }

    set({ theme: t });
  },

  setCurrency: (c) => {
    if (typeof window !== "undefined") {
      localStorage.currency = c;
    }
    set({ currency: c });
  },

  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  // Runs ONCE on app startup
  initializeTheme: () => {
    if (typeof window === "undefined") return;

    const saved = (localStorage.theme as "light" | "dark" | "system") || "system";

    // apply
    if (saved === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    } else {
      document.documentElement.classList.toggle("dark", saved === "dark");
    }

    // set store
    set({ theme: saved });
  },
}));
