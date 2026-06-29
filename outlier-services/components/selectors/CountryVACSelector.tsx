"use client";

import countries from "@/data/countries.json";
import vacs from "@/data/vac.json";
import { useApp } from "@/context/AppContext";

export default function CountryVACSelector() {
  const { selectedCountry, selectedVAC, setSelectedCountry, setSelectedVAC } =
    useApp();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-4">
        {/* Country */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Select Country
          </label>
          <select
            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-blue-400"
            value={selectedCountry || ""}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c.Country_Code} value={c.Country_Code}>
                {c.Country_Name}
              </option>
            ))}
          </select>
        </div>

        {/* VAC */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Select VAC
          </label>
          <select
            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-blue-400"
            value={selectedVAC || ""}
            onChange={(e) => setSelectedVAC(e.target.value)}
          >
            <option value="">-- Select VAC --</option>
            {vacs.map((v) => (
              <option key={v.VAC_Code} value={v.VAC_Code}>
                {v.VAC_Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selection Display (Improved) */}
      {(selectedCountry || selectedVAC) && (
        <div className="mt-4 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
          <span className="font-medium text-blue-700">Selected:</span>{" "}
          {selectedCountry || "-"} {selectedVAC ? `→ ${selectedVAC}` : ""}
        </div>
      )}
    </div>
  );
}
