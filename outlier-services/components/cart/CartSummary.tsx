"use client";
import { useApp } from "@/context/AppContext";

export default function CartSummary() {
  const { cart, updateQty, total } = useApp();

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-3">Cart</h2>

      {cart.map((item: any) => (
        <div key={item.code} className="flex justify-between mb-2">
          <div>
            {item.name} (x{item.qty})
          </div>

          <div className="flex gap-2 items-center">
            <button onClick={() => updateQty(item.code, -1)}>-</button>
            <button onClick={() => updateQty(item.code, 1)}>+</button>
            <span>₹ {item.price * item.qty}</span>
          </div>
        </div>
      ))}

      <div className="mt-4 font-bold">Total: ₹ {total}</div>
    </div>
  );
}
