"use client";

import { useApp } from "@/context/AppContext";

export default function PaymentModeSelector() {
  const { paymentOptions, selectedPayment, setSelectedPayment, selectedVAC } = useApp();

  if (!selectedVAC) {
    return (
      <p className="text-sm text-gray-400 py-2">Select a VAC first to see payment options.</p>
    );
  }

  return (
    <div className="space-y-2">
      {paymentOptions.map((pm) => {
        const checked = selectedPayment?.Payment_Code === pm.Payment_Code;
        return (
          <label
            key={pm.Payment_Code}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md border cursor-pointer transition-colors ${
              checked
                ? "border-[#C8102E] bg-red-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="payment_mode"
              value={pm.Payment_Code}
              checked={checked}
              onChange={() => setSelectedPayment(pm)}
              className="accent-[#C8102E]"
            />
            <span className="text-sm text-gray-800">{pm.Payment_Name}</span>
          </label>
        );
      })}
    </div>
  );
}
