"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useCallback,
  useMemo,
} from "react";
import type {
  Country,
  VAC,
  Service,
  PaymentMode,
  Currency,
  CartItem,
  Transaction,
} from "@/data/types";
import {
  currencies,
  vacs as allVacs,
  services as allServices,
  paymentModes as allPaymentModes,
} from "@/data/mdm";

// ── Cart reducer ──────────────────────────────────────────────────────────────

type CartAction =
  | { type: "ADD"; service: Service }
  | { type: "REMOVE"; code: string }
  | { type: "SET_QTY"; code: string; qty: number }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(
        (i) => i.Service_Code === action.service.Service_Code
      );
      if (existing) {
        return state.map((i) =>
          i.Service_Code === action.service.Service_Code
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...state, { ...action.service, qty: 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.Service_Code !== action.code);
    case "SET_QTY":
      if (action.qty <= 0) {
        return state.filter((i) => i.Service_Code !== action.code);
      }
      return state.map((i) =>
        i.Service_Code === action.code ? { ...i, qty: action.qty } : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

// ── Context shape ─────────────────────────────────────────────────────────────

interface AppContextValue {
  // Selection state
  selectedCountry: Country | null;
  setSelectedCountry: (c: Country | null) => void;
  selectedVAC: VAC | null;
  setSelectedVAC: (v: VAC | null) => void;
  selectedPayment: PaymentMode | null;
  setSelectedPayment: (p: PaymentMode | null) => void;

  // Derived MDM lists
  vacOptions: VAC[];
  serviceOptions: Service[];
  paymentOptions: PaymentMode[];
  currency: Currency;

  // Cart
  cart: CartItem[];
  cartDispatch: React.Dispatch<CartAction>;
  grandTotal: number;

  // Transactions (session)
  transactions: Transaction[];
  checkoutSuccess: boolean;
  checkout: () => boolean;

  // Navigation
  activePage: "new" | "history";
  setActivePage: (p: "new" | "history") => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountryRaw] = useState<Country | null>(null);
  const [selectedVAC, setSelectedVAC] = useState<VAC | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMode | null>(null);
  const [cart, cartDispatch] = useReducer(cartReducer, []);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [activePage, setActivePage] = useState<"new" | "history">("new");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const setSelectedCountry = useCallback((c: Country | null) => {
    setSelectedCountryRaw(c);
    setSelectedVAC(null);
    setSelectedPayment(null);
    cartDispatch({ type: "CLEAR" });
  }, []);

  const currency = useMemo<Currency>(() => {
    if (!selectedCountry) return currencies.find((c) => c.Currency_Code === "INR")!;
    return currencies.find((c) => c.Currency_Code === selectedCountry.Currency_Code)!;
  }, [selectedCountry]);

  const vacOptions = useMemo(
    () => (selectedCountry ? allVacs.filter((v) => v.Country_Code === selectedCountry.Country_Code) : []),
    [selectedCountry]
  );

  const serviceOptions = useMemo(
    () => (selectedCountry ? allServices.filter((s) => s.Country_Code === selectedCountry.Country_Code) : []),
    [selectedCountry]
  );

  const paymentOptions = useMemo(
    () => allPaymentModes.filter((p) => p.Currency_Code === currency.Currency_Code),
    [currency]
  );

  const grandTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.Unit_Price * i.qty, 0),
    [cart]
  );

  const checkout = useCallback((): boolean => {
    if (!selectedVAC || !selectedPayment || cart.length === 0 || !selectedCountry) return false;
    const ts = Date.now();
    const txDate = new Date().toISOString();
    const newTxs: Transaction[] = cart.map((item, idx) => ({
      Transaction_ID: `TXN-${ts}-${String(idx + 1).padStart(2, "0")}`,
      VAC_Code: selectedVAC.VAC_Code,
      VAC_Name: selectedVAC.VAC_Name,
      Country_Name: selectedCountry.Country_Name,
      Service_Code: item.Service_Code,
      Service_Name: item.Service_Name,
      Payment_Code: selectedPayment.Payment_Code,
      Payment_Name: selectedPayment.Payment_Name,
      Currency_Code: currency.Currency_Code,
      Currency_Symbol: currency.Currency_Symbol,
      Unit_Price: item.Unit_Price,
      Quantity: item.qty,
      Line_Total: item.Unit_Price * item.qty,
      Transaction_Date: txDate,
      Transaction_Status: "Completed",
    }));
    setTransactions((prev) => [...newTxs, ...prev]);
    cartDispatch({ type: "CLEAR" });
    setSelectedPayment(null);
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 4000);
    return true;
  }, [selectedVAC, selectedPayment, cart, selectedCountry, currency]);

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        selectedVAC,
        setSelectedVAC,
        selectedPayment,
        setSelectedPayment,
        vacOptions,
        serviceOptions,
        paymentOptions,
        currency,
        cart,
        cartDispatch,
        grandTotal,
        transactions,
        checkoutSuccess,
        checkout,
        activePage,
        setActivePage,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
