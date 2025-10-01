"use client";

import AdminReceptionistLayout from "../../components/layout/AdminReceptionistLayout";
import DashboardCard from "../../components/common/DashboardCard";
import { Users, DollarSign, Calendar } from "lucide-react";

export default function TripPackages() {
  return (
    <AdminReceptionistLayout role="admin">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Users"
          value="120"
          icon={<Users className="w-6 h-6" />}
        />
        <DashboardCard
          title="Bookings"
          value="45"
          icon={<Calendar className="w-6 h-6" />}
        />
        <DashboardCard
          title="Revenue"
          value="$12,340"
          icon={<DollarSign className="w-6 h-6" />}
        />
      </div>
    </AdminReceptionistLayout>
  );
}
