"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-60 h-full bg-blue-800 text-white">
      {/* Header */}
      <div className="p-4 border-b border-blue-700">
        <span className="text-sm font-medium">Menu</span>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        <Link
          href="/"
          className="block px-3 py-2 text-sm rounded hover:bg-blue-700"
        >
          New Transaction
        </Link>

        <Link
          href="/reports"
          className="block px-3 py-2 text-sm rounded hover:bg-blue-700"
        >
          Reports
        </Link>

        <Link
          href="/settings"
          className="block px-3 py-2 text-sm rounded hover:bg-blue-700"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}
