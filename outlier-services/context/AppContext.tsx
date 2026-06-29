"use client";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  const [country, setCountry] = useState(null);
  const [vac, setVac] = useState(null);
  const [cart, setCart] = useState([]);
  const [paymentMode, setPaymentMode] = useState(null);

  const addToCart = (service: any) => {
    setCart((prev: any) => {
      const existing = prev.find((i: any) => i.code === service.Service_Code);

      if (existing) {
        return prev.map((i: any) =>
          i.code === service.Service_Code ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [
        ...prev,
        {
          code: service.Service_Code,
          name: service.Service_Name,
          price: service.Unit_Price,
          qty: 1,
        },
      ];
    });
  };

  const updateQty = (code: string, delta: number) => {
    setCart((prev: any) =>
      prev
        .map((item: any) =>
          item.code === code
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item
        )
        .filter((i: any) => i.qty > 0)
    );
  };

  const total = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.qty,
    0
  );

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry,
        vac,
        setVac,
        cart,
        addToCart,
        updateQty,
        total,
        paymentMode,
        setPaymentMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
