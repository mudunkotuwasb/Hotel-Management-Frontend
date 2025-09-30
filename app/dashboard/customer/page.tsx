"use client";

import CustomerLayout from "../../components/layout/CustomerLayout";
import DashboardCard from "../../components/common/DashboardCard";
import { Calendar, Bed, User } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <CustomerLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">Customer Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="My Bookings"
            value="3"
            icon={<Calendar className="w-6 h-6" />}
          />
          <DashboardCard
            title="Rooms Reserved"
            value="2"
            icon={<Bed className="w-6 h-6" />}
          />
          <DashboardCard
            title="Profile Completeness"
            value="80%"
            icon={<User className="w-6 h-6" />}
          />
        </div>
      </div>
    </CustomerLayout>
  );
}
