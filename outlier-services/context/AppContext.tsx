"use client";

import { createContext, useContext, useState } from "react";

type CartItem = {
  Service_Code: string;
  Service_Name: string;
  Unit_Price: number;
  quantity: number;
};

type AppState = {
  selectedCountry: string | null;
  selectedVAC: string | null;
  currency: string;
  cart: CartItem[];

  setSelectedCountry: (v: string | null) => void;
  setSelectedVAC: (v: string | null) => void;
  setCurrency: (v: string) => void;

  addToCart: (service: CartItem) => void;
  updateQuantity: (code: string, delta: number) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedVAC, setSelectedVAC] = useState<string | null>(null);
  const [currency, setCurrency] = useState("INR");

  // ✅ FIXED
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Add to cart
  const addToCart = (service: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.Service_Code === service.Service_Code
      );

      if (existing) {
        return prev.map((item) =>
          item.Service_Code === service.Service_Code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...service, quantity: 1 }];
    });
  };

  // ✅ Update quantity (+ / -)
  const updateQuantity = (code: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.Service_Code === code
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        selectedVAC,
        currency,
        cart,

        setSelectedCountry,
        setSelectedVAC,
        setCurrency,

        addToCart,
        updateQuantity,
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
