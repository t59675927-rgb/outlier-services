import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Area */}
          <div className="flex flex-col flex-1">
            <Header />
            <main className="p-4 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
``;
