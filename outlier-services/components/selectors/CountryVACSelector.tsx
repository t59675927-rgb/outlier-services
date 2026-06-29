"use client";
import { useApp } from "@/context/AppContext";
import countries from "@/data/countries.json";
import vacs from "@/data/vacs.json";

export default function CountryVACSelector() {
  const { country, setCountry, vac, setVac } = useApp();

  const filteredVACs = vacs.filter((v) => v.Country_Code === country);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex gap-4">
        <select
          className="border p-2"
          onChange={(e) => {
            setCountry(e.target.value);
            setVac(null);
          }}
        >
          <option>Select Country</option>
          {countries.map((c: any) => (
            <option key={c.Country_Code} value={c.Country_Code}>
              {c.Country_Name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          disabled={!country}
          onChange={(e) => setVac(e.target.value)}
        >
          <option>Select VAC</option>
          {filteredVACs.map((v: any) => (
            <option key={v.VAC_Code} value={v.VAC_Code}>
              {v.VAC_Name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
