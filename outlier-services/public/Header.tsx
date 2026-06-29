"use client";

import { useApp } from "@/context/AppContext";

export default function Header() {
  const { setSidebarOpen, sidebarOpen } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#C8102E] rounded flex items-center justify-center">
          <span className="text-white text-[10px] font-bold tracking-tight">VFS</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-none">Outlier Services</p>
          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest">VAS Management</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-gray-700">Operator 01</p>
          <p className="text-[10px] text-gray-400">
            {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
          OP
        </div>
      </div>
    </header>
  );
}
