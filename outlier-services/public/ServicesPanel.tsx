"use client";

import { useApp } from "@/context/AppContext";
import type { Service } from "@/data/types";

function ServiceRow({ service }: { service: Service }) {
  const { cart, cartDispatch, currency } = useApp();
  const cartItem = cart.find((i) => i.Service_Code === service.Service_Code);
  const qty = cartItem?.qty ?? 0;
  const sym = currency.Currency_Symbol;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${qty > 0 ? "bg-blue-50" : "hover:bg-gray-50"}`}>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-900">{service.Service_Name}</span>
          <span className="text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wide">
            {service.Service_Type}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{service.Service_Code}</p>
      </div>

      {/* Price */}
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-gray-800">
          {sym}{service.Unit_Price.toFixed(2)}
        </p>
        {qty > 0 && (
          <p className="text-xs text-blue-600 font-medium">
            = {sym}{(service.Unit_Price * qty).toFixed(2)}
          </p>
        )}
      </div>

      {/* Qty control */}
      <div className="shrink-0">
        {qty === 0 ? (
          <button
            onClick={() => cartDispatch({ type: "ADD", service })}
            className="px-3 py-1.5 text-xs font-semibold text-[#C8102E] border border-[#C8102E] rounded hover:bg-[#C8102E] hover:text-white transition-colors"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <button
              onClick={() => cartDispatch({ type: "SET_QTY", code: service.Service_Code, qty: qty - 1 })}
              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <span className="w-8 text-center text-sm font-semibold text-gray-900 border-x border-gray-300">
              {qty}
            </span>
            <button
              onClick={() => cartDispatch({ type: "SET_QTY", code: service.Service_Code, qty: qty + 1 })}
              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesPanel() {
  const { serviceOptions, selectedVAC } = useApp();

  if (!selectedVAC) {
    return (
      <div className="py-10 flex flex-col items-center justify-center text-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-300 mb-3">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 22V12h6v10" />
          <path d="M3 9h18" />
        </svg>
        <p className="text-sm text-gray-400">Select a country and VAC to view services</p>
      </div>
    );
  }

  if (serviceOptions.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-gray-400">No services configured for this country.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="px-4 py-2 text-xs text-gray-400 bg-gray-50 border-b border-gray-100">
        {serviceOptions.length} service{serviceOptions.length !== 1 ? "s" : ""} available
      </p>
      {serviceOptions.map((s) => (
        <ServiceRow key={s.Service_Code} service={s} />
      ))}
    </div>
  );
}
