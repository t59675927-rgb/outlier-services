import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AppProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <main className="p-4 overflow-auto">{children}</main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
``;
