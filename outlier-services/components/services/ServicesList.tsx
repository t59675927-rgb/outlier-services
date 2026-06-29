"use client";
import services from "@/data/services.json";
import { useApp } from "@/context/AppContext";

export default function ServicesList() {
  const { country, addToCart } = useApp();

  const filtered = services.filter((s) => s.Country_Code === country);

  return (
    <div className="grid grid-cols-3 gap-4">
      {filtered.map((s: any) => (
        <div key={s.Service_Code} className="border p-3 rounded">
          <div className="font-semibold">{s.Service_Name}</div>
          <div className="text-xs text-gray-500">{s.Service_Code} | VAS</div>

          <div className="mt-2">₹ {s.Unit_Price}</div>

          <button
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => addToCart(s)}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}
