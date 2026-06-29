"use client";

import { useApp } from "@/context/AppContext";
import type { Transaction } from "@/data/types";

function groupByCheckout(txs: Transaction[]): Record<string, Transaction[]> {
  return txs.reduce<Record<string, Transaction[]>>((acc, tx) => {
    // Group key = everything except the last segment (the item index)
    const key = tx.Transaction_ID.split("-").slice(0, -1).join("-");
    if (!acc[key]) acc[key] = [];
    acc[key].push(tx);
    return acc;
  }, {});
}

export default function TransactionHistory() {
  const { transactions } = useApp();

  if (transactions.length === 0) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-300 mb-3">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <p className="text-sm text-gray-500 font-medium">No transactions recorded yet</p>
        <p className="text-xs text-gray-400 mt-1">Completed checkouts will appear here</p>
      </div>
    );
  }

  const groups = groupByCheckout(transactions);

  return (
    <div className="space-y-4">
      {Object.entries(groups).map(([key, txs]) => {
        const total = txs.reduce((s, t) => s + t.Line_Total, 0);
        const tx0 = txs[0];
        const date = new Date(tx0.Transaction_Date);

        return (
          <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Group header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
              <div>
                <span className="text-sm font-semibold text-gray-800">{tx0.VAC_Name}</span>
                <span className="ml-2 text-xs text-gray-400">{tx0.Country_Name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  {date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}{" "}
                  {date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {tx0.Transaction_Status}
                </span>
              </div>
            </div>

            {/* Line items */}
            <div className="divide-y divide-gray-100">
              {txs.map((tx, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5">
                  <div>
                    <p className="text-sm text-gray-800">{tx.Service_Name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {tx.Payment_Name} &middot; Qty {tx.Quantity} &middot; {tx.Service_Code}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {tx.Currency_Symbol}{tx.Line_Total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-gray-200">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total</span>
              <span className="text-sm font-bold text-gray-900">
                {tx0.Currency_Symbol}{total.toFixed(2)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
