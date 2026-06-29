"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { countries } from "@/data/mdm";
import type { Country } from "@/data/types";

export default function LocationSelector() {
  const {
    selectedCountry,
    setSelectedCountry,
    selectedVAC,
    setSelectedVAC,
    vacOptions,
    currency,
  } = useApp();

  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = countries.filter((c) =>
    c.Country_Name.toLowerCase().includes(search.toLowerCase()) ||
    c.Country_Code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function selectCountry(c: Country) {
    setSelectedCountry(c);
    setDropdownOpen(false);
    setSearch("");
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Country */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Country
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:ring-offset-0 focus:border-[#C8102E] transition-colors"
          >
            <span className={selectedCountry ? "text-gray-900" : "text-gray-400"}>
              {selectedCountry ? selectedCountry.Country_Name : "Select country"}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gray-400 flex-shrink-0">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-2 border-b border-gray-100">
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                />
              </div>
              <ul className="max-h-52 overflow-y-auto py-1">
                {filtered.map((c) => (
                  <li key={c.Country_Code}>
                    <button
                      onClick={() => selectCountry(c)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                    >
                      <span>{c.Country_Name}</span>
                      <span className="text-xs text-gray-400">{c.Currency_Code}</span>
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-400">No results</li>
                )}
              </ul>
            </div>
          )}
        </div>
        {selectedCountry && (
          <p className="mt-1 text-xs text-gray-400">
            Currency: {currency.Currency_Name} ({currency.Currency_Symbol})
          </p>
        )}
      </div>

      {/* VAC */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Visa Application Centre (VAC)
        </label>
        <select
          disabled={!selectedCountry}
          value={selectedVAC?.VAC_Code ?? ""}
          onChange={(e) => {
            const v = vacOptions.find((v) => v.VAC_Code === e.target.value) ?? null;
            setSelectedVAC(v);
          }}
          className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-[#C8102E] disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <option value="">
            {selectedCountry ? "Select VAC" : "Select country first"}
          </option>
          {vacOptions.map((v) => (
            <option key={v.VAC_Code} value={v.VAC_Code}>
              {v.VAC_Name}
            </option>
          ))}
        </select>
        {selectedVAC && (
          <p className="mt-1 text-xs text-gray-400">Code: {selectedVAC.VAC_Code}</p>
        )}
      </div>

      {/* Status row */}
      {selectedCountry && selectedVAC && (
        <div className="sm:col-span-2 flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-md">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-600 flex-shrink-0">
            <polyline points="20 6 9 16 4 11" />
          </svg>
          <p className="text-xs text-green-700">
            <span className="font-semibold">{selectedVAC.VAC_Name}</span> — {selectedCountry.Country_Name} — ready to add services
          </p>
        </div>
      )}
    </div>
  );
}
