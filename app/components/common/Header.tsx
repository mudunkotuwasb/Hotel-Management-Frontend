"use client";

import { Bell, LogOut, Bed } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  dashboardType?: "customer" | "admin" | "receptionist";
}

export default function Header({ dashboardType }: HeaderProps) {
  const pathname = usePathname();

  // Map routes to dynamic titles
  const titleMap: Record<string, string> = {
    "/dashboard/admin": "Dashboard",
    "/dashboard/admin/rooms": "Room Management",
    "/dashboard/admin/bookings": "Bookings & Reservations",
    "/dashboard/admin/dining": "Dining & Menu",
    "/dashboard/admin/trip-packages": "Hotel Management",
    "/dashboard/admin/inventory": "Inventory Management",
    "/dashboard/admin/billing": "Billing",
    "/dashboard/admin/reports": "Reports & Analytics",
    "/dashboard/admin/settings": "Settings",
    "/dashboard/receptionist": "Dashboard",
    "/dashboard/receptionist/rooms": "Room Management",
    "/dashboard/receptionist/bookings": "Bookings & Reservations",
    "/dashboard/receptionist/dining": "Dining & Menu",
    "/dashboard/receptionist/trip-packages": "Hotel Management",
    "/dashboard/receptionist/billing": "Billing",
  };

  const title = titleMap[pathname] || "Hotel Management";

  const router = useRouter();

  const handleLogout = () => {
    router.push("/auth");
  };

  // Wrapper classes: container for customer, full width otherwise
  const wrapperClasses =
    dashboardType === "customer"
      ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3"
      : "px-6 py-3 flex justify-between items-center";

  return (
    <header className="bg-white shadow">
      <div className={wrapperClasses}>
        {/* Left side */}
        <div className="flex items-center space-x-3">
          {dashboardType === "customer" ? (
            <>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Bed className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Grand Hotel</h1>
                <p className="text-xs text-gray-500">Customer Portal</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-xl font-bold text-gray-700">{title}</h1>
                <p className="text-sm text-gray-500">Welcome back, John Doe</p>
              </div>
            </>
          )}
        </div>

        {/* Right: Notifications & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group">
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-semibold">JD</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">johndoe@gmail.com</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
