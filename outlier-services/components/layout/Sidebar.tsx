"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-blue-900 text-white h-full transition-all ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle */}
      <div className="p-3 border-b border-blue-700 flex justify-between items-center">
        {!collapsed && <span className="font-semibold">Menu</span>}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Links */}
      <nav className="p-3 space-y-3">
        <Link href="/" className="block hover:text-gray-300">
          🧾 {!collapsed && "New Transaction"}
        </Link>

        <Link href="#" className="block hover:text-gray-300">
          📊 {!collapsed && "Reports"}
        </Link>

        <Link href="#" className="block hover:text-gray-300">
          ⚙️ {!collapsed && "Settings"}
        </Link>
      </nav>
    </div>
  );
}
``;
