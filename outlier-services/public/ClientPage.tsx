"use client";

import { useApp } from "@/context/AppContext";
import NewTransactionPage from "./NewTransactionPage";
import HistoryPage from "./HistoryPage";

export default function ClientPage() {
  const { activePage, sidebarOpen } = useApp();
  const leftOffset = sidebarOpen ? 220 : 0;

  return (
    <div
      className="pt-14 min-h-screen transition-all duration-200"
      style={{ marginLeft: leftOffset }}
    >
      {activePage === "new" ? <NewTransactionPage /> : <HistoryPage />}
    </div>
  );
}
