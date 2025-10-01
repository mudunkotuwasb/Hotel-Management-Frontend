"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bed,
  LogOut,
  LayoutDashboard,
  Calendar,
  Utensils,
  Navigation,
  FileText,
  Package,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

type Role = "admin" | "receptionist";

interface SidebarProps {
  role: Role;
  sidebarOpen?: boolean; // new
  setSidebarOpen?: (open: boolean) => void; // new
}

export default function Sidebar({
  role,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => router.push("/auth");

  const links = {
    admin: [
      {
        name: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
        badge: null,
      },
      { name: "Rooms", href: "/pages/rooms", icon: Bed, badge: null },
      {
        name: "Bookings",
        href: "/pages/bookings",
        icon: Calendar,
        badge: "3",
      },
      {
        name: "Dining",
        href: "/pages/dining",
        icon: Utensils,
        badge: "5",
      },
      {
        name: "Trip Packages",
        href: "/pages/trip-packages",
        icon: Navigation,
        badge: null,
      },
      {
        name: "Inventory",
        href: "/dashboard/admin/inventory",
        icon: Package,
        badge: "1",
      },
      {
        name: "Billing",
        href: "/pages/billing",
        icon: FileText,
        badge: null,
      },
      {
        name: "Reports",
        href: "/dashboard/admin/reports",
        icon: BarChart3,
        badge: null,
      },
      {
        name: "Settings",
        href: "/dashboard/admin/settings",
        icon: Settings,
        badge: null,
      },
    ],
    receptionist: [
      {
        name: "Dashboard",
        href: "/dashboard/receptionist",
        icon: LayoutDashboard,
        badge: null,
      },
      {
        name: "Rooms",
        href: "/pages/rooms",
        icon: Bed,
        badge: null,
      },
      {
        name: "Bookings",
        href: "/pages/bookings",
        icon: Calendar,
        badge: "3",
      },
      {
        name: "Dining",
        href: "/pages/dining",
        icon: Utensils,
        badge: "5",
      },
      {
        name: "Trip Packages",
        href: "/pages/trip-packages",
        icon: Navigation,
        badge: null,
      },
      {
        name: "Billing",
        href: "/pages/billing",
        icon: FileText,
        badge: null,
      },
    ],
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen && setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-auto`}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 md:hidden border-b border-gray-200">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen && setSidebarOpen(false)}>
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Header */}
        <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Bed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Grand Hotel</h1>
              <p className="text-xs text-gray-500">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {links[role].map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 mr-3 ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    />
                    <span className="truncate">{link.name}</span>
                    {link.badge && (
                      <span
                        className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${
                          isActive
                            ? "bg-blue-200 text-blue-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bed className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 capitalize truncate">
                {role}
              </p>
              <p className="text-xs text-gray-500 truncate">Hotel Staff</p>
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
      </aside>
    </>
  );
}
