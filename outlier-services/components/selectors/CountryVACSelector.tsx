"use client";

import countries from "@/data/countries.json";
import vacs from "@/data/vacs.json";
import currencies from "@/data/currency.json";
import { useApp } from "@/context/AppContext";

export default function CountryVACSelector() {
  const {
    selectedCountry,
    selectedVAC,
    setSelectedCountry,
    setSelectedVAC,
    setCurrency,
  } = useApp();

  const filteredVACs = vacs.filter((v) => v.Country_Code === selectedCountry);

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    setSelectedVAC(null);

    const country = countries.find((c) => c.Country_Code === code);
    if (country) {
      setCurrency(country.Currency_Code);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Country */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Select Country
          </label>
          <select
            className="w-full border rounded p-2"
            value={selectedCountry || ""}
            onChange={(e) => handleCountryChange(e.target.value)}
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
          <label className="block text-sm text-gray-600 mb-1">Select VAC</label>
          <select
            className="w-full border rounded p-2"
            value={selectedVAC || ""}
            onChange={(e) => setSelectedVAC(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">-- Select VAC --</option>
            {filteredVACs.map((v) => (
              <option key={v.VAC_Code} value={v.VAC_Code}>
                {v.VAC_Name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display selection */}
      {selectedCountry && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Selected:</strong> {selectedCountry}
          {selectedVAC && ` → ${selectedVAC}`}
        </div>
      )}
    </div>
  );
}
