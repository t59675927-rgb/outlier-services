"use client";

import { useApp } from "@/context/AppContext";

export default function CheckoutPanel() {
  const {
    cart,
    selectedVAC,
    selectedPayment,
    grandTotal,
    currency,
    checkout,
    checkoutSuccess,
  } = useApp();

  const sym = currency.Currency_Symbol;
  const canCheckout = cart.length > 0 && !!selectedVAC && !!selectedPayment;

  const steps = [
    { done: !!selectedVAC, label: "Country & VAC selected" },
    { done: cart.length > 0, label: "Services added to cart" },
    { done: !!selectedPayment, label: "Payment mode selected" },
  ];

  const allDone = steps.every((s) => s.done);

  return (
    <div className="space-y-3">
      {checkoutSuccess && (
        <div className="flex items-center gap-2 px-3 py-2.5 bg-green-50 border border-green-200 rounded-md">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-600 shrink-0">
            <polyline points="20 6 9 16 4 11" />
          </svg>
          <p className="text-sm text-green-700 font-medium">Transaction saved successfully.</p>
        </div>
      )}

      {!allDone && (
        <ul className="space-y-1.5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  step.done
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300"
                }`}
              >
                {step.done && (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 16 4 11" />
                  </svg>
                )}
              </div>
              <span className={`text-xs ${step.done ? "text-gray-500" : "text-gray-400"}`}>
                {step.label}
              </span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={checkout}
        disabled={!canCheckout}
        className={`w-full py-2.5 px-4 rounded-md text-sm font-semibold transition-colors ${
          canCheckout
            ? "bg-[#C8102E] text-white hover:bg-[#A50D25]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {canCheckout
          ? `Confirm & Checkout — ${sym}${grandTotal.toFixed(2)}`
          : "Complete steps above to checkout"}
      </button>
    </div>
  );
}
