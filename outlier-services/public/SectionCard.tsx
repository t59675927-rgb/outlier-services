import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  noPadding?: boolean;
}

export default function SectionCard({ title, children, noPadding = false }: SectionCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white mb-4">
      <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
      </div>
      <div className={noPadding ? "" : "p-4"}>{children}</div>
    </div>
  );
}
