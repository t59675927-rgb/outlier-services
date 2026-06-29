export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="text-blue-700 font-bold text-lg">Outlier Services</div>
        <span className="text-gray-500 text-sm">VFS Internal POS</span>
      </div>

      {/* Right */}
      <div className="text-sm text-gray-600">Operator: Front Desk 01</div>
    </header>
  );
}
