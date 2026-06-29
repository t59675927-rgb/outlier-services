"use client";
import { useApp } from "@/context/AppContext";

export default function CheckoutButton() {
  const { cart, vac, paymentMode, total } = useApp();

  const handleCheckout = () => {
    const now = new Date();

    const transactions = cart.map((item: any, index: number) => ({
      Transaction_ID: Date.now() + index,
      VAC_Code: vac,
      Service_Code: item.code,
      Payment_Code: paymentMode?.Payment_Code,
      Currency_Code: "INR",
      Unit_Price: item.price,
      Transaction_Date: now,
      Transaction_Status: "Completed",
    }));

    console.log("Saved Transactions:", transactions);
    alert("Transaction Completed ✅");
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
    >
      Checkout
    </button>
  );
}