"use client";

import TransactionHistory from "@/components/TransactionHistory";

export default function HistoryPage() {
  return (
    <div className="p-5 max-w-3xl mx-auto">
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-900">Transaction Log</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          All transactions recorded in this session
        </p>
      </div>
      <TransactionHistory />
    </div>
  );
}
