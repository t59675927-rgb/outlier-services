"use client";

import { useApp } from "@/context/AppContext";

const navItems = [
  {
    id: "new" as const,
    label: "New Transaction",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
  {
    id: "history" as const,
    label: "Transaction Log",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { sidebarOpen, activePage, setActivePage, cart, transactions } = useApp();

  const badges: Record<string, number | null> = {
    new: cart.length > 0 ? cart.length : null,
    history: transactions.length > 0 ? transactions.length : null,
  };

  return (
    <aside
      className="fixed top-14 left-0 bottom-0 z-40 bg-white border-r border-gray-200 overflow-hidden transition-all duration-200"
      style={{ width: sidebarOpen ? 220 : 0 }}
    >
      <div style={{ minWidth: 220 }}>
        <nav className="py-4">
          <p className="px-4 mb-2 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
            Navigation
          </p>
          {navItems.map((item) => {
            const active = activePage === item.id;
            const badge = badges[item.id];
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left
                  ${active
                    ? "bg-gray-50 text-gray-900 font-semibold border-l-2 border-[#C8102E]"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 border-l-2 border-transparent"
                  }`}
              >
                <span className={active ? "text-[#C8102E]" : ""}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {badge !== null && (
                  <span className="bg-[#C8102E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mx-4 pt-4 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">
            Session
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Shift: Morning</p>
            <p>Terminal: POS-04</p>
            <p className="text-gray-400 text-[11px]">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
