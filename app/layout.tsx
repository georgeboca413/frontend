import type { Metadata } from "next";
import "./globals.css";
import { DashboardLayout } from "@/components/layout";

export const metadata: Metadata = {
  title: "Tactical Operations Dashboard",
  description: "Tactical command and control system",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white font-mono antialiased">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
