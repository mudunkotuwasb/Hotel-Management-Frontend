"use client";

import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

export default function AdminReceptionistLayout({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "admin" | "receptionist";
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
