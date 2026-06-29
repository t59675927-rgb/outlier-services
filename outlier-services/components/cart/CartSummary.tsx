"use client";

import { useApp } from "@/context/AppContext";
import currencies from "@/data/currency.json";

export default function CartSummary() {
  const { cart, updateQuantity, currency } = useApp();

  if (cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow h-fit">
        <h2 className="text-lg font-semibold mb-2">Cart</h2>
        <p className="text-gray-400 text-sm">No items added</p>
      </div>
    );
  }

  const currencySymbol =
    currencies.find((c) => c.Currency_Code === currency)?.Currency_Symbol ||
    "₹";

  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.Unit_Price,
    0
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow h-fit">
      <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>

      <div className="space-y-3">
        {cart.map((item) => {
          const lineTotal = item.quantity * item.Unit_Price;

          return (
            <div key={item.Service_Code} className="border p-3 rounded">
              {/* Top row */}
              <div className="flex justify-between">
                <div className="font-medium">{item.Service_Name}</div>
                <div className="font-medium">
                  {currencySymbol}
                  {lineTotal}
                </div>
              </div>

              {/* Sub info */}
              <div className="text-xs text-gray-500 mb-2">
                Code: {item.Service_Code} • {currencySymbol}
                {item.Unit_Price}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.Service_Code, -1)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  className="px-2 bg-blue-600 text-white rounded"
                  onClick={() => updateQuantity(item.Service_Code, +1)}
                >
                  +
                </button>

                {/* Remove button */}
                <button
                  className="ml-auto text-red-500 text-xs"
                  onClick={() =>
                    updateQuantity(item.Service_Code, -item.quantity)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grand Total */}
      <div className="mt-4 border-t pt-3 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>
          {currencySymbol}
          {grandTotal}
        </span>
      </div>
    </div>
  );
}
