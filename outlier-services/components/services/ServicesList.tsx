"use client";

import services from "@/data/services.json";
import currencies from "@/data/currency.json";
import { useApp } from "@/context/AppContext";

export default function ServicesList() {
  const { selectedCountry, currency, addToCart, cart, updateQuantity } =
    useApp();

  if (!selectedCountry) return null;

  const filteredServices = services.filter(
    (s) => s.Country_Code === selectedCountry
  );

  const currencySymbol =
    currencies.find((c) => c.Currency_Code === currency)?.Currency_Symbol ||
    "₹";

  const getQty = (code: string) =>
    cart.find((c) => c.Service_Code === code)?.quantity || 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h2 className="text-lg font-semibold mb-4">Services</h2>

      <div className="space-y-3">
        {filteredServices.map((s) => {
          const qty = getQty(s.Service_Code);
          const lineTotal = qty * s.Unit_Price;

          return (
            <div
              key={s.Service_Code}
              className="flex justify-between items-center border p-3 rounded"
            >
              {/* Service info */}
              <div>
                <div className="font-medium">
                  {s.Service_Name} ({s.Service_Code})
                </div>
                <div className="text-sm text-gray-500">
                  {s.Service_Type} • {currencySymbol}
                  {s.Unit_Price}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => updateQuantity(s.Service_Code, -1)}
                >
                  −
                </button>

                <span>{qty}</span>

                <button
                  className="px-2 bg-blue-600 text-white rounded"
                  onClick={() =>
                    addToCart({
                      Service_Code: s.Service_Code,
                      Service_Name: s.Service_Name,
                      Unit_Price: s.Unit_Price,
                      quantity: 1,
                    })
                  }
                >
                  +
                </button>

                <div className="w-20 text-right font-medium">
                  {currencySymbol}
                  {lineTotal}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
