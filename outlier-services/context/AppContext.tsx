"use client";

import { createContext, useContext, useState } from "react";

type AppState = {
  selectedCountry: string | null;
  selectedVAC: string | null;
  currency: string;
  setSelectedCountry: (v: string | null) => void;
  setSelectedVAC: (v: string | null) => void;
  setCurrency: (v: string) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedVAC, setSelectedVAC] = useState<string | null>(null);
  const [currency, setCurrency] = useState("INR");

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        selectedVAC,
        currency,
        setSelectedCountry,
        setSelectedVAC,
        setCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
