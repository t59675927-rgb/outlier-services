"use client";
import paymentModes from "@/data/paymentModes.json";
import { useApp } from "@/context/AppContext";

export default function PaymentMode() {
  const { paymentMode, setPaymentMode, country } = useApp();

  const currency = "INR"; // extend later

  const filtered = paymentModes.filter((p) => p.Currency_Code === currency);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Payment Mode</h3>

      {filtered.map((p: any) => (
        <label key={p.Payment_Code} className="block">
          <input
            type="radio"
            name="payment"
            value={p.Payment_Code}
            onChange={() => setPaymentMode(p)}
          />
          {p.Payment_Name}
        </label>
      ))}
    </div>
  );
}
