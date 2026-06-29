"use client";

import { useApp } from "@/context/AppContext";

export default function CartSummary() {
  const { cart, cartDispatch, grandTotal, currency } = useApp();
  const sym = currency.Currency_Symbol;

  if (cart.length === 0) {
    return (
      <div className="py-8 flex flex-col items-center justify-center text-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-300 mb-2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <p className="text-sm text-gray-400">No services added yet</p>
      </div>
    );
  }

  return (
    <div>
      {/* Items */}
      <div className="divide-y divide-gray-100">
        {cart.map((item) => (
          <div key={item.Service_Code} className="flex items-start gap-2 py-2.5">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium leading-snug">{item.Service_Name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {sym}{item.Unit_Price.toFixed(2)} x {item.qty}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-semibold text-gray-800">
                {sym}{(item.Unit_Price * item.qty).toFixed(2)}
              </span>
              <button
                onClick={() => cartDispatch({ type: "REMOVE", code: item.Service_Code })}
                className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                aria-label={`Remove ${item.Service_Name}`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grand total */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t-2 border-gray-200">
        <span className="text-sm font-semibold text-gray-700">Grand Total</span>
        <span className="text-base font-bold text-gray-900">
          {sym}{grandTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
