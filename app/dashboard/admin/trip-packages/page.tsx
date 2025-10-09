"use client";

import { useState } from "react";
import AdminReceptionistLayout from "../../../components/layout/AdminReceptionistLayout";
import TripPackagesView from "./TripPackagesView";
import BookingsView from "./BookingsView";
import AddPackageModal from "./AddPackageModal";
import { Package, Clock } from "lucide-react";

export default function TripPackages() {
  const [activeTab, setActiveTab] = useState<"packages" | "bookings">("packages");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminReceptionistLayout role="admin">
      <div className="space-y-6 text-black">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Trip Packages</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Package
          </button>
        </div>
        <p className="text-gray-800 mb-6">Manage trip packages and bookings</p>

        {/* Navigation Tabs */}
        <div className="flex space-x-6 border-b mb-6">
          <button
            onClick={() => setActiveTab("packages")}
            className={`flex items-center space-x-2 pb-3 px-1 font-medium ${activeTab === "packages"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-700 hover:text-gray-900"
              }`}
          >
            <Package className="w-5 h-5" />
            <span>Packages (3)</span>
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center space-x-2 pb-3 px-1 font-medium ${activeTab === "bookings"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-700 hover:text-gray-900"
              }`}
          >
            <Clock className="w-5 h-5" />
            <span>Bookings (2)</span>
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "packages" ? (
          <TripPackagesView />
        ) : (
          <BookingsView />
        )}
      </div>


      {/* Add Package Modal */}
      <AddPackageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </AdminReceptionistLayout>
  );
}