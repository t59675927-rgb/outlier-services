import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Outlier Services — VFS",
  description: "Value-Added Services management console for VFS Visa Application Centres",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <AppProvider>
          <Header />
          <Sidebar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
