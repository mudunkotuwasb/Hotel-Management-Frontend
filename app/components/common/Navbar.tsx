"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Bed,
  MapPin,
  Utensils,
  Navigation,
  Users,
} from "lucide-react";

const tabs = [
  {
    id: "overview",
    name: "Overview",
    href: "/dashboard/customer",
    icon: Calendar,
  },
  {
    id: "bookings",
    name: "My Bookings",
    href: "/dashboard/customer/bookings",
    icon: Bed,
  },
  {
    id: "explore",
    name: "Explore Rooms",
    href: "/dashboard/customer/ExploreRooms",
    icon: MapPin,
  },
  {
    id: "menu",
    name: "Restaurant Menu",
    href: "/dashboard/customer/RestaurantMenu",
    icon: Utensils,
  },
  {
    id: "trips",
    name: "Trip Packages",
    href: "/dashboard/customer/trip-packages",
    icon: Navigation,
  },
  {
    id: "profile",
    name: "Profile",
    href: "/dashboard/customer/Profile",
    icon: Users,
  },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const handleClick = (tabId: string, href: string) => {
    setActiveTab(tabId);
    router.push(href);
  };

  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-4 whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleClick(tab.id, tab.href)}
              className={`py-4 px-2 border-b-2 font-semibold text-sm flex items-center space-x-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
